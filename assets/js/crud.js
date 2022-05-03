const notes = {
    'title': null,
    'content': null,
};

/**
 * Create note by getting values from form
 * @returns null
 */
function createNote() {
    // Get inputs
    let title = document.querySelector('#note-title');
    let content = document.querySelector('#note-content');

    // Check values
    if (title.value === '' || content.value === '') return;
    
    // Get values
    const note = {
        'title': title.value,
        'content': content.value
    };

    // Create and render data
    createData(note);
    renderData();

    // Reset form's values
    title.value = '';
    content.value = '';
}

/**
 * Delete note
 * @param {index} index Note's index
 */
function deleteNote(index) {
    deleteData(index);
    renderData();
}

/**
 * Actions before update the note
 * @param {index} index Note's index
 */
function preUpdateNote(index) {
    // Get update and create forms
    let createForm = document.querySelector('#create-form');
    let updateForm = document.querySelector('#update-form');

    // Get update form's inputs
    let title = updateForm.querySelector('#note-title');
    let content = updateForm.querySelector('#note-content');

    // Make create form invisible and update form visible
    createForm.classList.add('hidden');
    updateForm.classList.remove('hidden');

    // Get data and update inputs' value
    const note = getData(index);
    title.value = note.title;
    content.value = note.content;

    // Set onsubmit attribute
    let form = updateForm.querySelector('form');
    form.setAttribute('onsubmit', `updateNote(${index})`);
}

/**
 * Update note
 * @param {index} index Note's index
 * @returns null
 */
function updateNote(index) {
    // Get update and create forms
    let createForm = document.querySelector('#create-form');
    let updateForm = document.querySelector('#update-form');

    // Get update form's inputs
    let title = updateForm.querySelector('#note-title');
    let content = updateForm.querySelector('#note-content');

    // Check values
    if (title.value === '' || content.value === '') return;

    // Get values
    const newNote = {
        'title': title.value,
        'content': content.value
    };

    // Update note with new note
    updateData(index, newNote);

    // Reset values
    title.value = '';
    content.value = '';

    // Make update form invisible and create form visible
    updateForm.classList.add('hidden');
    createForm.classList.remove('hidden');

    renderData();
}

/**
 * Cancel update confirmation
 */
function cancelUpdate() {
    // Get forms
    let createForm = document.querySelector('#create-form');
    let updateForm = document.querySelector('#update-form');

    isCancel = confirm('Are you sure to cancel the update?');

    // If cancel, make update form invisible and create form visible
    if (isCancel == true) {
        updateForm.classList.add('hidden');
        createForm.classList.remove('hidden');
    }
}