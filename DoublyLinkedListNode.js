class DoublyLinkedListNode {
    /**
     * Crea una instancia de DoublyLinkedListNode.
     * @param {string} firstName - El nombre del contacto.
     * @param {string} lastName - El apellido del contacto.
     */
    constructor(firstName, lastName) {
      // Validar que nombre y apellido no estén vacíos
      if (typeof firstName !== 'string' || firstName.trim() === '' ||
          typeof lastName !== 'string' || lastName.trim() === '') {
        throw new Error("El nombre y el apellido no pueden estar vacíos.");
      }
      this.firstName = firstName.trim(); // Guardar el nombre
      this.lastName = lastName.trim();   // Guardar el apellido
      this.next = null;      // Nodo siguiente
      this.previous = null;  // Nodo anterior
    }
}