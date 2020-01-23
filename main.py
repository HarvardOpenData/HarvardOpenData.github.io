from flask import Flask, render_template, request, jsonify, make_response, redirect, url_for, abort
import yaml
import server.constants as constants
import server.auth as auth
from server.members import Member, MembersCache, add_members_to_firestore
from server.asana_ import get_tasks, TasksCache
import json
import os
import server.demographics
import tempfile
import random, datetime, time
import csv
import itertools

app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024


def getYml(filepath):
    with open(filepath, encoding='utf-8') as infile:
        fileMap = yaml.safe_load(infile)
        return fileMap

# get all site-wide yaml into dict


def siteConstants():
    site = getYml('./data/site.yml')
    site["pages"] = getYml('./data/pages.yml')
    return site

def demographicQuestions():
    return getYml("./data/demographic_questions.yml")

def finalsQuestions():
    return getYml("./data/finals_questions.yml")


site = siteConstants()
pageData = getYml('./data/pageData.yml')
auth.init_survey_firebase()
auth.init_website_firebase()

members_cache = MembersCache()
tasks_cache = TasksCache()
peopleYml = getYml("./data/people.yml")
add_members_to_firestore(auth.get_website_firestore_client(), peopleYml)
members_cache.populate(auth.get_website_firestore_client(), peopleYml)

tier_entries = {
    "Platinum" : 20,
    "Gold" : 10,
    "Silver" : 4,
    "Bronze" : 2,
    "Startup" : 1
}

tiersYml = getYml("./data/sponsors.yml")["tiers"]
sponsorsYml = getYml("./data/sponsors.yml")["sponsors"]
sponsor_weights = [tier_entries[sponsor["tier"]] for sponsor in sponsorsYml]

@app.route('/')
def index():
    categories = getYml('./data/categories.yml')
    featured = enumerate(getYml('./data/featured.yml'))
    date_string = datetime.datetime.now().strftime('%H %d %m %Y')
    random.seed(date_string, 2)
    featured_sponsors : list = random.choices(sponsorsYml, weights = sponsor_weights, k = 1)
    selected_index = sponsorsYml.index(featured_sponsors[0])
    filtered_sponsors : list= sponsorsYml.copy()
    filtered_sponsors.pop(selected_index)
    if filtered_sponsors:
        filtered_sponsor_weights = sponsor_weights.copy()
        filtered_sponsor_weights.pop(selected_index)
        featured_sponsors.extend(random.choices(filtered_sponsors, filtered_sponsor_weights, k = 1))
    featured_sponsors.sort(key = lambda x: tiersYml.index(x["tier"]))
    random.seed(time.time())
    return render_template('index.html', site=site, page=pageData["index"][0], categories=categories, featured=featured,
                            featured_sponsors = featured_sponsors)

@app.route('/people/')
def about():
    members = members_cache.get()
    return render_template('people.html', site=site, people=peopleYml, members=members, page=pageData["about"][0])

@app.route('/sponsors/')
def sponsors():
    return render_template('sponsors.html', site=site, sponsors = sponsorsYml, tiers = tiersYml, page=pageData["sponsors"][0])


@app.route('/calendar/')
def calendar():
    return render_template('calendar.html', site=site, page=pageData["calendar"][0])


@app.route('/catalog/')
def catalog():
    return render_template('catalog.html', site=site, categories=getYml("./data/categories.yml"),
                           filetypes=getYml("./data/filetypes.yml"), page=pageData["catalog"][0])

@app.route('/bootcamp/')
def bootcamp():
    return render_template('bootcamp.html', site=site, bootcamp=getYml("./data/bootcamp.yml"),
                           filetypes=getYml("./data/filetypes.yml"), page=pageData["bootcamp"][0])

@app.route('/datathon/')
def datathon():
    return render_template('datathon.html', site=site, datathon=getYml("./data/datathon.yml"),
                           filetypes=getYml("./data/filetypes.yml"), page=pageData["datathon"][0])

@app.route('/get_involved/')
def get_involved():
    return render_template('get_involved.html', site=site, page=pageData["get_involved"][0])


@app.route('/submit/')
def submit():
    return render_template('submit.html', site=site, page=pageData["submit"][0], categories=getYml('./data/categories.yml'))


@app.route('/visual/')
def visual():
    return render_template('visual.html', site=site, page=pageData["visual"][0])


### WEBAPPS ###
@app.route('/visual/crime')
def crime():
    return render_template('webapps/crimemap.html', site=site, page=pageData["crimemap"][0])

@app.route('/visual/crimson')
def crimson():
    return render_template('webapps/crimson.html', site=site, page=pageData["crimsonwords"][0])


@app.route('/visual/studyabroad')
def studyabroad():
    return render_template('webapps/studyabroad.html', site=site, page=pageData["studyabroad"][0])


