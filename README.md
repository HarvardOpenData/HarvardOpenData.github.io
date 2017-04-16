# [Harvard Open Data Project](http://harvard-open-data-project.github.io/)

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

Check out [our website](http://harvard-open-data-project.github.io/) to explore Harvard datasets. Or read our [Medium publication](https://medium.com/harvard-open-data-project) to learn about our mission, past projects, and ideas for the Harvard community.

### Get involved

Want to follow what we're up to or join our growing team of 40+ students?

- [Join our mailing list](https://groups.google.com/forum/#!forum/harvard-open-data)
- Follow us on [Medium](https://medium.com/harvard-open-data-project)
- Email Neel Mehta at neelmehta [at] college [dot] harvard [dot] edu

## Running the website

To set up our website, run the following in your terminal. You'll need to have Ruby installed (it's pre-installed on macOS and most Linux distributions.)

```
git clone https://github.com/Harvard-Open-Data-Project/harvard-open-data-project.github.io.git
cd harvard-open-data-project.github.io
sudo gem install bundler
bundle install
```

To run:

```
bundle exec jekyll serve
```

Or, as a shortcut, just do `chmod +x run.sh` once, then run

```
./run.sh
```

Anytime you want to start the app.
