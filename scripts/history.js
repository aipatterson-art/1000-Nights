function loadHistory() {
    const data = JSON.parse(localStorage.getItem('bradburyProgress'));
    const tableBody = document.getElementById('history-table-body');
    
    if (!data || (!data.history.poems.length && !data.history.stories.length && !data.history.essays.length)) {
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Your journey begins tonight. No entries found.</td></tr>';
        return;
    }

    // 1. Combine all history into one list for the table
    let allEntries = [];
    
    ['poems', 'stories', 'essays'].forEach(cat => {
        data.history[cat].forEach(item => {
            allEntries.push({ ...item, type: cat });
        });
    });

    // 2. Sort by date (most recent first)
    allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 3. Update Stats
    document.getElementById('total-days').innerText = data.daysCompleted;
    document.getElementById('total-read').innerText = allEntries.length;

    // 4. Render Table
    tableBody.innerHTML = allEntries.map(entry => `
        <tr>
            <td style="color: #888; font-size: 0.9rem;">${entry.date}</td>
            <td><span class="tag tag-${entry.type.slice(0, -1)}">${entry.type.slice(0, -1)}</span></td>
            <td><strong>${entry.title}</strong></td>
        </tr>
    `).join('');
}

window.onload = loadHistory;