/* eslint-disable no-var */
/* eslint-env qunit */
var hls = require('../es5/videojs-contrib-hls.js');
var q = window.QUnit;

q.module('Webpack Require');
q.test('hls should be requirable and bundled via webpack', function(assert) {
  assert.ok(hls, 'videojs-contrib-hls is required properly');
});
