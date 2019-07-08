from flask import Flask, session, render_template, request, jsonify
import yaml
import server.constants as constants
import server.auth as auth
import json

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

@app.route('/demographics', methods=['GET', 'POST'])
def demographics():
    if request.method == 'GET':
        userEmail = None
        userId = None
        if "email" in session:
                userEmail = session["email"]
        if "id" in session: 
                userId = session["id"]
        db = auth.get_survey_firestore_client()
        if not auth.is_authenticated(userEmail, userId, db):
                return get_auth('/demographics')
        return None
    elif request.method == 'POST':
        token = request.data
        print(auth.authenticate_new(token, auth.get_survey_firestore_client()))
        return "Hello"

def get_auth(request_url):
    return render_template('auth.html', page=pageData["auth"][0], site=site, CLIENT_ID=constants.get_google_client_id(), request_url=request_url)
