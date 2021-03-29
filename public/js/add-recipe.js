
async function addRecipeHandler(event) {
    event.preventDefault();

    const recipe_name = document.querySelector('#recipe_name').value.trim();
    const description = document.querySelector('#recipe_description').value.trim();
    const servings = document.querySelector('#recipe_servings').value.trim();
    const prep_time = document.querySelector('#recipe_preptime').value.trim();
    const cook_time = document.querySelector('#recipe_cooktime').value.trim();
    const cooking_instructions = document.querySelector('textarea[name="cooking_instructions"').value.trim();
    const is_spicy = document.querySelector('#recipe_isSpicy').checked;


    console.log(`${recipe_name}
        description: ${description}
        servings: ${servings}
        prep time: ${prep_time}
        cook time: ${cook_time}
        cooking instructions: ${cooking_instructions}
        is spicy: ${is_spicy}`);


    if (recipe_name && description && servings && prep_time && cook_time
        && cooking_instructions) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({
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
            document.location.reload('dashboard/myRecipes');
        }

    } else {
        alert(response.statusText);
    }
};


document.querySelector('.new-recipe-form').addEventListener('submit', addRecipeHandler);
