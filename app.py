from flask import Flask
from flask import render_template
import yaml

app = Flask(__name__)
def siteConstants():
    site = getYml('./data/site.yml')
    site["pages"] = getYml('./data/pages.yml')
    return site

def getYml(filepath):
    with open(filepath) as infile:
        fileMap = yaml.safe_load(infile)
        return fileMap

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    pageData = getYml('./data/pageData.yml')
    print(pageData)
    peopleMap = getYml('./data/people.yml')
    site = siteConstants()
    return render_template('about.html', site=site, peopleMap = peopleMap, page=pageData["about"])