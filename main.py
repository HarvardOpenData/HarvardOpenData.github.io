from flask import Flask, render_template, request, jsonify, make_response, redirect, url_for, abort
import yaml
import server.constants as constants
import server.auth as auth
from server.members import Member, MembersCache, add_members_to_firestore
import json
import os
import server.demographics
import tempfile
import random, datetime, time

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


site = siteConstants()
pageData = getYml('./data/pageData.yml')
auth.init_survey_firebase()
auth.init_website_firebase()

members_cache = MembersCache()
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

@app.route('/projects/')
def projects():
    return redirect("https://docs.google.com/spreadsheets/d/1HGegvm3OcLSV3zyI1fUcoPLHMUbDaM5ZWJSVb3Gx69Y/edit?usp=sharing")

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
    return render_template('webapps/hudsmenu.html', site=site, page=pageData['hudsmenu'][0])


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


@app.route("/app/finals", methods = ["GET", "POST"])
def finals_app():
    # KEVIN: find way to get the data for the finals courses times
    courses = []

    if request.method == "GET":
        # what happens when someone comes to the website for the first time
        return render_template("webapp/finals_app/index.html", page=pageData["finals_app"][0], site=site, courses = courses)
    elif request.method == "POST":
        # this is how to get the data that the user submitted
        form_data = request.form
        year = form_data.get("year", -1)

        # do your calculations here to get the google flights

        # will need to pass the variables into here
        return render_template("webapp/finals_app/result.html", page=pageData["finals_app"][0], site=site)


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


def get_email_cookie_key(request_url):
    return "{}_email".format(request_url)


def get_id_cookie_key(request_url):
    return "{}_id".format(request_url)

if __name__ == "__main__":
    if auth.is_mock() or auth.is_local():
        app.run(host="localhost", port="8080")
    else:
        app.run()
    