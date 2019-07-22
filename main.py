from flask import Flask, render_template, request, jsonify, make_response, redirect, url_for, abort
import yaml
import server.constants as constants
import server.auth as auth
import json
import server.demographics

app = Flask(__name__)


def getYml(filepath):
    with open(filepath) as infile:
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

@app.route('/')
def index():
    categories = getYml('./data/categories.yml')
    featured = enumerate(getYml('./data/featured.yml'))
    return render_template('index.html', site=site, page=pageData["index"][0], categories=categories, featured=featured)


@app.route('/about/')
def about():
    people = getYml('./data/people.yml')
    return render_template('about.html', site=site, people=people, page=pageData["about"][0])


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

@app.route('/demographics/', methods=['GET', 'POST'])
def demographics():
    userEmail = None
    userId = None
    response = None
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
                return redirect("/auth/demographics")
        responsesDict = auth.get_responses_dict(userEmail, db)
        return render_template("demographics.html", page=pageData["demographics"][0], site=site, demographics = responsesDict["demographics"], questions = demographicQuestions(), CLIENT_ID = constants.get_google_client_id(), responded = False)
    else: 
        userEmail = request.cookies[email_cookie_key]
        userId = request.cookies[id_cookie_key]
        if auth.is_authenticated(userEmail, userId, emails_ref):
            server.demographics.update_demographics(userEmail, request.form, demographicQuestions(), db)
            responsesDict = auth.get_responses_dict(userEmail, db)
            return render_template("demographics.html", page=pageData["demographics"][0], site=site, demographics = responsesDict["demographics"], questions = demographicQuestions(), CLIENT_ID = constants.get_google_client_id(), responded = True)
        else:
            # this happens if for some reason they've tried to fuck with their email or something gets corrupted
            abort("User credentials improper. Please sign out and sign back in")

@app.route("/auth/<request_url>", methods=["GET", "POST"])
def signin(request_url):
    email_cookie_key = get_email_cookie_key(request_url)
    id_cookie_key = get_id_cookie_key(request_url)
    if request.method == "GET":
        return render_template('auth.html', page=pageData["auth"][0], site=site, CLIENT_ID=constants.get_google_client_id(), request_url=request_url)
    else:
        try: 
            db = auth.get_survey_firestore_client()
            token = request.data
            email_doc = auth.authenticate_new_respondent(token, db)
            email_dict = email_doc.to_dict()
            userEmail = email_doc.id
            userId = email_dict["id"]
            # set the values of cookies to persist sign in
            response = make_response("SUCCESS", 201)
            response.set_cookie(email_cookie_key, userEmail)
            response.set_cookie(id_cookie_key, userId)
            return response
        except:
            # if there is an error, delete their cookies and indicate failure
            response = make_response("FAILURE", 406)
            response.set_cookie(email_cookie_key, expires = 0)
            response.set_cookie(id_cookie_key, expires = 0)
            return response

def get_email_cookie_key(request_url):
    return "{}_email".format(request_url)

def get_id_cookie_key(request_url):
    return "{}_id".format(request_url)
