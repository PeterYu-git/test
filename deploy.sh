#!/bin/bash
set -e
cd pmp-project-manager
npm install
npm run build
cd ..
rm -rf pmp-project-manager/*
cp -r pmp-project-manager/dist/* pmp-project-manager/
echo '/*    /pmp-project-manager/index.html   200' > pmp-project-manager/_redirects 