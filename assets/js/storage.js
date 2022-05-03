const CACHE_KEY = "note";

/**
 * Check the storage support in the browser
 * @returns True if browser supports storage, else False
 */
function checkForStorage() {
    return typeof (Storage) !== "undefined";
}

/**
 * Create new data
 * @param {any} data Note data
 */
function createData(data) {
    if (checkForStorage()) {
        let noteData = null;
        
        // Check KEY, if null, create new one, else get data
        if (localStorage.getItem(CACHE_KEY) === null) {
            noteData = [];
        } else {
            noteData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        
        // Insert new data
        noteData.unshift(data);
        
        // Update the storage
        localStorage.setItem(CACHE_KEY, JSON.stringify(noteData));
    }
}

/**
 * Get arrays of data in storage
 * @returns arrays of items in storage
 */
function showData() {
    if (!checkForStorage()) return [];

    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
}

/**
 * Get data in certain index
 * @param {any} index Data's index
 * @returns data
 */
function getData(index) {
    if (!checkForStorage()) {
        alert("Your browser doesn't support storage");
        return;
    }

    const noteData = showData();
    return noteData[index];
}

/**
 * Update data with new data
 * @param {any} index Data's index
 * @param {any} newData New data
 */
function updateData(index, newData) {
    if (!checkForStorage()) {
        alert("Your browser doesn't support storage");
        return;
    }

    const noteData = showData();
    noteData[index] = newData;
    // Update the storage
    localStorage.setItem(CACHE_KEY, JSON.stringify(noteData));
}

/**
 * Delete data
 * @param {any} index Data's index
 * @returns null
 */
function deleteData(index) {
    if (!checkForStorage()) {
        alert("Your browser doesn't support storage");
        return;
    }

    const noteData = showData();
    noteData.splice(index, 1); // Delete the data
    // Update the storage
    localStorage.setItem(CACHE_KEY, JSON.stringify(noteData));
}

/**
 * Render the data
 */
function renderData() {
    const noteData = showData();
    let noteList = document.querySelector('#note-list');

    noteList.innerHTML = "";

    for (const [i, note] of noteData.entries()) {
        // Create article tag
        let article = document.createElement('article');
        article.classList.add('card');
        
        // Create tag for title
        let title = document.createElement('h4');
        title.innerHTML = note.title;
        
        // Create tag for content
        let content = document.createElement('p')
        content.classList.add('text-truncate');
        content.innerHTML = note.content;

        let actionButtons = `
<div class="bottom-right">
    <button class="btn btn-icon-text" onclick="preUpdateNote(${i})">
        <img src="assets/icons/edit_black_24dp.svg" alt="edit" height="24">
        Edit
    </button>
    
    <button class="btn danger btn-icon-text-danger" onclick="deleteNote(${i})">
        <img src="assets/icons/delete_white_24dp.svg" alt="delete" height="24">
        Delete
    </button>
</div>`;
        
        // Append children
        article.appendChild(title);
        article.appendChild(content);
        article.insertAdjacentHTML('beforeend', actionButtons);

        noteList.appendChild(article);
    }
}

renderData();