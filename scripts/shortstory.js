// {"title": "", "author": "", "url": ""},
const storyContent = document.getElementById('story-content');
const refreshBtn = document.getElementById('refresh-story-btn');
const manualBtn = document.getElementById('manual-story-btn');
const manualInput = document.getElementById('manual-story-title');

async function getRandomStory() {
    const response = await fetch('storage/shortStories.json')
    const storyLibrary = await response.json();
    const randomIndex = Math.floor(Math.random() * storyLibrary.length);
    const story = storyLibrary[randomIndex];

    storyContent.innerHTML = `
        <h2>${story.title}</h2>
        <p class="author">by ${story.author}</p>
        <a href="${story.url}" target="_blank" class="btn">Read Story External Link ↗</a>
        <blockquote>“Read those authors who write the way you hope to write, those who think the way you would like to think. But also read those who do not think as you think or write as you want to write, and so be stimulated in directions you might not take for many years.”</blockquote>
    `;
}

function logManualStory() {
    const entry = manualInput.value.trim();
    if (entry) {
        alert(`Logged: "${entry}". One night closer to 1000!`);
        manualInput.value = '';
    }
}



refreshBtn.addEventListener('click', getRandomStory);
manualBtn.addEventListener('click', logManualStory);

// Load one on startup
window.addEventListener('DOMContentLoaded', getRandomStory);