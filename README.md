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

To set up our website, you'll need to have Ruby installed - it comes preinstalled on Linux and macOS. On macOS, the preinstalled version of Ruby is usually too old, so you should install the newer version with Homebrew: `brew install ruby`.

Once your Ruby is set up, run the following in your terminal:

```
git clone https://github.com/HarvardOpenData/HarvardOpenData.github.io.git
cd HarvardOpenData.github.io
sudo gem install bundler
bundle install
```

To run:

```
bundle exec jekyll serve
```

Anytime you want to start the app.
