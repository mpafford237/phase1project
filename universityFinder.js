//Declaring objects
let universitiesList = []
let favoriteUniversities = []

//fetch request
addEventListener("DOMContentLoaded", () => {
    fetch("https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json")
    .then(response => response.json())
    .then(data => {
        universitiesList = data
        console.log(universitiesList)
        initializeApp()
    })
    .catch(error => console.log(error))
})

//function list
function initializeApp(){
    document.getElementById("nameSearchBar").addEventListener("input", searchAndFilterUniversities)
    document.getElementById("countrySearchBar").addEventListener("input", searchAndFilterUniversities)
    document.getElementById("showFavorites").addEventListener("change", searchAndFilterUniversities)
}

// Unified search and filter function
function searchAndFilterUniversities() {
    let filteredUniversities = universitiesList;

    // Get values from input fields
    const nameSearchValue = document.getElementById("nameSearchBar").value.toLowerCase();
    const countrySearchValue = document.getElementById("countrySearchBar").value.toLowerCase();

    // Filter by name if nameSearchValue is not empty
    if (nameSearchValue) {
        filteredUniversities = filteredUniversities.filter(university => university.name.toLowerCase().includes(nameSearchValue));
    }

    // Filter by country if countrySearchValue is not empty
    if (countrySearchValue) {
        filteredUniversities = filteredUniversities.filter(university => university.country.toLowerCase() === countrySearchValue);
    }

    // Further filter by favorites if "showFavorites" is checked
    if (document.getElementById("showFavorites").checked) {
        filteredUniversities = filteredUniversities.filter(university => favoriteUniversities.includes(university.name));
    }

    // Display the filtered list
    displayUniversities(filteredUniversities);
}

function displayUniversities(universities){
    const listElement = document.getElementById("universityList");
    listElement.innerHTML = "";
    universities.forEach(university => {
        const isFavorited = favoriteUniversities.includes(university.name);
        const listItem = document.createElement("li");
        listItem.innerHTML = `${university.name}, ${university.country} - <a href="${university.web_pages[0]}" target="_blank">Website</a> <button data-university-name="${university.name}">${isFavorited ? 'Unfavorite' : 'Favorite'}</button>`;
        listElement.appendChild(listItem);
    });
}

function toggleFavorite(universityName, buttonElement){
    const index = favoriteUniversities.indexOf(universityName);
    if(index > -1){
        favoriteUniversities.splice(index, 1);
        buttonElement.textContent = 'Favorite';
    } else {
        favoriteUniversities.push(universityName);
        buttonElement.textContent = 'Unfavorite';
    }
}

document.getElementById("universityList").addEventListener("click", (event) => {
    if(event.target.tagName === 'BUTTON'){
        const universityName = event.target.getAttribute('data-university-name');
        toggleFavorite(universityName, event.target);
    }
});