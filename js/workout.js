console.log("✅ workout.js is loaded");

const workouts = {
  arms: [
    { name: "Bicep Curls", equipment: "dumbbells", duration: 30 },
    { name: "Tricep Dips", equipment: "none", duration: 30 },
    { name: "Shoulder Press", equipment: "dumbbells", duration: 30 }
  ],
  legs: [
    { name: "Squats", equipment: "none", duration: 40 },
    { name: "Lunges", equipment: "none", duration: 40 },
    { name: "Leg Press", equipment: "resistance-band", duration: 30 }
  ],
  "full-body": [
    { name: "Burpees", equipment: "none", duration: 30 },
    { name: "Mountain Climbers", equipment: "none", duration: 30 },
    { name: "Deadlifts", equipment: "dumbbells", duration: 40 }
  ],
  core: [
    { name: "Plank", equipment: "none", duration: 30 },
    { name: "Sit-Ups", equipment: "none", duration: 30 },
    { name: "Russian Twists", equipment: "dumbbells", duration: 30 }
  ]
};

// Timer storage
const timers = {};

function generateWorkout() {
  const bodyPart = document.getElementById("bodyPart").value;
  const equipment = document.getElementById("equipment").value;
  const resultDiv = document.getElementById("workoutResult");
  const displayPanel = document.getElementById("workoutDisplay");

  resultDiv.innerHTML = ""; // Clear old results

  if (!bodyPart || !equipment) {
    displayPanel.style.display = "block";
    resultDiv.innerHTML = `<p style="color:red;">⚠️ Please select both body part and equipment.</p>`;
    return;
  }

  // Filter workouts
  const filtered = workouts[bodyPart].filter(
    w => w.equipment === equipment || w.equipment === "none"
  );

  displayPanel.style.display = "block"; // show panel

  if (filtered.length === 0) {
    resultDiv.innerHTML = `<p>No workouts found for your selection.</p>`;
    return;
  }

  // Pick up to 3 random exercises
  const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

  selected.forEach((exercise, index) => {
    const timerId = `timer-${index}`;
    const pauseBtnId = `pause-${index}`;

    const card = document.createElement("div");
    card.className = "exercise-card";
    card.innerHTML = `
      <div class="exercise-info">
        <h4>${exercise.name}</h4>
        <p><strong>Equipment:</strong> ${exercise.equipment}</p>
        <p><strong>Duration:</strong> ${exercise.duration}s</p>
      </div>
      <div class="timer-wrapper">
        <div id="${timerId}" class="timer-circle">Ready</div>
        <div class="timer-controls">
          <button onclick="startTimer(${exercise.duration}, '${timerId}', '${pauseBtnId}')">▶</button>
          <button id="${pauseBtnId}" onclick="pauseResumeTimer('${timerId}', '${pauseBtnId}')">⏸</button>
          <button onclick="resetTimer(${exercise.duration}, '${timerId}', '${pauseBtnId}')">⏹</button>
        </div>
      </div>
    `;
    resultDiv.appendChild(card);

    timers[timerId] = {
      duration: exercise.duration,
      timeLeft: exercise.duration,
      interval: null,
      running: false,
      paused: false
    };
  });
}

// Timer functions
function startTimer(duration, elementId, pauseBtnId) {
  const timer = timers[elementId];
  if (timer.running) return;
  timer.running = true;
  timer.paused = false;
  if (timer.timeLeft <= 0) timer.timeLeft = timer.duration;

  const display = document.getElementById(elementId);
  const pauseBtn = document.getElementById(pauseBtnId);
  pauseBtn.innerHTML = "⏸";

  display.textContent = timer.timeLeft + "s";

  timer.interval = setInterval(() => {
    timer.timeLeft--;
    display.textContent = timer.timeLeft > 0 ? timer.timeLeft + "s" : "✅";
    if (timer.timeLeft <= 0) {
      clearInterval(timer.interval);
      timer.running = false;
      pauseBtn.innerHTML = "⏸";
    }
  }, 1000);
}

function pauseResumeTimer(elementId, pauseBtnId) {
  const timer = timers[elementId];
  const pauseBtn = document.getElementById(pauseBtnId);

  if (!timer.running && timer.timeLeft === timer.duration) return;

  if (!timer.paused) {
    clearInterval(timer.interval);
    timer.running = false;
    timer.paused = true;
    pauseBtn.innerHTML = "▶";
  } else {
    startTimer(timer.timeLeft, elementId, pauseBtnId);
    pauseBtn.innerHTML = "⏸";
  }
}

function resetTimer(duration, elementId, pauseBtnId) {
  const timer = timers[elementId];
  clearInterval(timer.interval);
  timer.timeLeft = duration;
  timer.running = false;
  timer.paused = false;
  document.getElementById(elementId).textContent = "Ready";
  document.getElementById(pauseBtnId).innerHTML = "⏸";
}
