#!/bin/bash -e

npm run build:prod
cp ./package.json ./dist/
cd ./dist
npm publish