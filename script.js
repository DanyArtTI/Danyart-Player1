const songName = document.getElementById ("song-name");
const bandName = document.getElementById ("band-name");
const cover = document.getElementById ("cover");
const song = document.getElementById ("audio");
const play = document.getElementById ('play');
const lakeButton = document.getElementById ('lake');
const currentProgress = document.getElementById ('current-progress');
const progressConteiner = document.getElementById ('progress-conteiner');
const shuffleButton = document.getElementById ('shuffle');   
const replyButton = document.getElementById ('reply'); 
const relpButton = document.getElementById ('relp'); 
const personButton = document.getElementById ('person'); 
const songTime = document.getElementById ('song-time');
const totalTime = document.getElementById ('total-time');

const afaMusic = {
    songName : 'afs_music',
    artist : 'Araujo S',
    file : 'afs_music', 
    liked: false,
 

};

const agoraSamosex = {
    songName : 'agora_somos',
    artist : 'Pablo',
    file : 'agora_somos', 
    liked: false,

};

const djDaniel = {
    songName : 'dj_daniel',
    artist : 'Daniel A',
    file : 'dj_daniel',
    liked:false,

};

let inplaying = false;
let inshuffled = false;
let replyOn = false;

const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [afaMusic,agoraSamosex,djDaniel,];
let sortdPlaylist =[...originalPlaylist];
let index = 0;


function playsong() {
    play.querySelector('.bi').classList.remove('bi-play-circle');
    play.querySelector('.bi').classList.add('bi-pause-circle');
    song.play();
    inplaying = true;

}

function pausesong() {
    play.querySelector('.bi').classList.add('bi-play-circle');
    play.querySelector('.bi').classList.remove('bi-pause-circle');
    song.pause();
    inplaying = false;

}

function pleypausedecider () {
    if(inplaying === true){
        pausesong ();
    }
    else {
        playsong();
    }
}

function likeButtonRender() {
    if(sortdPlaylist[index].liked === true){
        lakeButton.querySelector('.bi').classList.remove('bi-heart');
        lakeButton.querySelector('.bi').classList.add('bi-heart-fill');
        lakeButton.classList.add('button-active');
        
    }

    else{
        lakeButton.querySelector('.bi').classList.add('bi-heart');
        lakeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        lakeButton.classList.remove('button-active');
        
    }
}

function initializeSong (){
    cover.src = `imagens/${sortdPlaylist[index].file}.jpeg`;
    song.src = `songs/${sortdPlaylist[index].file}.mp3`;
    songName.innerText = sortdPlaylist[index].songName;
    bandName.innerText = sortdPlaylist[index].artist;
    likeButtonRender();
   
}

function relpsong (){
    if(index === 0){
        index = sortdPlaylist.length - 1;    }
        else {
            index -= 1;
        }
            initializeSong();
            playsong ();
        
}

function nextdong (){
    if(index === sortdPlaylist.length - 1){
        index = 0;    }
        else {
            index += 1;
        }
            initializeSong();
            playsong ();
        
}

function updateProgress(){
    
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty ('--progress', `${barWidth}% `);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo (event){
    const wind = progressConteiner.clientWidth;
    const clickPosition = event.offsetX;
    const jumptoTime = (clickPosition/wind)* song.duration;
    song.currentTime = jumptoTime;

}

function shufflePlayArray (preshuffleArray){

const size = preshuffleArray.length;
let currentIndex = size -1;
while(currentIndex > 0) {
let roundIndex = Math.floor(Math.round ()*size);
let aux = preshuffleArray[currentIndex];
preshuffleArray[currentIndex]= preshuffleArray[roundIndex];
preshuffleArray[roundIndex]= aux;
currentIndex -=1;


}

}

function shuffleButtonclick () {
    if(inshuffled===false){
        inshuffled = true;
        shufflePlayArray(sortdPlaylist);
        shuffleButton.classList.add('button-active');

    }
    else{
        inshuffled = false;
        sortdPlaylist=[...originalPlaylist];
        shuffleButton.classList.remove('button-active');

    }

}

function replybuttonClick (){
    if( replyOn === false){
        replyOn= true;
        replyButton.classList.add('button-active');

    }
    else{
        replyOn= false;
        replyButton.classList.remove('button-active');

    }


}

function nextOrreply(){
    if( replyOn === false){
        nextdong()
    }
    else{
        playsong();
    }
}

function toHHMMSS (originalNumber){
    let hours= Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600-min*60);

    return `${ hours.toString().padStart(2,'0')}: ${min.toString()
        .padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
        

    }




   



function updateTotalTime(){
    totalTime.innerText =toHHMMSS(song.duration);


}



function lakeButtonClick(){
    if(sortdPlaylist[index].liked === false){
        sortdPlaylist[index].liked = true;
    } else{
        sortdPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist',JSON.stringify(originalPlaylist

    ));

}

initializeSong ();

play.addEventListener('click', pleypausedecider );
relp.addEventListener('click', relpsong );
person.addEventListener('click', nextdong );
song.addEventListener('timeupdate', updateProgress );
song.addEventListener('ended',nextOrreply );
song.addEventListener('loadedmetadata',updateTotalTime);
progressConteiner.addEventListener('click', jumpTo );
shuffleButton.addEventListener('click', shuffleButtonclick );
replyButton.addEventListener ('click', replybuttonClick );
lakeButton.addEventListener ('click', lakeButtonClick );