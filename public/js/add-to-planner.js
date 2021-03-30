async function addToPlannerHandler(event) {
    event.preventDefault();

    console.log("adding to planner!")
};

document.getElementById('add-to-planner').addEventListener('click', addToPlannerHandler);