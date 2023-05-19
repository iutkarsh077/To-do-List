let notesContainer = document.querySelector(".container3");
let form = document.getElementById("container2").firstElementChild;
let notes = [];

const addTask = () => {
  if (form.value == "") {
    alert("You must write something!");
  } else {
    let noteText = form.value;
    let note = {
      text: noteText
    };
    notes.push(note);
    saveNotesToLocalStorage();
    createNoteElement(noteText);
  }
  form.value = "";
};

const createNoteElement = (noteText) => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  img.src = "delete-icon.png";
  inputBox.setAttribute("contenteditable", "false");
  inputBox.textContent = noteText;
  notesContainer.appendChild(inputBox).appendChild(img);
};

const saveNotesToLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const retrieveNotesFromLocalStorage = () => {
  let savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notes = JSON.parse(savedNotes);
    notes.forEach((note) => {
      createNoteElement(note.text);
    });
  }
};

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    let noteElement = e.target.parentElement;
    let noteText = noteElement.textContent;
    noteElement.remove();
    deleteNoteFromLocalStorage(noteText);
  }
});

const deleteNoteFromLocalStorage = (noteText) => {
  notes = notes.filter((note) => note.text !== noteText);
  saveNotesToLocalStorage();
};

window.onload = function () {
  retrieveNotesFromLocalStorage();
};
