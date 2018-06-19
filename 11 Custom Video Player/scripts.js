//<<>>index
//1. Get Our Elements
//2. Build out functions
//3. Hook up the event Listeners


//<<>>ㅣ학 html5 video tag method/properties   
//https://www.w3schools.com/tags/ref_av_dom.asp 


//<<>>lecture step list 
//stpe3 updateButton ► / ❚ ❚
//fn : updateButton
//event : video.play/pause

//step5 skip
//fn : skip
//event : skipButtons elements

//step6 handleRangeUpdate
//fn : handleRangeUpdate
//event : ranges

//step7 handleProgress
//fn : handleProgress
//event : timeupdate of video elements

//step8 scrub(click : progressBar move)
//fn : scrub
//event : progress elements

//step9 scrub(click and dragging : progressBar move)
//events : progress mousedown/mouseup

/* Get Our Elements */
//step1 
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build out functions */
//step2 : tooglePlay();
// paused : video elements attribute
/* *** Study turnery operator ( [] )
    elements[variables].attibute
*/
function togglePlay(){
    console.log("working? togglePlay fn")
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    console.log("working? updateButton fn")
    /* *** Study this in temrs of events 
        this : it's bound to the video elements it self (by queyrSelector)
    */
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip(){
    /* *** Study dataset
     * def) on the HTMLElement interface provides read/write 
     * access to all the custom data attributes (data-*) set on the element. 
     * 
     * 1. first Study at lecture 03 CSS variables 
     */
    console.log('working? skip' + JSON.stringify(this.dataset));
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    console.log('working? handleRangeUpdate : ' + this.value);
    //this.name : volumn || playbackRate
    video[this.name] = this.value;
}

function handleProgress(){
    console.log('working? handleRangeUpdate : ');
    const percent = (video.currentTime / video.duration) * 100;
    /**
     * *** Study CSS property(flex, flex-basis)
     * flex : sets the flexible length on flexible items.
     * flex-basis : specifies the initial length of a flexible item.
     */

    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    /* 
     * *** Study offsetX
    : def) offsetX value is progress elements positioned ralative, when you clicked
    : eg) value of first of progress bar : 1px
    : value of last of progress bar : progress.offsetWidth px
    */
    console.log('### e.offsetX : ' + e.offsetX);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove',  (e) => mousedown && scrub(e));
/**
 * ### same as above line
 * *** Study - && : hijacking the fact that we can use '&&' 
 * and if this is "true" it will move on to the scrub(e) 
 * (if this is "false" it will not move on the the scurb(e))
 * 
 * progress.addEventListener('mousemove, () =>
 *  if(mousedown){
 *      scrub();
 *  }
 * )
 */
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);