#!/bin/bash
# Double-click in Finder to put the portfolio online at
# https://portfoliodp.web.app
# (First time: right-click > Open, because macOS asks before running
#  a downloaded script.)

cd "$(dirname "$0")" || exit 1
PROJECT="portfolio-e1264"
SITE="portfoliodp"

echo "=============================================="
echo " Our Portfolio  ->  https://$SITE.web.app"
echo "=============================================="
echo

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js is not installed. Install the LTS version from"
  echo "https://nodejs.org , then double-click this file again."
  read -r -p "Press Return to close." _; exit 1
fi

if ! command -v firebase >/dev/null 2>&1; then
  echo "Installing the Firebase tools (one time)..."
  npm install -g firebase-tools || {
    echo; echo "Install failed. In Terminal run:  sudo npm install -g firebase-tools"
    read -r -p "Press Return to close." _; exit 1; }
fi

# If you edited anything in src/, rebuild the site first.
if [ -d node_modules ] || [ "$1" = "--build" ]; then
  echo "Building the site..."
  [ -d node_modules ] || npm install || exit 1
  npm run build || { read -r -p "Build failed. Press Return to close." _; exit 1; }
fi

echo "Checking your Firebase sign-in (a browser window opens if needed)..."
firebase login || { read -r -p "Sign-in failed. Press Return to close." _; exit 1; }

echo
echo "Uploading..."
if firebase deploy --only hosting --project "$PROJECT"; then
  echo
  echo "Done. Your portfolio is live at:"
  echo "   https://$SITE.web.app"
  open "https://$SITE.web.app" 2>/dev/null
else
  echo
  echo "Upload failed. Check that you signed in with the Google account"
  echo "that owns the Firebase project $PROJECT."
fi
echo
read -r -p "Press Return to close." _
