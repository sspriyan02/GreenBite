const recipes = [
  { id:1, title:"Green Smoothie", category:"breakfast", image:"images/green_smoothie_icon.png",
    description:"A nutritious smoothie packed with spinach, banana, and almond milk.",
    ingredients:["1 cup spinach","1 banana","1 cup almond milk"],
    steps:["Wash the spinach.","Peel and slice the banana.","Blend everything with almond milk until smooth."],
    nutrition:{calories:180, protein:"4g", carbs:"35g", fat:"3g"} },
  { id:2, title:"Grilled Chicken", category:"lunch", image:"images/chicken_icon.png",
    description:"Lean grilled chicken served with a side of roasted vegetables.",
    ingredients:["2 chicken breasts","1 tbsp olive oil","1 tsp salt","1 tsp black pepper","1 tsp mixed herbs","1 cup assorted vegetables"],
    steps:["Marinate the chicken with olive oil, salt, pepper, and herbs.","Preheat the grill or pan to medium-high heat.","Grill chicken for 6–8 minutes per side until fully cooked.","Roast or steam the vegetables until tender.","Serve hot with vegetables on the side."],
    nutrition:{calories:350, protein:"35g", carbs:"10g", fat:"15g"} },
  { id:3, title:"Quinoa Salad", category:"dinner", image:"images/salad_icon.png",
    description:"A refreshing salad with quinoa, cherry tomatoes, cucumber, avocado, and lemon vinaigrette.",
    ingredients:["1 cup quinoa (cooked)","1 cup cherry tomatoes","1 cucumber","1 avocado","2 tbsp olive oil","1 tbsp lemon juice"],
    steps:["Cook quinoa and let it cool.","Chop cherry tomatoes, cucumber, and avocado.","Combine quinoa and vegetables.","Add olive oil and lemon juice.","Toss gently and serve."],
    nutrition:{calories:320, protein:"9g", carbs:"45g", fat:"12g"} },
  { id:4, title:"Banana Oatmeal", category:"breakfast", image:"images/oatmeal_icon.png",
    description:"Warm oatmeal topped with sliced bananas, chia seeds, and honey.",
    ingredients:["1/2 cup rolled oats","1 cup milk","1 ripe banana","1 tsp chia seeds","1 tsp honey"],
    steps:["Bring milk to a simmer.","Add oats and cook 5–7 mins.","Top with banana slices, chia seeds, and honey.","Serve warm."],
    nutrition:{calories:300, protein:"8g", carbs:"55g", fat:"6g"} },
  { id:5, title:"Veggie Hummus Plate", category:"snack", image:"images/hummus_icon.png",
    description:"Fresh vegetable sticks served with homemade chickpea hummus.",
    ingredients:["1 cup chickpeas","2 tbsp tahini","2 tbsp olive oil","1 clove garlic","1 tbsp lemon juice","Vegetable sticks"],
    steps:["Blend chickpeas, tahini, olive oil, garlic, and lemon juice until smooth.","Arrange vegetable sticks on a plate.","Serve with hummus."],
    nutrition:{calories:250, protein:"8g", carbs:"20g", fat:"12g"} },
  { id:6, title:"Grilled Salmon", category:"dinner", image:"images/salmon_icon.png",
    description:"Grilled salmon fillet served with quinoa and roasted asparagus.",
    ingredients:["2 salmon fillets","1 tbsp olive oil","1 tsp lemon juice","Salt & pepper","1 cup cooked quinoa","1 cup roasted asparagus"],
    steps:["Preheat grill to medium-high.","Brush salmon with olive oil, lemon juice, salt, and pepper.","Grill salmon 4–5 mins per side.","Serve with quinoa and asparagus."],
    nutrition:{calories:400, protein:"35g", carbs:"20g", fat:"18g"} }
];

const recipeGrid = document.querySelector(".recipes-container");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");

function displayRecipes(recipeList) {
  recipeGrid.innerHTML = "";
  recipeList.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.setAttribute("data-category", recipe.category);
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>
      <ul class="recipe-info">
        <li>Calories: ${recipe.nutrition.calories}</li>
        <li>Category: ${recipe.category}</li>
      </ul>
    `;
    card.addEventListener("click", () => openModal(recipe));
    recipeGrid.appendChild(card);
  });
}

function openModal(recipe) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      <h3>Steps</h3>
      <ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      <h3>Nutrition Info</h3>
      <table>
        <tr><th>Calories</th><th>Protein</th><th>Carbs</th><th>Fat</th></tr>
        <tr>
          <td>${recipe.nutrition.calories}</td>
          <td>${recipe.nutrition.protein}</td>
          <td>${recipe.nutrition.carbs}</td>
          <td>${recipe.nutrition.fat}</td>
        </tr>
      </table>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = "flex";
  modal.querySelector(".close").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", e => { if(e.target === modal) modal.remove(); });
}

// INITIAL DISPLAY
displayRecipes(recipes);

// SEARCH FILTER
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filtered = recipes.filter(r => r.title.toLowerCase().includes(query));
  displayRecipes(filtered);
});
categoryFilter.addEventListener("change", () => {
  const category = categoryFilter.value;
  const filtered = category === "all" ? recipes : recipes.filter(r => r.category === category);
  displayRecipes(filtered);
});
