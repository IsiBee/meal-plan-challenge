async function addToPlannerHandler(event) {
    event.preventDefault();

    console.log("adding to planner!")
};

document.querySelector('#add-to-planner').addEventListener('click', addToPlannerHandler);