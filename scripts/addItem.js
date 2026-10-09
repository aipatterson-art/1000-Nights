export function markAsRead(category, title) {
    // 1. Pull existing data from storage (or create a blank template)
    let data = JSON.parse(localStorage.getItem('bradburyProgress')) || {
        daysCompleted: 0,
        history: { poems: [], stories: [], essays: [] },
        lastCompletedDate: null
    };

    // 2. Add the new entry
    data.history[category].push({
        title: title,
        date: new Date().toLocaleDateString()
    });

    // 3. Save it back to the browser
    localStorage.setItem('bradburyProgress', JSON.stringify(data));
    
    // Debug line
    // alert(`Successfully logged: ${title}`);
}

