const date = new Date();
const dateNumber = date.getTime();

const special_id = `${Math.floor(Math.random() * 1000000)}-${Math.floor(Math.random() * 1000000)}-${dateNumber}`;

console.log(special_id);

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
// if (ingredient_name) {
//     document.querySelector('#save-ingredient').classList.add('hide');
// }

async function addIngredientHandler(event) {
    event.preventDefault();

    const ingredient_name = document.querySelector('#ingredient-name').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    const preparation = document.querySelector('#preparation').value.trim();

    console.log(`
        ingredient_name: ${ingredient_name}
        quantity: ${quantity}
        preparation: ${preparation}
        special_id: ${special_id}
    `);

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
            console.log(`ingredient added!
                ingredient_name: ${ingredient_name}
                quantity: ${quantity}
                preparation: ${preparation}
                special_id: ${special_id}
            `);
        }

    } else {
        alert(response.statusText);
    }

}


document.querySelector('.new-recipe-form').addEventListener('submit', addRecipeHandler);
document.querySelector('#save-ingredient').addEventListener('click', addIngredientHandler);
