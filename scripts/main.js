var url = `	https://api.adviceslip.com/advice`;

document.addEventListener('DOMContentLoaded', function() {
    let searchBox = document.getElementById(`search-box`);
    searchBox.focus();
}, false);

function getData() {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let adviceBox = document.getElementById(`advice-result`);
        adviceBox.innerHTML = ``;
        adviceBox.innerHTML += `<li>${data.slip.advice}</li>`;
    }).catch(function (err) {
        console.warn(`Something went wrong.`, err);
    });
}

function search(terms) {
    return new Promise((resolve, reject) => {
        let newUrl = `${url}/search/${terms}`;
        fetch(newUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            let advices = data.slips;
            resolve(advices);
        }).catch(function (err) {
            reject(err);
        });
    });
}

function getErrorMessage() {
    let termsBox = document.getElementById('search-box');
    termsBox.classList.add('error-message');
    termsBox.value = 'You Must Type Something';
    termsBox.disabled = true;
    setTimeout(function () {
        termsBox.classList.remove('error-message');
        termsBox.disabled = false;
        termsBox.value = '';
    }, 3000);
}

function getSearchResult() {
    let terms = document.getElementById('search-box').value
    let adviceBox = document.getElementById(`advice-result`);
    if (terms) {
        terms = terms.toLowerCase();
        search(terms).then(function (advices){
            adviceBox.innerHTML = ``;
            advices.map(function (advice) {
                adviceBox.innerHTML += `<li>${advice.advice}</li>`;
            });
        });
    } else {
        getErrorMessage();
    }
}

function getLucky() {
    let terms = document.getElementById('search-box').value
    let adviceBox = document.getElementById(`advice-result`);
    if (terms) {
        terms = terms.toLowerCase();
        search(terms).then(function (advices){
            let number = Math.floor(Math.random() * advices.length);
            adviceBox.innerHTML = ``;
            adviceBox.innerHTML += `<li>${advices[number].advice}</li>`;
        });
    } else {
        getErrorMessage();
    }
}