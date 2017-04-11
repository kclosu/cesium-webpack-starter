#!/bin/bash

workdir=$( pwd )

cd node_modules/cesium
npm install

curl -L -O https://github.com/AnalyticalGraphicsInc/cesium/raw/3d-tiles/gulpfile.js
echo "
gulp.task('buildShaders', function(done) {
  glslToJavaScript(false, 'Build/minifyShaders.state');
  done();
});
gulp.task('buildWorkers', function(done) {
  combineWorkers(true, 'none', \"${workdir}/dist/assets/cesium\")
  done();
});
" >> gulpfile.js

sed -i -e 's|npm run requirejs --|./node_modules/.bin/gulp requirejs|g' gulpfile.js

./node_modules/.bin/gulp buildShaders
./node_modules/.bin/gulp buildWorkers
