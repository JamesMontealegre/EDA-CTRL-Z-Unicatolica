const contactList = new DoublyLinkedList(); // La lista donde se guardan los contactos

// --- Referencias al HTML ---
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResultsDiv = document.getElementById("searchResults");
const deleteInput = document.getElementById("deleteInput");
const deleteBtn = document.getElementById("deleteBtn");
const deleteResultsDiv = document.getElementById("deleteResults");
const tableBody = document.getElementById("tableBody");

// --- Funciones ---
function renderTable() {
  // Borra lo que ya está en la tabla
  tableBody.innerHTML = '';
  searchResultsDiv.innerHTML = '';
  deleteResultsDiv.innerHTML = '';

  const contacts = contactList.getAllContacts();

  if (contacts.length === 0) {
    // Si no hay contactos, muestra un mensaje
    tableBody.innerHTML = `<tr><td colspan="2" class="text-center py-4 text-gray-500">La agenda está vacía.</td></tr>`;
  } else {
    // Agrega cada contacto a la tabla
    contacts.forEach(contact => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4 border-b border-gray-300">${contact.firstName}</td>
        <td class="py-2 px-4 border-b border-gray-300">${contact.lastName}</td>
      `;
      tableBody.appendChild(row);
    });
  }
}

function displaySearchResults(results, letter) {
  searchResultsDiv.innerHTML = '';
  if (results.length > 0) {
    // Muestra los contactos encontrados
    let html = `<p class="font-semibold">Resultados para "${letter}":</p><ul>`;
    results.forEach(node => {
      html += `<li class="ml-4 list-disc">${node.firstName} ${node.lastName}</li>`;
    });
    html += `</ul>`;
    searchResultsDiv.innerHTML = html;
  } else {
    // Si no encuentra nada, muestra un mensaje
    searchResultsDiv.innerHTML = `<p>No se encontraron contactos que empiecen con "${letter}".</p>`;
  }
}

function displayDeleteResults(count, letter) {
  if (count > 0) {
    // Muestra cuántos contactos se eliminaron
    deleteResultsDiv.innerHTML = `<p class="text-green-700">${count} contacto(s) cuyo nombre empieza con "${letter}" fueron eliminados.</p>`;
  } else {
    // Si no eliminó nada, muestra un mensaje
    deleteResultsDiv.innerHTML = `<p>No se encontraron contactos cuyo nombre empiece con "${letter}" para eliminar.</p>`;
  }
}

// --- Eventos ---
addBtn.addEventListener("click", () => {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  if (firstName === "" || lastName === "") {
    alert("Por favor completa Nombre y Apellido.");
    return;
  }

  try {
    const newNode = new DoublyLinkedListNode(firstName, lastName);
    contactList.insertSortedByFirstName(newNode); // Agrega el contacto en orden
    renderTable(); // Actualiza la tabla

    // Limpia los campos
    firstNameInput.value = "";
    lastNameInput.value = "";
    firstNameInput.focus();
  } catch (error) {
    alert(`Error al agregar: ${error.message}`);
  }
});

searchBtn.addEventListener("click", () => {
  const letter = searchInput.value.trim();
  if (letter.length !== 1) {
    alert("Por favor, ingresa una única letra para buscar.");
    searchResultsDiv.innerHTML = '';
    return;
  }
  const results = contactList.searchByFirstLetter(letter);
  displaySearchResults(results, letter);
  searchInput.value = "";
});

deleteBtn.addEventListener("click", () => {
  const letter = deleteInput.value.trim();
  if (letter.length !== 1) {
    alert("Por favor, ingresa una única letra para eliminar.");
    deleteResultsDiv.innerHTML = '';
    return;
  }
  const deletedCount = contactList.deleteByFirstLetter(letter);
  displayDeleteResults(deletedCount, letter);
  renderTable(); // Actualiza la tabla
  deleteInput.value = "";
});

// Render inicial
renderTable();