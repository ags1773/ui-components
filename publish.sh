#!/bin/bash -e

npm run build:prod
node ./build-utils.js
cd ./dist

if [ $1 = "beta" ]; then
  echo "#### Publishing Beta Version ####"
  npm publish --tag beta
else
  echo "#### Publishing Prod Version ####"
  npm publish  
fi