@app.route('/visual/scoreboard')
def scoreboard():
    return render_template('webapps/scoreboard.html', site=site, page=pageData["scoreboard"][0])

@app.route('/visual/hudsmenu')
def hudsmenu():
    return render_template('webapps/hudsmenu.html', site=site, page=pageData["hudsmenu"][0])

@app.route("/surveygroup/", methods=['GET', 'POST'])

@app.route('/demographics/', methods=['GET', 'POST'])
def demographics():
    userEmail = None
    userId = None
    db = auth.get_survey_firestore_client()
    emails_ref = db.collection("emails")

    email_cookie_key = get_email_cookie_key("demographics")
    id_cookie_key = get_id_cookie_key("demographics")

    if request.method == 'GET':
        if email_cookie_key in request.cookies:
            userEmail = request.cookies[email_cookie_key]
        if id_cookie_key in request.cookies:
            userId = request.cookies[id_cookie_key]
        if not auth.is_authenticated(userEmail, userId, emails_ref):
            return redirect("/auth/surveygroup/")
        responsesDict = auth.get_responses_dict(userEmail, db)
        return render_template("demographics.html", page=pageData["demographics"][0], site=site, demographics=responsesDict["demographics"], questions=demographicQuestions(), CLIENT_ID=constants.get_google_client_id(), responded=False)
    else:
        userEmail = request.cookies[email_cookie_key]
        userId = request.cookies[id_cookie_key]
        if auth.is_authenticated(userEmail, userId, emails_ref):
            server.demographics.update_demographics(
                userEmail, request.form, demographicQuestions(), db)
            responsesDict = auth.get_responses_dict(userEmail, db)
            return render_template("demographics.html", page=pageData["demographics"][0], site=site, demographics=responsesDict["demographics"], questions=demographicQuestions(), CLIENT_ID=constants.get_google_client_id(), responded=True)
        else:
            # this happens if for some reason they've tried to fuck with their email or something gets corrupted
            abort("User credentials improper. Please sign out and sign back in")


@app.route("/profile/", methods=["GET", "POST"])
def profile():
    db = auth.get_website_firestore_client()
    userEmail = None
    userId = None
    email_cookie_key = get_email_cookie_key("profile")
    id_cookie_key = get_id_cookie_key("profile")

    members_ref = db.collection("members")
    if email_cookie_key in request.cookies:
        userEmail = request.cookies[email_cookie_key]
    if id_cookie_key in request.cookies:
        userId = request.cookies[id_cookie_key]
    if not auth.is_authenticated(userEmail, userId, members_ref):
        return redirect("/auth/profile/")

    member = auth.get_member(userEmail, userId, db)
    peopleYml = getYml('./data/people.yml')
    if request.method == "GET":
        people: list = peopleYml["people"]

        person_dict = next(
            (person for person in people if "email" in person and person["email"] == member.email), None)
        if person_dict is not None:
            member.merge_people_dict(person_dict)

        contributionsJson = "[\n\n]"
        if member.contributions is not None:
            contributionsJson = json.dumps(member.contributions, indent=4)

        return render_template("profile.html", page=pageData["profile"][0], site=site, member=member, contributionsJson=contributionsJson, CLIENT_ID=constants.get_google_client_id(), responded=True)
    elif request.method == "POST":
        try:
            if "photo_upload" in request.files:
                photo = request.files["photo_upload"]
                if photo.filename:
                    filetype = photo.filename.split(".")[-1]
                    storage_client = auth.get_website_storage_client()
                    bucket = storage_client.bucket("hodp-member-images")
                    uploaded_filename = "{}.{}".format(
                        member.member_id, filetype)
                    blob = bucket.blob(uploaded_filename)
                    temp = tempfile.NamedTemporaryFile(delete=False)
                    photo.save(temp.name)
                    blob.upload_from_file(temp)
                    os.remove(temp.name)
                    blob.make_public()
                    member.img_url = blob._get_download_url()
            member.update_from_form(request.form)
            member.save(db)
            members_cache.populate(db, peopleYml)
            return redirect("/profile/")
        except Exception as e:
            return make_response("Failed to update profile: {}".format(e), 400)

