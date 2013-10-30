#!/bin/sh
node test/server.js &
node ./build/build.js -w -o ./dist/craft.js ./src/core.js &
wait