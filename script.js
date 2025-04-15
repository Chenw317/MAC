let flavor = "";
let topping = "";
let addedIngredients = [];
const ding = document.getElementById("ding-sound");

function chooseFlavor(selectedFlavor) {
  flavor = selectedFlavor;
  document.getElementById("game").innerHTML = `
    <p>You chose <strong>${flavor}</strong> flavor!</p>
    <p>Now choose a topping:</p>
    <button onclick="chooseTopping('strawberry')">Strawberry</button>
    <button onclick="chooseTopping('chocolate')">Chocolate</button>
    <button onclick="chooseTopping('grape')">Grape</button>
  `;
}

function chooseTopping(selectedTopping) {
  topping = selectedTopping;
  addedIngredients = [];
  document.getElementById("game").innerHTML = `
    <p>You chose a <strong>${flavor}</strong> cake with <strong>${topping}</strong> topping!</p>
    <p>Add ingredients:</p>
    <button onclick="addIngredient('flour')">Add Flour</button>
    <button onclick="addIngredient('eggs')">Add Eggs</button>
    <button onclick="addIngredient('sugar')">Add Sugar</button>
    <div class="note">You need to add all the ingredients at least once to continue.</div>
  `;
}

function addIngredient(ingredient) {
  if (!addedIngredients.includes(ingredient)) {
    addedIngredients.push(ingredient);
  }

  if (addedIngredients.length === 3) {
    document.getElementById("game").innerHTML = `
      <p>All ingredients added!</p>
      <div id="mixing-bowl">🌀 Mixing...</div>
      <button onclick="startMixing()">Mix Ingredients</button>
    `;
  }
}

function startMixing() {
  const bowl = document.getElementById("mixing-bowl");
  bowl.classList.add("mixing");

  setTimeout(() => {
    bowl.classList.remove("mixing");
    document.getElementById("game").innerHTML = `
      <p>Mixing complete!</p>
      <button onclick="bakeCake()">Bake the Cake!</button>
    `;
  }, 2000);
}

function bakeCake() {
  const cakeSrc = `https://dummyimage.com/200x200/${getColor(flavor)}/${getColor(topping)}.png&text=${flavor}+cake+with+${topping}`;
  ding.play();
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  document.getElementById("game").innerHTML = `
    <p>Your delicious cake is ready!</p>
    <div class="cake-image" style="background-image: url('${cakeSrc}')"></div>
    <button class="shizuru" onclick="location.reload()">Make Another Cake</button>
  `;
}

function getColor(type) {
  switch(type) {
    case 'vanilla': return 'fff8dc';
    case 'chocolate': return '8b4513';
    case 'matcha': return '98fb98';
    case 'strawberry': return 'ff69b4';
    case 'grape': return 'dda0dd';
    default: return 'cccccc';
  }
}
