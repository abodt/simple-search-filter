const quoteList = document.getElementById('quoteList');
const searchInput = document.getElementById('searchInput');
const filterButton = document.getElementById('filterButton');
const errorMessage = document.getElementById('errorMessage');
let quotes = []; 

fetch('https://dummyjson.com/quotes')
    .then(response => response.json())
    .then(data => {
        quotes = data.quotes.map(quoteObj => quoteObj.quote);

        displayQuotes(quotes);
    })
    .catch(error => {
        console.error('Error fetching quotes:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Failed to fetch quotes: ' + error.message;
    });

function displayQuotes(quotesToShow) {
    quoteList.innerHTML = '';
    quotesToShow.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = quote;
        quoteList.appendChild(listItem);
    });
}

function filterQuotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredQuotes = quotes.filter(quote =>
        quote.toLowerCase().includes(searchTerm)
    );
    displayQuotes(filteredQuotes);
}

filterButton.addEventListener('click', filterQuotes);
