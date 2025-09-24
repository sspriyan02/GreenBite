// Clear previous error messages
function clearErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach(err => err.textContent = "");
}

// Show error message under specific input
function showError(inputId, message) {
  const inputElement = document.getElementById(inputId);
  const errorElement = inputElement.parentNode.querySelector(".error-message");
  if (errorElement) {
    errorElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
  }
}

function calculateCalories() {
  clearErrors();

  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const activity = parseFloat(document.getElementById("activity").value);

  let hasError = false;
  if (!age) { showError("age", "Please enter your age"); hasError = true; }
  if (!gender) { showError("gender", "Please select your gender"); hasError = true; }
  if (!weight) { showError("weight", "Please enter your weight"); hasError = true; }
  if (!height) { showError("height", "Please enter your height"); hasError = true; }
  if (!activity) { showError("activity", "Please select activity level"); hasError = true; }
  if (hasError) return;

  // Calculate BMR
  let BMR = (gender === "male")
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const TDEE = Math.round(BMR * activity);
  const carbs = Math.round((TDEE * 0.5) / 4);
  const protein = Math.round((TDEE * 0.2) / 4);
  const fat = Math.round((TDEE * 0.3) / 9);

  const carbPerc = Math.round((carbs*4/TDEE)*100);
  const proteinPerc = Math.round((protein*4/TDEE)*100);
  const fatPerc = Math.round((fat*9/TDEE)*100);

  // Display results
  document.getElementById("calorieResult").innerHTML = `
    <div class="results-card">
      <h3>Results</h3>
      <p><strong>BMR:</strong> ${Math.round(BMR)} kcal/day</p>
      <p><strong>TDEE:</strong> ${TDEE} kcal/day</p>
      <h4>Macronutrient Breakdown</h4>

      <div class="macro-bar">
        <span class="macro-label">Carbs</span>
        <div class="macro-bar-bg">
          <div class="macro-bar-fill macro-carbs">${carbs}g (${carbPerc}%)</div>
        </div>
      </div>
      <div class="macro-bar">
        <span class="macro-label">Protein</span>
        <div class="macro-bar-bg">
          <div class="macro-bar-fill macro-protein">${protein}g (${proteinPerc}%)</div>
        </div>
      </div>
      <div class="macro-bar">
        <span class="macro-label">Fat</span>
        <div class="macro-bar-bg">
          <div class="macro-bar-fill macro-fat">${fat}g (${fatPerc}%)</div>
        </div>
      </div>
    </div>
  `;

  // Animate bars
  setTimeout(() => {
    document.querySelector(".macro-carbs").style.width = `${carbPerc}%`;
    document.querySelector(".macro-protein").style.width = `${proteinPerc}%`;
    document.querySelector(".macro-fat").style.width = `${fatPerc}%`;
  }, 100);
}
