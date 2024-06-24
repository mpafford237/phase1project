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
    }
)
.catch(error => console.log(error))
})

//function list
function initializeApp(){
    document.getElementById("searchBar").addEventListener("input", handleSearchInput)
}

function handleSearchInput(event){
    const countrySearch = event.target.value;
    const filteredUniversities = universitiesList.filter(university => university.country.toLowerCase() === countrySearch.toLowerCase());
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

document.getElementById("universityList").addEventListener("click", function(event){
    if(event.target.tagName === 'BUTTON'){
        const universityName = event.target.getAttribute('data-university-name');
        toggleFavorite(universityName, event.target);
    }
});

document.getElementById("showFavorites").addEventListener("change", function(event) {
    if(event.target.checked) {
        const favoriteUniversitiesFiltered = universitiesList.filter(university => favoriteUniversities.includes(university.name));
        displayUniversities(favoriteUniversitiesFiltered);
    } else {
        const searchBarValue = document.getElementById("searchBar").value;
        if(searchBarValue) {
            handleSearchInput({target: {value: searchBarValue}});
        } else {
            displayUniversities(universitiesList);
        }
    }
});
//buttons and search functions
