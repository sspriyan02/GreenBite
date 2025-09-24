// Breathing
let breathInterval;
const breathCircle = document.getElementById("breathCircle");
const breathText = document.getElementById("breathPhase");
const breathStartBtn = document.getElementById("breathStart");
const breathStopBtn = document.getElementById("breathStop");

function startBreathing() {
  let phase = 0;
  const duration = parseInt(document.getElementById("breathDuration").value) * 1000;
  const phases = [
    { text:"Inhale", class:"breath-grow" },
    { text:"Hold", class:"breath-hold" },
    { text:"Exhale", class:"breath-shrink" },
  ];
  function nextPhase() {
    const {text, class:cls} = phases[phase];
    breathText.textContent = text;
    breathCircle.className = `breath-circle ${cls}`;
    phase = (phase+1)%phases.length;
    breathInterval = setTimeout(nextPhase,duration);
  }
  nextPhase();
}

function stopBreathing() {
  clearTimeout(breathInterval);
  breathCircle.className = "breath-circle";
  breathText.textContent = "Ready";
}

breathStartBtn.addEventListener("click",()=>{
  startBreathing();
  breathStartBtn.disabled = true;
  breathStopBtn.disabled = false;
});
breathStopBtn.addEventListener("click",()=>{
  stopBreathing();
  breathStartBtn.disabled = false;
  breathStopBtn.disabled = true;
});

// Meditation
let medTimer, medSeconds = parseInt(document.getElementById("medDuration").value), isPaused=false;
const medClock = document.getElementById("medClock");
const startMedBtn = document.getElementById("medStart");
const pauseMedBtn = document.getElementById("medPause");
const resetMedBtn = document.getElementById("medReset");
const progressRing = document.getElementById("progressRing");
const radius = progressRing.r.baseVal.value;
const circumference = 2*Math.PI*radius;
progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = circumference;

function updateMedClock(){
  let mins=Math.floor(medSeconds/60);
  let secs=medSeconds%60;
  medClock.textContent=`${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  const duration = parseInt(document.getElementById("medDuration").value);
  const offset = circumference - (medSeconds/duration)*circumference;
  progressRing.style.strokeDashoffset = offset;
}

function startMeditation(){
  const duration = parseInt(document.getElementById("medDuration").value);
  medSeconds=duration;
  clearInterval(medTimer);
  medTimer=setInterval(()=>{
    if(medSeconds>0){ medSeconds--; updateMedClock(); } else { clearInterval(medTimer); completedSession(); }
  },1000);
  startMedBtn.disabled=true; pauseMedBtn.disabled=false; resetMedBtn.disabled=false;
}

function pauseMeditation(){
  if(!isPaused){ clearInterval(medTimer); isPaused=true; pauseMedBtn.textContent="Resume"; }
  else{ startMeditation(); isPaused=false; pauseMedBtn.textContent="Pause"; }
}

function resetMeditation(){
  clearInterval(medTimer);
  medSeconds=parseInt(document.getElementById("medDuration").value);
  updateMedClock();
  startMedBtn.disabled=false; pauseMedBtn.disabled=true; resetMedBtn.disabled=true;
  pauseMedBtn.textContent="Pause";
}

startMedBtn.addEventListener("click",startMeditation);
pauseMedBtn.addEventListener("click",pauseMeditation);
resetMedBtn.addEventListener("click",resetMeditation);

// Ambient
const ambientAudio=new Audio("assets/sounds/ambient.mp3");
ambientAudio.loop=true;
document.getElementById("ambientToggle").addEventListener("change",(e)=>{
  if(e.target.checked){ ambientAudio.play(); } else { ambientAudio.pause(); }
});
document.getElementById("ambientVolume").addEventListener("input",(e)=>{ ambientAudio.volume=e.target.value; });

// Session Tracker
const completedCount=document.getElementById("completedCount");
const resetCompleted=document.getElementById("resetCompleted");

function completedSession(){
  let count=parseInt(localStorage.getItem("completedSessions")||0);
  count++; localStorage.setItem("completedSessions",count); updateSessionCount();
}

function updateSessionCount(){ completedCount.textContent=localStorage.getItem("completedSessions")||0; }
resetCompleted.addEventListener("click",()=>{
  localStorage.setItem("completedSessions",0); updateSessionCount();
});

updateSessionCount();
updateMedClock();
