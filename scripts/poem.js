// Configuration
const POETRY_API_URL = 'https://poetrydb.org/random/1';

// Selectors
const poemDisplay = document.getElementById('poem-display');
const refreshBtn = document.getElementById('refresh-btn');
const manualBtn = document.getElementById('manual-btn');
const manualInput = document.getElementById('manual-title');

// Functions
async function fetchRandomPoem() {
    poemDisplay.innerHTML = '<p class="loading">Searching the archives...</p>';

    try {
        let poem;
        do{
            let response = await fetch(POETRY_API_URL);
            let data = await response.json();
            poem = data[0];
        } while (poem.linecount > 30)

        poemDisplay.innerHTML = `
            <h2 id="poemTitle">${poem.title}</h2>
            <p class="author" id="poemAuthor">by ${poem.author}</p>
            <div class="lines">${poem.lines.join('\n')}</div>
            <button class="btn" onclick="poemSearch()">Learn more about this poem</button>
        `;
    } catch (error) {
        poemDisplay.innerHTML = `<p>Exclamation! We couldn't reach the library. Try again in a moment.</p>`;
        console.error("API Error:", error);
    }
}

function logManualEntry() {
    const title = manualInput.value.trim();
    if (title) {
        alert(`Logged: "${title}". Great job staying on track!`);
        manualInput.value = '';
    } else {
        alert("Please enter a title.");
    }
}

function poemSearch() {
    title = document.getElementById("poemTitle").textContent;
    author = document.getElementById("poemAuthor").textContent;
    const query = `${title}, ${author}`;
    const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
    window.open(searchUrl, '_blank');
  }

// Event Listeners
refreshBtn.addEventListener('click', fetchRandomPoem);
manualBtn.addEventListener('click', logManualEntry);

// Initial Load
window.addEventListener('DOMContentLoaded', fetchRandomPoem);