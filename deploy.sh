#!/bin/bash
set -e
cd pmp-project-manager
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
npm install
ls -l node_modules/.bin
cat package.json | grep vite
npx vite --version
npx vite build
cd ..
rm -rf pmp-project-manager/*
cp -r pmp-project-manager/dist/* pmp-project-manager/
echo '/*    /pmp-project-manager/index.html   200' > pmp-project-manager/_redirects 