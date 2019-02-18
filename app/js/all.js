"use strict";

// SETTINGS
var ipadHorizontal = 1024,
    ipadVertical = 768,
    fpAutoScrolling = true,
    fpFitToSection = true,
    playingFirstVideo = false,
    bigBG = ['1024-2', '1024-3', '1024-4', '1024-5', '1024-6', '1024-7'],
    smBG = ['768-2', '768-3', '768-4', '768-5', '768-6', '768-7'],
    allVideos = document.querySelectorAll('.video'),
    allAudios = document.querySelectorAll('.audio'),
    muted = false,
    overImg = document.querySelector('.over-img'),
    firstVideo = allVideos[0],
    firstVideoStartTime = 2,
    muteBtn = document.querySelector('.mute');
var fullPageOptions = {
  licenseKey: 'xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx',
  navigation: true,
  fitToSection: fpFitToSection,
  navigationPosition: 'right',
  sectionSelector: '.homepage__section',
  autoScrolling: fpAutoScrolling,
  verticalCentered: false,
  normalScrollElements: '#modal',
  afterLoad: function afterLoad(section, origin, destination, direction) {
    if (window.innerWidth > ipadHorizontal || origin.index === 0) {
      var videoWrapper = document.querySelectorAll('.video-wrapper');

      for (var i = 0; i < videoWrapper.length; i++) {
        var element = videoWrapper[i];
        element.classList.remove('active');
      }

      videoWrapper[origin.index].classList.add('active');

      if (playingFirstVideo) {
        playMedia(origin.index);
      } else {
        if (origin.index !== 0) {
          playMedia(origin.index);
        }
      }
    }
  } // alert(`${window.innerWidth} ${window.innerHeight}`)

};
firstVideo.currentTime = firstVideoStartTime; // SET START TIME FIRST VIDEO
// CHANGE BACKGROUND IMAGES FOR SECTIONS

function changeBG() {
  if (window.innerWidth <= ipadHorizontal) {
    var images;

    if (window.innerWidth > ipadVertical) {
      images = bigBG;
    } else if (window.innerWidth <= ipadVertical) {
      images = smBG;
    }

    for (var i = 0; i < document.querySelectorAll('.homepage__section-bg').length; i++) {
      var element = document.querySelectorAll('.homepage__section-bg')[i];
      element.style.background = "url('assets/images/".concat(images[i], ".jpg') center center no-repeat");
      element.style.backgroundSize = 'cover';
    }
  }
} // CHANGE FIRST SECTION CHILDREN POSITION


function changeDOMParams(params) {
  if (window.innerWidth <= 1640) {
    overImg.style.width = "".concat(firstVideo.offsetWidth, "px");
    overImg.style.marginLeft = "-".concat(overImg.offsetWidth / 2, "px");
  } else {
    overImg.style.width = '';
    overImg.style.marginLeft = '';
  }
} // LOADED FIRST VIDEO


function loadedFirstVideo() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.querySelector('#firstOverlay').classList.remove('btn-hide');
  } else {
    videoLoaded(firstVideo).then(function () {
      document.querySelector('#firstOverlay').classList.remove('btn-hide');
    });
  }
} // LOADED VIDEO


function videoLoaded(video) {
  return new Promise(function (resolve) {
    if (video.readyState !== 4) {
      video.oncanplaythrough = function () {
        resolve();
      };
    } else {
      resolve();
    }
  });
} // LOADED AUDIO


function audioLoaded(audio) {
  return new Promise(function (resolve) {
    if (audio.readyState !== 4) {
      audio.oncanplaythrough = function () {
        resolve();
      };
    } else {
      resolve();
    }
  });
} // LOAD MEDIA FILES


function loadMedia(video) {
  var audio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (video) {
    videoLoaded(video).then(function () {
      if (audio) {
        audioLoaded(audio).then(function () {
          video.play();
          audio.play();
        });
      } else {
        video.play();
      }
    });
  }
} // PLAY SECTION MEDIA FILES


function playMedia(index) {
  var video = allVideos[index],
      audio = null;

  if (video.previousElementSibling.tagName == 'AUDIO') {
    audio = video.previousElementSibling;
  }

  for (var i = 0; i < allVideos.length; i++) {
    var element = allVideos[i];

    if (playingFirstVideo) {
      element.pause();
      element.currentTime = 0;
    } else {
      if (index !== 0) {
        element.pause();
        element.currentTime = 0;
      }
    }
  }

  for (var _index = 0; _index < allAudios.length; _index++) {
    var _element = allAudios[_index];

    _element.pause();

    _element.currentTime = 0;
  }

  loadMedia(video, audio);
}

changeDOMParams();
changeBG();
window.addEventListener('resize', function () {
  changeDOMParams();
  changeBG();
});
var FullPage = new fullpage('#fullpage', fullPageOptions);

if (document.readyState === 'complete') {
  loadedFirstVideo();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    loadedFirstVideo();
  });
}

muteBtn.addEventListener('click', function () {
  var videos = allVideos;
  var audios = allAudios;
  muted = !muted;

  for (var i = 0; i < videos.length; i++) {
    var element = videos[i];
    element.muted = muted;
  }

  for (var _i = 0; _i < audios.length; _i++) {
    var _element2 = audios[_i];
    _element2.muted = muted;
  }

  if (muted) {
    muteBtn.classList.add('muted');
  } else {
    muteBtn.classList.remove('muted');
  }
});
document.querySelector('#cook').addEventListener('click', function () {
  document.querySelector('.homepage__section_one').classList.add('playing');
  playingFirstVideo = true;
  var video = allVideos[0];
  video.play();
});
document.querySelector('#modal-open').addEventListener('click', function () {
  document.querySelector('body').classList.add('opened-modal');
});
document.querySelector('#modal-close').addEventListener('click', function () {
  document.querySelector('body').classList.remove('opened-modal');
  fullpage_api.destroy();
  FullPage = new fullpage('#fullpage', fullPageOptions);
});
var mouse = document.querySelectorAll('.mouse');

for (var i = 0; i < mouse.length; i++) {
  mouse[i].addEventListener('click', function () {
    fullpage_api.moveSectionDown();
  });
}
// const store = new Vuex.Store({
//     state: {
//     },
//     mutations: {
//     },
//     actions: {
//     }
// })
"use strict";
//# sourceMappingURL=all.js.map
