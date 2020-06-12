#!/bin/bash

SOURCE_DIR=../src;
TO_SOURCE_DIR=src;
PACK_DIR=package;
ROOT_DIR=..;
PUBLISH=--publish

install(){
    npm i
}

cleanup() {
            node -e "var fs=require('fs');\
    var package_json=JSON.parse(fs.readFileSync('./${TO_SOURCE_DIR}/package.json'));\
    delete package_json['scripts']['aar-update'];\
    delete package_json['scripts']['aar-remove'];\
    fs.writeFileSync('./${TO_SOURCE_DIR}/package.json', JSON.stringify(package_json, null, 2));\
    "
}
addResources() {
    # copy README & LICENSE to src
    echo 'Copying README, HOW_TO_INTEGRATE and API_USAGE to /src...'
    node_modules/.bin/ncp "$ROOT_DIR"/HOW_TO_INTEGRATE.MD "$TO_SOURCE_DIR"/HOW_TO_INTEGRATE.MD
    node_modules/.bin/ncp "$ROOT_DIR"/API_USAGE.MD "$TO_SOURCE_DIR"/API_USAGE.MD
    node_modules/.bin/ncp "$ROOT_DIR"/README.MD "$TO_SOURCE_DIR"/README.MD
}
pack() {

    echo 'Clearing /src and /package...'
    node_modules/.bin/rimraf "$TO_SOURCE_DIR"
    node_modules/.bin/rimraf "$PACK_DIR"

    # copy src
    echo 'Copying src...'
    node_modules/.bin/ncp "$SOURCE_DIR" "$TO_SOURCE_DIR"

    # copy README & LICENSE to src
    echo 'Copying README and LICENSE to /src...'
    node_modules/.bin/ncp "$ROOT_DIR"/LICENSE "$TO_SOURCE_DIR"/LICENSE
    node_modules/.bin/ncp "$ROOT_DIR"/README.md "$TO_SOURCE_DIR"/README.md

# edit package.json
cleanup
# add HOW_TO_INTEGRATE, API_USAGE
addResources


    # compile package and copy files required by npm
    echo 'Building /src...'
    cd "$TO_SOURCE_DIR"
    node_modules/.bin/tsc
    cd ..

    echo 'Creating package...'
    # create package dir
    mkdir "$PACK_DIR"

    # create the package
    cd "$PACK_DIR"
    npm pack ../"$TO_SOURCE_DIR"

    # delete source directory used to create the package
    cd ..
    node_modules/.bin/rimraf "$TO_SOURCE_DIR"
}

install && pack