
async function searchRecipeHandler(event) {
    event.preventDefault();

    const recipeId = document.querySelector('#searchRecipes').value.trim();

    if (recipeId) {
        const response = await fetch(`api/recipes/${recipeId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            console.log("please work");

        } else {
            alert(response.statusText);
        }
    }
};



document.querySelector('.search-recipe-form').addEventListener('submit', searchRecipeHandler);