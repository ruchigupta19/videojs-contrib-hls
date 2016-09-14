let q = window.QUnit;
let videojs = require('video.js');
require('../es5/videojs-contrib-hls.js');

let when = function(element, type, fn, condition) {
  let func = function() {
    if (condition()) {
      element.off(type, func);
      fn.apply(this, arguments);
    }
  };

  element.on(type, func);
};

q.module('Webpack Integration', {
  beforeEach: function(assert) {
    let done = assert.async();
    let videoEl;
    let player;

    this.fixture = document.createElement('div');
    document.body.appendChild(this.fixture);

    videoEl = document.createElement('video');
    videoEl.id = 'vid';
    videoEl.setAttribute('controls', '');
    videoEl.setAttribute('width', '600');
    videoEl.setAttribute('height', '300');
    videoEl.className = 'video-js vjs-default-skin';
    this.fixture.appendChild(videoEl);

    player = videojs('vid');
    this.player = player;

    player.ready(function() {
      player.one('loadstart', done);

      player.src({
        src: 'http://solutions.brightcove.com/jwhisenant/hls/apple/bipbop/bipbopall.m3u8',
        type: 'application/x-mpegURL'
      });
    });
  },
  afterEach: function() {
    this.player.dispose();
    this.fixture.innerHTML = '';
  }
});

q.test('should play', function(assert) {
  let done = assert.async();
  let player = this.player;

  assert.expect(2);

  when(player, 'timeupdate', function() {
    assert.ok(true, 'played for at least two seconds');
    assert.equal(player.error(), null, 'has no player errors');

    done();
  }, function() {
    return player.currentTime() >= 2;
  });

  player.play();
});
