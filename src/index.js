// write your code here

// Wait for DOM content to load before fetching
document.addEventListener("DOMContentLoaded", () => {

    // load ramen menu
    loadRamenMenu();


});

function loadRamenMenu() {
    // fetch ramen data from API
    fetch("http://localhost:3000/ramens")
        .then(res => res.json())
        .then(ramens => {console.log(ramens)});
}