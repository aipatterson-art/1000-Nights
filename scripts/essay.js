// Search for essayists. That will point you to authors of literary essays, which you can then use to narrow your search. E.g. Coetzee + essays or Borges + essays.
//Also search for longform. It's more or less a synonym.
//Great American Essays: collection of best essays of the year

import {markAsRead} from "./addItem.js";

const essayContent = document.getElementById('essay-content');
const refreshBtn = document.getElementById('refresh-essay-btn');
const manualBtn = document.getElementById('manual-essay-btn');
const manualInput = document.getElementById('manual-essay-title');

async function getRandomEssay() {
    const response = await fetch('storage/essays.json');
    const essayLibrary = await response.json();
    // get a random category
    const keys = Object.keys(essayLibrary);
    const randomCategory = Math.floor(Math.random() * keys.length);
    const category = essayLibrary[keys[randomCategory]];
    // get a random essay from the category
    const randomEssay = Math.floor(Math.random() * category.length);
    const essay = category[randomEssay]
    essayContent.innerHTML = `
        <h2>Today's Topic: ${keys[randomCategory]}</h2>
        <h3>Today's essay: ${essay.topic}</h3>
        <a href="${essay.site}" target="_blank" class="btn" id="read-essay-link">Read Essay External Link ↗</a>
        <blockquote>"Essays across the fields—philosophy, art, science. They broaden the mind so you aren't just a specialist in one thing."</blockquote>
    `;
    const readLink = document.getElementById('read-essay-link');

    readLink.addEventListener('click', () => {
    
        // Automatically logs the topic they were assigned
        markAsRead('essays', `${keys[randomCategory]}: ${essay.topic}`);
    }); 
}


refreshBtn.addEventListener('click', getRandomEssay);
manualBtn.addEventListener('click', () => {
    const title = manualInput.value.trim(); // Get text and remove extra spaces

    if (title !== "") {
        markAsRead('essays', title); // Save it!
        manualInput.value = "";      // Clear the box for next time
    } else {
        alert("Please enter the title of the essay you read.");
    }
});

// Load one on startup
window.addEventListener('DOMContentLoaded', getRandomEssay);

