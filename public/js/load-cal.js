let days = [];
async function getCalHandler(event) {
    event.preventDefault();

    const getSchedule = await fetch(`/api/schedules`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(CalObj => CalObj.json())
        .then(CalData => {
            if ((CalData[0].sunday === null) && (CalData[0].monday === null) && (CalData[0].tuesday === null) && (CalData[0].wednesday === null) &&
                (CalData[0].thursday === null) && (CalData[0].friday === null) && (CalData[0].saturday === null)) {
                console.log('EMPTY');
                return 0;
            }
            else {
                days.push(CalData[0].sunday)
                days.push(CalData[0].monday)
                days.push(CalData[0].tuesday)
                days.push(CalData[0].wednesday);
                days.push(CalData[0].thursday);
                days.push(CalData[0].friday);
                days.push(CalData[0].saturday);

                addedRecipes = days.filter(day => day);

                addedRecipes.forEach(recipeId => {
                    const getRecipe = fetch(`/api/recipes/${recipeId}`, {
                        method: 'GET',
                    })
                        .then(recipeObj => recipeObj.json())
                        .then(recipeData => {
                            let card = `<article class="draggable container card p-0 row mx-2" data-value=${recipeData.recipe_name} draggable="true" id=${recipeData.id} ondragstart="onDragStart(event);">
                                        <p class="card-header recipe-title">
                                            ${recipeData.recipe_name}`
                            if (recipeData.is_spicy) {
                                card += `<span> 🌶️</span>`
                            }

                            card += `</p>
                                        <div class="card-body recipe-card pb-0">
                                            <p class="subtitle">
                                                ${recipeData.description}
                                            </p>
                                            <p>
                                                Prep Time:  ${recipeData.prep_time} min
                                            </p>
                                            <p>
                                                Cook Time:  ${recipeData.cook_time} min
                                            </p>
                                            <p>
                                                Serves  ${recipeData.servings}
                                            </p>
                                        </div>
                                        <a class="text-info card-footer recipe-footer" href="/recipe/ ${recipeData.id}">see full recipe</a>
                                    </article>`

                            return {
                                id: recipeData.id,
                                body: card
                            };

                        })
                        .then(recipes => {

                            for (let i = 0; i < days.length; i++) {
                                if (days[i] !== null) {
                                    let idAttribute;

                                    switch (i) {
                                        case i = 0:
                                            idAttribute = '#Sunday';
                                            break;
                                        case i = 1:
                                            idAttribute = '#Monday';
                                            break;
                                        case i = 2:
                                            idAttribute = '#Tuesday';
                                            break;
                                        case i = 3:
                                            idAttribute = '#Wednesday';
                                            break;
                                        case i = 4:
                                            idAttribute = '#Thursday';
                                            break;
                                        case i = 5:
                                            idAttribute = '#Friday';
                                            break;
                                        case i = 6:
                                            idAttribute = '#Saturday';
                                            break;

                                    }

                                    if (recipes.id === days[i]) {
                                        const savedRecipe = recipes.body
                                        document.querySelector(idAttribute).insertAdjacentHTML("beforeend", savedRecipe);
                                    }






                                }
                            }

                        })

                })
            }
        })
}



window.addEventListener('load', getCalHandler);
