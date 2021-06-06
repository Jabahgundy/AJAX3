'use strict'

fetch('https://swapi.dev/api/people/')
    .then(function (response) { // listens for the response from the fetch
        return response.json();
    })
    .then(function (data) {  // listens for the DATA from respones.json
        buildContentCallback(data);
    })
    .catch(function (error) {    // listen for a REJECTION form the fetch
        console.error('ERROR', error);
        return error;
    });

function buildContentCallback(data) {
    console.log("The Data is: ", data.results);

    const characters = data.results;
    const listOfNames = document.createElement('ul');

    characters.forEach(function (character) {
        const characterNameItem = document.createElement('li');
        characterNameItem.innerText = character.name;
        listOfNames.append(characterNameItem);



    })

    const root = document.querySelector('#root');
    root.append(listOfNames)
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMLoaded")
    const searchForm = document.querySelector('#searchForm');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("Click")
        const searchInput = document.querySelector('input')
        doSearch(searchInput.value);
    });
})

function doSearch(name) {
    console.log("searching for ", name);
    fetch(`https://swapi.dev/api/people/?search=${name}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("search respones: ", data);
            if (data.count > 0) {
                buildSearchResults(data);
            }
        })
        .catch(function (error) {
            console.error("ERROR: ", error);
            return error;
        });
}


function buildSearchResults(data) {
    const searchResults = data.results;
    const searchResultsDiv = document.querySelector('#searchResults');
    searchResults.forEach(function (results) {
        const characterInfo = document.createElement('p');
        characterInfo.innerText = `${result.name} was born in ${result.birth_year}`
        searchResultsDiv.appendChild(characterInfo);
    })
}