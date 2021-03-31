
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
                    let card = `<article class="draggable card p-0 row mx-2 border border-3 border-success" data-value=${data[i].recipe_name} draggable="true">

                    <p class="card-header recipe-title">
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

                    //#added-recipe\
                    console.log(card)
                    //cardObj = cardObj.innerHTML(card);
                    //document.querySelector("#added-recipe").innerHTML+=card;

                    // Target correct location 
                    document.querySelector("#added-recipe").insertAdjacentHTML("afterbegin", card);
                    console.log(data)

                }

            });

        document.querySelector('#pickedRecipe').value = "";
    } else {
        alert(response.statusText);
    }
}
;


document.querySelector('.search-recipe-form').addEventListener('submit', searchRecipeHandler);