@app.route("/webapp/finals/", methods = ["GET", "POST"])
def finals_app():
    finals_semester = "2019_FALL"
    final_data = [row for row in csv.reader(open('static/assets/webapp-data/finalsf19_nov14.csv', 'r'), delimiter=",", quotechar='|')]
    courses = []
    for row in final_data:
        courses.append(row[0])
    if request.method == "GET":
        return render_template("webapps/finals.html", page=pageData["finals_app"][0], site=site, courses = courses, questions=finalsQuestions())
    elif request.method == "POST":
        form_data = request.form
        form_classes = request.form.getlist('classes')
        ga_id : str = request.cookies.get("_ga", None)
        if ga_id is not None: 
            db = auth.get_survey_firestore_client() 
            doc = db.collection("finals_classes").document(ga_id).get()
            if not doc.exists:
                db.collection("finals_classes").document(ga_id).set({
                    "year" : form_data.get("year", None),
                    "house" : form_data.get("house", None),
                    "concentration" : form_data.get("concentration", None),
                    finals_semester : form_classes
                })
            else:
                db.collection("finals_classes").document(ga_id).update({
                    "year" : form_data.get("year", None),
                    "house" : form_data.get("house", None),
                    "concentration" : form_data.get("concentration", None),
                    finals_semester : form_classes
                })
        examInfo = []; gLinks = []; lday = 0;
        i = 0
        for i in range (0,len(form_classes)):
            j = 0
            while j < len(courses):
                if form_classes[i]==courses[j]:
                    date = final_data[j][3]
                    #find last exam day
                    if int(date[3:5]) > lday:
                        lday = int(date[3:5])
                    #calc gcal links, adjust codes depending on fall/spring
                    if final_data[j][4] == "09:00 AM":
                        sCode = "201912"+date[3:5]+"T140000Z"
                        eCode = "201912"+date[3:5]+"T170000Z"
                    elif final_data[j][4] == "02:00 PM":
                        sCode = "201912"+date[3:5]+"T190000Z"
                        eCode = "201912"+date[3:5]+"T220000Z"
                    calLink = "http://www.google.com/calendar/event?action=TEMPLATE&dates="+sCode+"%2F"+eCode+"&text="+courses[j]+"%20Final&location="+final_data[j][6];
                    #gLinks.append(calLink.replace(" ","%20"))
                    examInfo.append("Your "+courses[j]+" Final is "+date+" at "+final_data[j][4]+" in "+final_data[j][6]+" <a href=\""+calLink.replace(" ","%20")+"\" target=\"_blank\">Add to GCal</a>")
                    j = len(courses)
                else:
                    j += 1
            i+=1
        fLink = "https://www.google.com/flights?lite=0#flt=BOS.2019-12-"+str(lday)+";c:USD;e:1;sd:1;t:f;tt:o"
        return render_template("webapps/finalsresult.html", page=pageData["finals_app"][0], site=site, examInfo = examInfo, gLinks = gLinks, fLink = fLink)

@app.route("/auth/<request_url>/", methods=["GET", "POST"])
def signin(request_url):
    title_dict = {
        "surveygroup": "Survey Group",
        "demographics": "Demographics",
        "profile": "My Profile"
    }
    if request.method == "GET":
        return render_template('auth.html', title=title_dict[request_url], page=pageData["auth"][0], site=site, CLIENT_ID=constants.get_google_client_id(), request_url=request_url)
    else:
        try:
            email_cookie_key = None
            id_cookie_key = None
            token = request.data
            userEmail, userId = auth.authenticate_google_signin(token)
            email_dict = None
            if request_url in ["surveygroup", "demographics"]:
                email_cookie_key = get_email_cookie_key("demographics")
                id_cookie_key = get_id_cookie_key("demographics")
                db = auth.get_survey_firestore_client()
                auth.create_respondent(userEmail, userId, db)
            elif request_url in ["profile"]:
                email_cookie_key = get_email_cookie_key("profile")
                id_cookie_key = get_id_cookie_key("profile")
                db = auth.get_website_firestore_client()
                auth.get_member(userEmail, userId, db)
            # set the values of cookies to persist sign in
            response = make_response("SUCCESS", 201)
            response.set_cookie(email_cookie_key, userEmail)
            response.set_cookie(id_cookie_key, userId)
            return response
        except Exception as e:
            print(e)
            # if there is an error, delete their cookies and indicate failure
            response = make_response("FAILURE", 406)
            response.set_cookie(email_cookie_key, expires=0)
            response.set_cookie(id_cookie_key, expires=0)
            return response

@app.route('/projects/', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        sections = tasks_cache.get()
        return render_template('tasks.html', page=pageData['tasks'], site=site, sections=sections.items())
    elif request.method == 'POST':
        sections = tasks_cache.populate()
        return redirect('/projects/')

@app.route("/<request_url>/")
def link(request_url):
    links = getYml("./data/links.yml")
    if request_url not in links:
        abort(404)

    expiration_date = None
    if "expiration" in links[request_url]:
        expiration_date = datetime.datetime.strptime(links[request_url]["expiration"], "%Y-%m-%d")

    if expiration_date is not None and expiration_date < datetime.datetime.now():
        abort(404)
    return redirect(links[request_url]["url"])


@app.errorhandler(404)
def page_not_found(error):
   return render_template('404.html', page = pageData["404"][0], site=site), 404


def get_email_cookie_key(request_url):
    return "{}_email".format(request_url)


def get_id_cookie_key(request_url):
    return "{}_id".format(request_url)

if __name__ == "__main__":
    if auth.is_mock() or auth.is_local():
        app.run(host="localhost", port="8080")
    else:
        app.run()
