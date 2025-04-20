class DoublyLinkedList {
  constructor() {
    this.head = null; // El primer nodo
    this.tail = null; // El último nodo
    this.size = 0;    // Cuántos nodos hay
  }

  isEmpty() {
    return this.size === 0; // Ver si la lista está vacía
  }

  insertSortedByFirstName(newNode) {
    if (!(newNode instanceof DoublyLinkedListNode)) {
      throw new Error("Solo se pueden meter nodos de tipo DoublyLinkedListNode.");
    }

    const newNameLower = newNode.firstName.toLowerCase();

    if (!this.head) {
      // Si no hay nada, este nodo es el primero
      this.head = newNode;
      this.tail = newNode;
    } else if (newNameLower < this.head.firstName.toLowerCase()) {
      // Si el nuevo nodo va antes del primero
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    } else {n
      // Si toca meterlo en el medio o al final
      let currentNode = this.head;

      while (currentNode.next !== null && currentNode.next.firstName.toLowerCase() < newNameLower) {
        currentNode = currentNode.next;
      }

      if (currentNode.next === null) {
        // Si va al final
        currentNode.next = newNode;
        newNode.previous = currentNode;
        this.tail = newNode;
      } else {
        // Si va en el medio
        newNode.next = currentNode.next;
        newNode.previous = currentNode;
        currentNode.next.previous = newNode;
        currentNode.next = newNode;
      }
    }
    this.size++; // Aumentar el tamaño
  }

}