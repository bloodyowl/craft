#!/bin/sh
node test/server.js &
node ./build/watch.js -w -o ./dist/craft.js ./src/core.js &
wait