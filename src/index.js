// write your code here

// Wait for DOM content to load before fetching
document.addEventListener("DOMContentLoaded", () => {

    // load ramen menu
    loadRamenMenu();

    // add event listener to handle user submit
    document.querySelector("#new-ramen").addEventListener("submit", e => {
        e.preventDefault();
        addNewRamen(e);
    })
});

function loadRamenMenu() {
    // fetch ramen data from API
    fetch("http://localhost:3000/ramens")
        .then(res => res.json())
        .then(ramens => addRamenPhotosToMenu(ramens));
}

function addRamenPhotosToMenu(ramens) {
    // console.log(ramens);
    let ramenMenuDiv = document.querySelector("#ramen-menu");
    const ramenArray = [];
    if (Array.isArray(ramens)) {
        ramenArray.push(...ramens);
    }
    else {
        ramenArray.push(ramens);
    }
    console.log(ramenArray);
    // loop through all ramens and add their image to the div
    ramenArray.forEach(ramen => {
        let ramenImg = document.createElement("img");
        ramenImg.src = ramen.image;
        ramenImg.id = ramen.id;
        ramenMenuDiv.appendChild(ramenImg);
        // console.log(ramen);
    })

    // listen for user to select a specific ramen
    ramenMenuDiv.addEventListener("click", e => {
        e.preventDefault();
        // console.log(e.target.parentElement);
        displayChosenRamen(e.target, ramenArray);
    })
}

function displayChosenRamen(chosenRamen, ramens) {
    console.log(ramens);
    // use chosenRamen to find corresponding ramen
    const chosenRamenId = Number(chosenRamen.id);
    const chosenRamenObj = ramens.find(ramen => ramen.id === chosenRamenId);
    console.log(chosenRamenObj);

    // store chosen ramen div container
    const chosenRamenDiv = document.querySelector("#ramen-detail");
    // console.log(chosenRamenDiv.children);
    // assign image
    chosenRamenDiv.children[0].src = chosenRamenObj.image;
    // assign name
    chosenRamenDiv.children[1].textContent = chosenRamenObj.name;
    // assign restaurant
    chosenRamenDiv.children[2].textContent = chosenRamenObj.restaurant;

    // update rating
    document.querySelector("#rating-display").textContent = chosenRamenObj.rating;
    // update comment
    document.querySelector("#comment-display").textContent = chosenRamenObj.comment;
}

function addNewRamen(e) {
    const ramenMenu = document.querySelector("#ramen-menu");
    // console.log(e);

    const newRamenObj = {
        id: (Number(ramenMenu.lastChild.id) + 1),
        name: e.target[0].value,
        image: e.target[2].value,
        restaurant: e.target[1].value,
        rating: e.target[3].value,
        comment: e.target[4].value
    }

    // console.log(newRamenObj);
    addRamenPhotosToMenu(newRamenObj);
}