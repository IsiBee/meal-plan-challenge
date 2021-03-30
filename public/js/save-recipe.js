async function addToPlannerHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];



    console.log(id);
};

document.getElementById('add-to-planner').addEventListener('click', addToPlannerHandler);