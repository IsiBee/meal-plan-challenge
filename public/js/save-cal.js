let days = [];

async function saveCalHandler(event) {
    event.preventDefault();

    let sunElement = document.querySelector('#Sunday');
    sunElement = sunElement.getElementsByTagName('article');
    if (sunElement.length === 0) {
        sunElement = null;
    }
    else {
        sunElement = sunElement[0].getAttribute('id');
    }


    let monElement = document.querySelector('#Monday');
    monElement = monElement.getElementsByTagName('article');
    if (monElement.length === 0) {
        monElement = null;
    }
    else {
        monElement = monElement[0].getAttribute('id');
    }

    let tuesElement = document.querySelector('#Tuesday');
    tuesElement = tuesElement.getElementsByTagName('article');
    if (tuesElement.length === 0) {
        tuesElement = null;
    }
    else {
        tuesElement = tuesElement[0].getAttribute('id');
    }

    let wedsElement = document.querySelector('#Wednesday');
    wedsElement = wedsElement.getElementsByTagName('article');
    if (wedsElement.length === 0) {
        wedsElement = null;
    }
    else {
        wedsElement = wedsElement[0].getAttribute('id');
    }

    let thurElement = document.querySelector('#Thursday');
    thurElement = thurElement.getElementsByTagName('article');
    if (thurElement.length === 0) {
        thurElement = null;
    }
    else {
        thurElement = thurElement[0].getAttribute('id');
    }

    let friElement = document.querySelector('#Friday');
    friElement = friElement.getElementsByTagName('article');
    if (friElement.length === 0) {
        friElement = null;
    }
    else {
        friElement = friElement[0].getAttribute('id');
    }

    let satElement = document.querySelector('#Saturday');
    satElement = satElement.getElementsByTagName('article');
    if (satElement.length === 0) {
        satElement = null;
    }
    else {
        satElement = satElement[0].getAttribute('id');
    }

    const sunday = sunElement;
    const monday = monElement;
    const tuesday = tuesElement;
    const wednesday = wedsElement;
    const thursday = thurElement;
    const friday = friElement;
    const saturday = satElement;


    if (sunday || monday || tuesday || wednesday || thursday
        || friday || saturday) {
        const getSchedule = await fetch(`/api/schedules`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(scheduleObj => scheduleObj.json())
            .then(data => {
                if (data.length) {
                    const updateSchedule = fetch(`/api/schedules/${data[0].user_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            sunday,
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })

                }

                else {
                    const createSchedule = fetch(`/api/schedules`, {
                        method: 'POST',
                        body: JSON.stringify({
                            sunday,
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday
                        }),
                        headers: { 'Content-Type': 'application/json' }

                    })

                }
            })
            .then(updatedCal => {
                const getNewSchedule = fetch(`/api/schedules`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(CalObj => CalObj.json())
                    .then(CalData => {
                        console.log(CalData);
                        days.push(CalData[0].sunday)
                        days.push(CalData[0].monday)
                        days.push(CalData[0].tuesday)
                        days.push(CalData[0].wednesday);
                        days.push(CalData[0].thursday);
                        days.push(CalData[0].friday);
                        days.push(CalData[0].saturday);

                        addedRecipes = days.filter(day => day);
                        console.log(days);

                        addedRecipes.forEach(recipeId => {
                            const getRecipe = fetch(`/api/recipes/${recipeId}`, {
                                method: 'GET',
                            })
                                .then(recipeObj => recipeObj.json())
                                .then(recipeData => {
                                    let card = `<article class="draggable container card p-0 row mx-2 border border-3 border-success" data-value=${recipeData.recipe_name} draggable="true" id=${recipeData.id}>
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


                                    return card;

                                })
                                .then(recipes => console.log(recipes));
                        })

                    })

            })
    }
}


document.querySelector('.saveCal').addEventListener('click', saveCalHandler);