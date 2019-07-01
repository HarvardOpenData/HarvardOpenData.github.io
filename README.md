# [Harvard College Open Data Project](http://harvard-open-data-project.github.io/)

## About us

> We're a student-faculty team dedicated to opening and analyzing [Harvard](https://harvard.edu) data to empower our community members to improve campus life.

We've teamed up with the former deputy CTO of the US, Harvard's CTO, and Harvard's Chief Digital Officer to build Harvard's first open data catalog​. We're empowering Harvard students to hack with Harvard data including admissions data, course catalogs, dhall menus, and university finances.​

Our main work includes:

- Gathering open data from around the Harvard community
- Analyzing and visualizing the data, or building applications around it
- Using these results to drive policy changes around Harvard
- Empowering Harvard students to also hack with this data to improve student life or the University

As we expand, we're looking for people with a passion for anything from data science to public policy. Join our team to ​build our web frontend and data analysis tools, create visualizations and apps with Harvard data, work closely with our mentors in the civic tech space, and craft university-wide open data policies.

### Learn more

Check out [our website](http://hodp.org/) to explore Harvard datasets. Or read our [Medium publication](https://medium.com/harvard-open-data-project) to learn about our mission, past projects, and ideas for the Harvard community.

### Get involved

Want to follow what we're up to or join our growing team of 40+ students?

- [Join our mailing list](https://groups.google.com/forum/#!forum/harvard-open-data)
- Follow us on [Medium](https://medium.com/harvard-open-data-project)
- Email Jeffrey at jdhe [at] college [dot] harvard [dot] edu

## Running the website

### Getting the Repo

To copy the repo to your computer run
```
$ git clone https://github.com/HarvardOpenData/HarvardOpenData.github.io.git
```


### Installing App Engine
If you’ve never worked with App Engine before, follow the steps [here](https://cloud.google.com/sdk/docs/) to install the Cloud SDK. (You can skip step #6).

### Set Up Your Virtual Environment
We’ll use a virtual environment to install the necessary packages without overriding or conflicting with existing packages on your computer. 

If you don’t already have virtualenv installed, install it using

```
$ pip install virtualenv
```

Create and activate your virtual environment. If your default version of Python is 2.7, run the below lines. If your default is not 2.7, read the answer [here](https://stackoverflow.com/questions/1534210/use-different-python-version-with-virtualenv) for how to modify the second line below.

```
$ cd HarvardOpenData.github.io/
$ python -m virtualenv hodp
$ source hodp/bin/activate
```

Install the required packages
```
$ pip install -t lib -r requirements.txt
```

### Local Testing
To test your app locally run the following in your root directory

```
$ dev_appserver.py app.yaml
```

### Workflow
Ready to work? Make sure you’re on the master branch of the github repo and create your own branch. We recommend naming your branch [first-initial][last-initial]-branchname. The name of the branch can be anything you’d like, but try to be descriptive and concise!

```
$ git checkout -b mn-newbranch
```

Some helpful tips!
* Commit often! This way, if you make a change you don’t like you can easily roll-back to your last commit and not risk losing all of your work!
* Be descriptive with your commit messages. This will help both yourself and others
* Try to keep your branch up to date with the master branch. This will help prevent merge conflicts when we eventually merge.

To pull from master, **first commit your changes to your branch.** Then run the following.

```
$ git checkout master
$ git pull
$ git checkout [your-branch-name]
$ git pull origin master
```

If you have some merge conflicts, resolve them (ideally fixing your code rather than the code on master) and then commit!

### Ready to Merge?
**Don’t merge your own branch to master!**

When you’re ready to merge, make sure all of your code has been committed and pushed to your branch.  Then go to [https://github.com/HarvardOpenData/HarvardOpenData.github.io](https://github.com/HarvardOpenData/HarvardOpenData.github.io) where you should see an option to compare and pull request.

![Github Screenshot](./readme_img_1.png)

1. **Click the Compare & pull request button.** This should bring you to a new screen where you can add comments about the changes you made.
2. **Add Maddy, Kevin, and at least 2 other members of the dev team as reviewers on your pull request.** You should see this option to the right of the comments box.
3. **Once you have approval from all your reviewers**, go ahead and merge!
