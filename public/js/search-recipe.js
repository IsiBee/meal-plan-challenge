
async function searchRecipeHandler(event) {
    event.preventDefault();

    const recipeName = document.querySelector('#pickedRecipe').value.trim();


    if (recipeName) {
        const response = await fetch(`api/recipes/search/${recipeName}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

        });

        // check the response status
        if (response.ok) {
            document.location.replace(`dashboard/search/${recipeName}`);
        }


    } else {
        alert(response.statusText);
    }
}
;


document.querySelector('.search-recipe-form').addEventListener('submit', searchRecipeHandler);
