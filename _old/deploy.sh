# Builds and deploys the app to app.getcabra.com.
# Run this after running "gulp build".
# From root of project, run "build/deploy.sh".
yes overwrite | duck \
    --upload ftp://hathix5@ftp.hathix.com/public_html _site \
    -assumeyes
