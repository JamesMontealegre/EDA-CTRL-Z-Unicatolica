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
    } else {
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

  searchByFirstLetter(targetLetter) {
    const foundNodes = [];
    if (typeof targetLetter !== 'string' || targetLetter.length !== 1) {
        console.warn("Toca meter una sola letra.");
        return foundNodes;
    }

    let currentNode = this.head;
    const targetLower = targetLetter.toLowerCase();

    while (currentNode !== null) {
      const firstInitial = currentNode.firstName[0]?.toLowerCase();
      const lastInitial = currentNode.lastName[0]?.toLowerCase();

      if (firstInitial === targetLower || lastInitial === targetLower) {
        foundNodes.push(currentNode);
      }
      currentNode = currentNode.next;
    }
    return foundNodes;
  }

  deleteByFirstLetter(letter) {
    let deletedCount = 0;
    if (typeof letter !== 'string' || letter.length !== 1 || !this.head) {
        console.warn("Toca meter una sola letra y que la lista no esté vacía.");
      return deletedCount;
    }

    let currentNode = this.head;
    const letterLower = letter.toLowerCase();

    while (currentNode !== null) {
        const nextNode = currentNode.next;
        const firstInitial = currentNode.firstName[0]?.toLowerCase();

        if (firstInitial === letterLower) {
            const nodeToDelete = currentNode;

            if (nodeToDelete === this.head && nodeToDelete === this.tail) {
                // Si es el único nodo
                this.head = null;
                this.tail = null;
            } else if (nodeToDelete === this.head) {
                // Si es el primero
                this.head = nodeToDelete.next;
                if (this.head) {
                    this.head.previous = null;
                } else {
                    this.tail = null;
                }
            } else if (nodeToDelete === this.tail) {
                // Si es el último
                this.tail = nodeToDelete.previous;
                this.tail.next = null;
            } else {
                // Si está en el medio
                nodeToDelete.previous.next = nodeToDelete.next;
                nodeToDelete.next.previous = nodeToDelete.previous;
            }

            nodeToDelete.next = null;
            nodeToDelete.previous = null;

            this.size--;
            deletedCount++;
        }
        currentNode = nextNode;
    }
    return deletedCount;
  }

  getAllContacts() {
    const contacts = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      contacts.push({
        firstName: currentNode.firstName,
        lastName: currentNode.lastName
      });
      currentNode = currentNode.next;
    }
    return contacts;
  }
}