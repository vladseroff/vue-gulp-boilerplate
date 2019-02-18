// SETTINGS
let ipadHorizontal = 1024,
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

let fullPageOptions = {
    licenseKey: 'xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx',
    navigation: true,
    fitToSection: fpFitToSection,
    navigationPosition: 'right',
    sectionSelector: '.homepage__section',
    autoScrolling: fpAutoScrolling,
    verticalCentered: false,
    normalScrollElements: '#modal',
    afterLoad: (section, origin, destination, direction) => {
        if (window.innerWidth > ipadHorizontal || origin.index === 0) {
            let videoWrapper = document.querySelectorAll('.video-wrapper')
            for (let i = 0; i < videoWrapper.length; i++) {
                const element = videoWrapper[i];
                element.classList.remove('active')
            }

            videoWrapper[origin.index].classList.add('active')

            if (playingFirstVideo) {
                playMedia(origin.index)
            } else {
                if (origin.index !== 0) {
                    playMedia(origin.index)
                }
            }
        }
    }
}

// alert(`${window.innerWidth} ${window.innerHeight}`)

firstVideo.currentTime = firstVideoStartTime // SET START TIME FIRST VIDEO
    
// CHANGE BACKGROUND IMAGES FOR SECTIONS
function changeBG() {
    if (window.innerWidth <= ipadHorizontal) {
        let images
        if (window.innerWidth > ipadVertical) {
            images = bigBG
        } else if (window.innerWidth <= ipadVertical) {
            images = smBG
        }
        for (let i = 0; i < document.querySelectorAll('.homepage__section-bg').length; i++) {
            const element = document.querySelectorAll('.homepage__section-bg')[i];
            element.style.background = `url('assets/images/${images[i]}.jpg') center center no-repeat`
            element.style.backgroundSize = 'cover'
        }
    }
}

// CHANGE FIRST SECTION CHILDREN POSITION
function changeDOMParams(params) {
    if (window.innerWidth <= 1640) {
        overImg.style.width = `${firstVideo.offsetWidth}px`
        overImg.style.marginLeft = `-${overImg.offsetWidth / 2}px`
    } else {
        overImg.style.width = ''
        overImg.style.marginLeft = ''
    }
}

// LOADED FIRST VIDEO
function loadedFirstVideo() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.querySelector('#firstOverlay').classList.remove('btn-hide')
    } else {
        videoLoaded(firstVideo).then(() => {
            document.querySelector('#firstOverlay').classList.remove('btn-hide')
        })
    }
}

// LOADED VIDEO
function videoLoaded(video) {
    return new Promise((resolve) => {
        if (video.readyState !== 4) {
            video.oncanplaythrough = () => {
                resolve()
            }
        } else {
            resolve()
        }
    })
}

// LOADED AUDIO
function audioLoaded(audio) {
    return new Promise((resolve) => {
        if (audio.readyState !== 4) {
            audio.oncanplaythrough = () => {
                resolve()
            }
        } else {
            resolve()
        }
    })
}

// LOAD MEDIA FILES
function loadMedia(video, audio = null) {
    if (video) {
        videoLoaded(video).then(() => {
            if (audio) {
                audioLoaded(audio).then(() => {
                    video.play()
                    audio.play()
                })
            } else {
                video.play()
            }
        })
    }
}

// PLAY SECTION MEDIA FILES
function playMedia(index) {
    let video = allVideos[index],
        audio = null;

    if (video.previousElementSibling.tagName == 'AUDIO') {
        audio = video.previousElementSibling
    }
 
    for (let i = 0; i < allVideos.length; i++) {
        const element = allVideos[i];
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

    for (let index = 0; index < allAudios.length; index++) {
        const element = allAudios[index];
        element.pause();
        element.currentTime = 0;
    }

    loadMedia(video, audio)
}

changeDOMParams()
changeBG()

window.addEventListener('resize', () => {
    changeDOMParams()
    changeBG()
})

let FullPage = new fullpage('#fullpage', fullPageOptions);

if (document.readyState === 'complete' ) {
    loadedFirstVideo()
} else {
    document.addEventListener('DOMContentLoaded', () => {
        loadedFirstVideo()
    })
}

muteBtn.addEventListener('click', () => {
    let videos = allVideos
    let audios = allAudios

    muted = !muted

    for (let i = 0; i < videos.length; i++) {
        const element = videos[i];
        element.muted = muted
    }

    for (let i = 0; i < audios.length; i++) {
        const element = audios[i];
        element.muted = muted
    }

    if (muted) {
        muteBtn.classList.add('muted')
    } else {
        muteBtn.classList.remove('muted')
    }
})

document.querySelector('#cook').addEventListener('click', () => {
    document.querySelector('.homepage__section_one').classList.add('playing')
    playingFirstVideo = true
    let video = allVideos[0]; 
    video.play();
})

document.querySelector('#modal-open').addEventListener('click', () => {
    document.querySelector('body').classList.add('opened-modal')
})

document.querySelector('#modal-close').addEventListener('click', () => {
    document.querySelector('body').classList.remove('opened-modal')
    fullpage_api.destroy();
    FullPage = new fullpage('#fullpage', fullPageOptions);
})

let mouse = document.querySelectorAll('.mouse')

for (let i = 0; i < mouse.length; i++) {
    mouse[i].addEventListener('click', () => {
        fullpage_api.moveSectionDown()
    })
}
