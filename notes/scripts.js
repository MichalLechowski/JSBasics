document.addEventListener('DOMContentLoaded', appStart);

let notesContainer = document.querySelector('#notes');
let btnNewNote = document.querySelector('#new-note-add');
let imgDelete = document.querySelector('imgDelete');
let notes = [];

// przeciążenie metody toString, zwraca to samo co JSON.stringify
// notes.toString() = function(){
//     return JSON.,stringify(this);
// }


function appStart() {
    notesContainer = document.querySelector('#notes');
    btnNewNote = document.querySelector('#new-note-add');
    btnNewNote.addEventListener('click', newNote);
    getSavedNotes();

}

/**
 * Pobiera notatki z localStorage i wpisuje do tablicy notes
 */
function getSavedNotes() {
    notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = '';
    sortNotes();
    showNotes();
}

function sortNotes() {

    let unpinnedNotes = notes.filter( (note) => note.pinned);
    let pinnedNotes = notes.filter( note => !note.pinned);

    // notes.sort((n1,n2) => {
    //     return (n1.pinned === n2.pinned)? 0 : n1.pinned? -1 : 1 
    // })

    unpinnedNotes.sort((n1, n2) => {
        return n2.id - n1.id;
    })

    pinnedNotes.sort((n1, n2) => {
        return n2.id - n1.id;
    })

    notes = [...pinnedNotes, ...unpinnedNotes];
}

function updateSavedNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
    getSavedNotes();
}

/**
 * wyświetla notatki z tablicy notes w html
 * @param {*} notes lista notatek
 */
function showNotes() {
    notes.forEach(note => {
        addNoteToNotesContainer(note);
    })
}

function addNoteToNotesContainer(note, newNote = false) {
    //wrzuc notatke na strone
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    const d = new Date(note.id);

    // img.addEventListener('click', () => {
    //     deleteNote(note.id);
    // });

    noteDiv.innerHTML = `
    <img class="imgDelete" src="btnDelete.png" id="note${note.id}">
    <img class="imgPinned" src="imgUnpinned.png" id="pinned${note.id}">
    <div class="note-title">${note.title}:</div>
    <div class="note-content">${note.content}</div>
    <div class="note-date">${d.toLocaleString()}</div>
    <div class="note-menu></div>
    `


    if (!newNote) {
        notesContainer.appendChild(noteDiv);
    }
    else {
        notesContainer.insertBefore(noteDiv, notesContainer.firstChild);
    }

    document.querySelector(`#note${note.id}`).addEventListener('click', () => {
        deleteNote(note.id);
    })

    document.querySelector(`#pinned${note.id}`).addEventListener('click', () => {
        let icon = document.querySelector(`#pinned${note.id}`);
        note.pinned = !note.pinned;

        if (note.pinned) {
            icon.src = 'imgPinned.png';
        }
        else{
            icon.src = 'imgUnpinned.png';
        }
    })
}

function deleteNote(id) {
    let index = notes.findIndex((el) => {
        return id == el.id;
    })
    notes.splice(index, 1);
    updateSavedNotes();
}

function newNote() {
    console.log('new note add');
    // pobierz tytul
    const newNoteName = document.querySelector('#new-note-name').value;
    // pobierz tresc
    const newNoteContent = document.querySelector('#new-note-content').value;
    // utworz notatke
    const newNote = new Note(newNoteName, newNoteContent);
    // sprawdz czy tytul i zawartosc nie jest pusta
    if (newNoteName !== '' && newNoteContent !== '') {

        // zapisz w tablicy notatek
        notes.push(newNote);
        // zapisz w localStorage
        localStorage.setItem('notes', JSON.stringify(notes));
        // wrzucna strone
        addNoteToNotesContainer(newNote, true);
    }
    else {
        let errorDiv = document.querySelector('.note-error');
        errorDiv.classList.remove('hidden');
        setTimeout(function () {
            errorDiv.classList.add('hidden');
        }, 2000);
    }
}


/**
 * Konstruktor notatki
 * 
 * @param {string} title Tytul notatki 
 * @param {string} content Treśc notatki
 */

function Note(title = '', content = '') {
    this.title = title;
    this.content = content;
    this.id = Date.now();
    this.pinned = false;
}