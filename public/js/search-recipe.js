
async function searchRecipeHandler(event) {
    event.preventDefault();

    const recipeName = document.querySelector('#pickedRecipe').value.trim();

    console.log(recipeName)
    if (recipeName) {
        const response = await fetch(`api/recipes/search/${recipeName}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

        })
            .then(recipeobj => recipeobj.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    let card = `<article class="draggable container card p-0 row mx-2" data-value=${data[i].recipe_name} draggable="true" id=${data[i].id} ondragstart="onDragStart(event);">

                    <p class="card-header recipe-title border border-success">
                        ${data[i].recipe_name}`
                    if (data[i].is_spicy) {
                        card += `<span> 🌶️</span>`
                    }

                    card += `</p>
                    <div class="card-body recipe-card pb-0">
                        <p class="subtitle">
                            ${data[i].description}
                        </p>
                        <p>
                            Prep Time:  ${data[i].prep_time} min
                        </p>
                        <p>
                            Cook Time:  ${data[i].cook_time} min
                        </p>
                        <p>
                            Serves  ${data[i].servings}
                        </p>
                    </div>
                    <a class="text-info card-footer recipe-footer" href="/recipe/ ${data[i].id}">see full recipe</a>
                </article>`

                    document.querySelector("#added-recipe").insertAdjacentHTML("afterbegin", card);

                }

            });

        document.querySelector('#pickedRecipe').value = "";
    } else {
        alert(response.statusText);
    }
}
;


document.querySelector('.search-recipe-form').addEventListener('submit', searchRecipeHandler);
