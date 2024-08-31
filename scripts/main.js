let ascending = true;
const sortButton = document.getElementById("sortButton");
const arrow = document.getElementsByClassName("arrow")[0];
const containerCountriesDiv = document.getElementsByClassName('secondSectionOfPage')[0];
const hiddenText = document.getElementById("hiddenText");
const startingWordButton = document.getElementsByClassName('firstSearchOption')[0];
const searchBar = document.getElementsByClassName('searchBar')[0];
const searchWithAnyWordButton = document.getElementsByClassName('secondSearchOption')[0];

// Function to render the country divs
function renderCountryDivs(countriesArray) {
    containerCountriesDiv.innerHTML = ''; // Clear previous results
    countriesArray.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'cards';
        countryDiv.textContent = country;
        containerCountriesDiv.appendChild(countryDiv);
    });
}

// Initial render of all countries when the page loads
renderCountryDivs(countries);

// Function to sort the items and update the UI
function sortItems() {
    countries.sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a));
    arrow.textContent = ascending ? "↓" : "↑";
    ascending = !ascending;
    searchCountries(); // Re-apply the search after sorting
}

// Attach event listener to the sort button
sortButton.addEventListener("click", function(event) {
    deactivateButtons(); // Ensure the other buttons are deactivated
    sortButton.classList.add('active');
    sortItems();
    event.stopPropagation();
});

// Function to filter and display countries based on the search term and active button
function searchCountries() {
    const searchTerm = searchBar.value.toLowerCase();
    let filteredCountries;

    if (startingWordButton.classList.contains('active')) {
        // Filter countries that start with the search term
        filteredCountries = countries.filter(country => country.toLowerCase().startsWith(searchTerm));
    } else {
        // Filter countries that contain the search term anywhere
        filteredCountries = countries.filter(country => country.toLowerCase().includes(searchTerm));
    }

    renderCountryDivs(filteredCountries);

    if (searchTerm) { // Cheking if the search bar has input
        hiddenText.classList.add("visible");
        if (filteredCountries.length > 0) {
            if (startingWordButton.classList.contains('active')) {
                hiddenText.textContent = `Countries starting with "${searchTerm}" are ${filteredCountries.length}.`;
            } else {
                hiddenText.textContent = `Countries containing "${searchTerm}" are ${filteredCountries.length}.`;
            }
        } else {
            if (startingWordButton.classList.contains('active')) {
                hiddenText.textContent = `No countries found starting with "${searchTerm}".`;
            } else {
                hiddenText.textContent = `No countries found containing "${searchTerm}".`;
            }
        }
    } else {
        hiddenText.classList.remove("visible"); // To hide the text if the searchBar is empty
    }
}

// Function to deactivate all buttons
function deactivateButtons() {
    sortButton.classList.remove('active');
    startingWordButton.classList.remove('active');
    searchWithAnyWordButton.classList.remove('active');
}

// Attach event listener to the starting word button
startingWordButton.addEventListener('click', function(event) {
    deactivateButtons(); // Ensure the other buttons are deactivated
    startingWordButton.classList.add('active');
    searchCountries();
    event.stopPropagation();
});

// Attach event listener to the search with any word button
searchWithAnyWordButton.addEventListener('click', function(event) {
    deactivateButtons(); // Ensure the other buttons are deactivated
    searchWithAnyWordButton.classList.add('active');
    searchCountries();
    event.stopPropagation();
});

// Attach event listener to the search bar to filter countries as the user types
searchBar.addEventListener('input', searchCountries);

// Deactivate all buttons when clicking outside of them and the search bar
document.addEventListener("click", function(event) {
    if (!sortButton.contains(event.target) && 
        !startingWordButton.contains(event.target) && 
        !searchWithAnyWordButton.contains(event.target) && 
        !searchBar.contains(event.target)) {
        deactivateButtons();
        searchCountries();
    }
});
