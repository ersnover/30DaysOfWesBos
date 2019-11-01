const viewer = document.querySelector('.viewer')
const buttons = document.querySelectorAll('.player__button')
const toggle = document.querySelector('.toggle')
const inputs = document.querySelectorAll('input') 
const progressBar = document.querySelector('.progress__filled')
const progressDiv = document.querySelector('.progress')



// prevent page scroll on spacebar
window.onkeydown = function(e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  };

const handleClick = e => {
    (e.target.dataset.skip && skip(e.target.dataset.skip)) || togglePlay();
}

const togglePlay = () => {
    viewer.paused && viewer.play() || viewer.pause()
}

const skip = time => {
    time =  parseInt(time)
 
     if (viewer.currentTime + time <= 0) {
         viewer.currentTime = 0
     } else if (viewer.currentTime + time >= viewer.duration) {
         viewer.currentTime = viewer.duration
     } else {
         viewer.currentTime += time
     }
 
     return true
}

const handleSlider = e => {
    let param = e.target.name
    viewer[param] = e.target.value
}

function updateToggle() {
    let icon = this.paused ? '❚ ❚' : '►';
    toggle.textContent = icon
}

function handleProgress() {
    let percent = (viewer.currentTime / viewer.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    let percent = (e.offsetX / progressDiv.offsetWidth)
    let scrubTo = viewer.duration * percent
    viewer.currentTime = scrubTo
}

viewer.addEventListener('click', togglePlay)
viewer.addEventListener('pause', updateToggle)
viewer.addEventListener('play', updateToggle)
viewer.addEventListener('timeupdate', handleProgress)

window.addEventListener('keydown', e => e.code === 'Space' && togglePlay())
buttons.forEach(button => button.addEventListener('click',e => handleClick(e)))
inputs.forEach(input => input.addEventListener('input', e => handleSlider(e)))
progressDiv.addEventListener('click', scrub)



// SLIDERS



//player.currentTime