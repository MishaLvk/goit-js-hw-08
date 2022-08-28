import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let savedSecond = localStorage.getItem('videoplayer-current-time');

if (!savedSecond) {
  savedSecond = 0;
}

const onTimeupdate = function ({ seconds } = data) {
  localStorage.setItem('videoplayer-current-time', seconds);
};

player.on('timeupdate', throttle(onTimeupdate, 1000));

player
  .setCurrentTime(savedSecond)
  .then(function (savedSecond) {
    // seconds = the actual time that the player seeked to
    player.off('play');
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
