
async function searchRecipeHandler(event) {
    event.preventDefault();

    const recipeName = document.querySelector('#searchRecipes').value.trim();

    if (recipeName) {
        const response = await fetch(`api/recipes/search/${recipeName}`, {
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