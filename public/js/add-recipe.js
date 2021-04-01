const date = new Date();
const dateNumber = date.getTime();

const special_id = `${Math.floor(Math.random() * 1000000)}-${Math.floor(Math.random() * 1000000)}-${dateNumber}`;

async function addRecipeHandler(event) {
    event.preventDefault();

    const recipe_name = document.querySelector('#recipe_name').value.trim();
    const description = document.querySelector('#recipe_description').value.trim();
    const servings = document.querySelector('#recipe_servings').value.trim();
    const prep_time = document.querySelector('#recipe_preptime').value.trim();
    const cook_time = document.querySelector('#recipe_cooktime').value.trim();
    const cooking_instructions = document.querySelector('textarea[name="cooking_instructions"').value.trim();
    const is_spicy = document.querySelector('#recipe_isSpicy').checked;


    if (recipe_name && description && servings && prep_time && cook_time
        && cooking_instructions) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({
                special_id,
                recipe_name,
                description,
                servings,
                prep_time,
                cook_time,
                cooking_instructions,
                is_spicy
            }),
            headers: { 'Content-Type': 'application/json' }

        });

        // check the response status
        if (response.ok) {
            document.location.replace('/dashboard/myRecipes');
        }

    } else {
        alert(response.statusText);
    }
};

// add ingredients
async function addIngredientHandler(event) {
    event.preventDefault();

    const ingredient_name = document.querySelector('#ingredient-name').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    const preparation = document.querySelector('#preparation').value.trim();

    if (ingredient_name) {
        const response = await fetch(`/api/ingredients`, {
            method: 'POST',
            body: JSON.stringify({
                ingredient_name,
                quantity,
                preparation,
                special_id
            }),
            headers: { 'Content-Type': 'application/json' }

        });

        // check the response status
        if (response.ok) {
            generateIngredientHTML(ingredient_name, quantity, preparation);
            ingredient_name.value = "";
            quantity.value = "";
            preparation.value = "";
        }

    } else {
        alert(response.statusText);
    }

};

const generateIngredientHTML = (ingredient_name, quantity, preparation) => {
    const ingredientsListEl = document.querySelector(".ingredients-list");
    
    let ingredientItem = document.createElement("li")
    ingredientItem.classList.add("ingredient");
    ingredientItem.innerHTML = ingredient_name;

    if (quantity) {
        let quantitySpan = document.createElement("span");
        quantitySpan.classList.add("quantity");
        quantitySpan.textContent = ` - ${quantity}`;
        ingredientItem.appendChild(quantitySpan);
    }

    if (preparation) {
        let preparationSpan = document.createElement("span");
        preparationSpan.classList.add("preparation");
        preparationSpan.textContent = ` - ${preparation}`;
        ingredientItem.appendChild(preparationSpan);
    }
    
    console.log(ingredientItem);
    ingredientsListEl.appendChild(ingredientItem);
    // replaceIngredientInputs();
};

const replaceIngredientInputs = () => {
    const ingredientInputs = document.querySelector("#ingredient-inputs");
    ingredientInputs.innerHTML = "";

    ingredientInputs.innerHTML = `
        <div class="col-3">
            <input class="form-control ingredient-input" type="text" id="ingredient-name" name="ingredient-name" placeholder="Ingredient" onfocus=this.value=''>
        </div>
        <div class="col-2">
            <input class="form-control quantity-input" type="text" id="quantity" name="quantity" placeholder="Quantity" onfocus=this.value=''>
        </div>
        <div class="col-4">
            <input class="form-control preparation-input" type="text" id="preparation" name="preparation" placeholder="Preparation" onfocus=this.value=''>
        </div>
        <div class="col-3">
            <button type="button" id="save-ingredient" class="btn-small btn btn-warning col-2 col">Save Ingredient</button>
        </div>
    `;
};

document.querySelector('.new-recipe-form').addEventListener('submit', addRecipeHandler);
document.querySelector('#save-ingredient').addEventListener('click', addIngredientHandler);
