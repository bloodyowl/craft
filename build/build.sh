node ./build/build.js -o ./dist/craft.js ./src/core.js
node ./test/server.js &
phantomjs ./test/runner.js http://localhost:8080/test && kill $!