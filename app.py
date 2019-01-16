from flask import Flask
from flask import render_template
import yaml

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

@app.route('/')
def index():
    categories = getYml('./data/categories.yml')
    return render_template('index.html', site = site, page=pageData["index"][0], categories=categories)

@app.route('/about/')
def about():
    people = getYml('./data/people.yml')
    return render_template('about.html', site=site, people = people, page=pageData["about"][0])

@app.route('/catalog/')
def catalog():
    return render_template('catalog.html', site=site, categories = getYml("./data/categories.yml"),
                                 filetypes = getYml("./data/filetypes.yml"), page = pageData["catalog"][0])
