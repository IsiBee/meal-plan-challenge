async function addToFavoritesHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch("/api/recipes/saverecipe", {
        method: "PUT",
        body: JSON.stringify({
            recipe_id: id,
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
    console.log(id);
};

document.getElementById('save-to-favorites').addEventListener('click', addToFavoritesHandler);