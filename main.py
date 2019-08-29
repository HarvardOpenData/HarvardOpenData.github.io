from flask import Flask, render_template, request, jsonify, make_response, redirect, url_for, abort
import yaml
import server.constants as constants
import server.auth as auth
from server.members import Member
import json
import os
import server.demographics
import tempfile

app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 0.5 * 1024 * 1024 


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


@app.route('/')
def index():
    categories = getYml('./data/categories.yml')
    featured = enumerate(getYml('./data/featured.yml'))
    return render_template('index.html', site=site, page=pageData["index"][0], categories=categories, featured=featured)


@app.route('/about/')
def about():
    people = getYml('./data/people.yml')
    members = []
    db = auth.get_website_firestore_client()
    for person in people["people"]:
        if "email" in person:
            member = auth.get_member(person["email"], None, db, True)
            if member is not None:
                member.merge_people_dict(person)
                members.append(member)
            else:
                member = Member(None)
                member.merge_people_dict(person)
                members.append(member)
        else:
            member = Member(None)
            member.merge_people_dict(person)
            members.append(member)   
    return render_template('about.html', site=site, people=people, members = members, page=pageData["about"][0])

@app.route('/people/')
def people():
    people = getYml('./data/people.yml')
    return render_template('people.html', site=site, people=people, page=pageData["about"][0])


@app.route('/calendar/')
def calendar():
    return render_template('calendar.html', site=site, page=pageData["calendar"][0])


@app.route('/catalog/')
def catalog():
    return render_template('catalog.html', site=site, categories=getYml("./data/categories.yml"),
                           filetypes=getYml("./data/filetypes.yml"), page=pageData["catalog"][0])


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
    if request.method == "GET":
        people : list = getYml('./data/people.yml')["people"]
        
        person_dict = next((person for person in people if "email" in person and person["email"] == member.email), None)
        if person_dict is not None:
            member.merge_people_dict(person_dict) 
            
        contributionsJson = "[\n\n]"
        if member.contributions is not None: 
            contributionsJson = json.dumps(member.contributions, indent=4)

        return render_template("profile.html", page=pageData["profile"][0], site=site, member=member, contributionsJson = contributionsJson, CLIENT_ID=constants.get_google_client_id(), responded=True)
    elif request.method == "POST":
        try: 
            if "photo_upload" in request.files:
                photo = request.files["photo_upload"]
                if photo.filename:
                    filetype = photo.filename.split(".")[-1]
                    storage_client = auth.get_website_storage_client()
                    bucket = storage_client.bucket("hodp-member-images")
                    uploaded_filename = "{}.{}".format(member.member_id, filetype)
                    blob = bucket.blob(uploaded_filename)
                    temp = tempfile.NamedTemporaryFile(delete=False)
                    photo.save(temp.name)
                    blob.upload_from_file(temp)
                    os.remove(temp.name)
                    blob.make_public()
                    member.img_url = blob._get_download_url()
            member.update_from_form(request.form)
            member.save(db)
            return redirect("/profile/")
        except Exception as e:
            return make_response("Failed to update profile: {}".format(e), 400)
@app.route("/auth/<request_url>/", methods=["GET", "POST"])
def signin(request_url):
    title_dict = {
        "surveygroup": "Survey Group",
        "demographics": "Demographics",
        "profile" : "My Profile"
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
