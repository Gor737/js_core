// ===============================================
//  Simple Library with factory functions
//  Run: node library-factory-functions.js
// ===============================================

// ---------- STEP 1. The problem: object literals ----------
const book1 = {
  title: "Samvel",
  author: "Raffi",
  isAvailable: true,
  borrow() {
    if (!this.isAvailable) return false;
    this.isAvailable = false;
    return true;
  },
};

const book2 = {
  title: "Vardanank",
  author: "Derenik Demirchyan",
  isAvailable: true,
  borrow() {                 // the same code again...
    if (!this.isAvailable) return false;
    this.isAvailable = false;
    return true;
  },
};

console.log("--- Step 1 ---");
console.log(book1.borrow()); // true
console.log(book1.borrow()); // false


// ---------- STEP 2. Factory function for Book ----------
function createBook(title, author) {
  return {
    title,
    author,
    isAvailable: true,
    borrow() {
      if (!this.isAvailable) return false;
      this.isAvailable = false;
      return true;
    },
    giveBack() {
      this.isAvailable = true;
    },
    getInfo() {
      return `${this.title} by ${this.author}`;
    },
  };
}

console.log("--- Step 2 ---");
const samvel = createBook("Samvel", "Raffi");
const vardanank = createBook("Vardanank", "Derenik Demirchyan");
console.log(samvel.getInfo());        // Samvel by Raffi
console.log(vardanank.getInfo());     // Vardanank by Derenik Demirchyan
console.log(samvel.borrow(), samvel.isAvailable); // true false


// ---------- STEP 3. Factory function for Member ----------
function createMember(name) {
  return {
    name,
    books: [],
    takeBook(book) {
      if (!book.borrow()) return `${book.title} is not available`;
      this.books.push(book);
      return `${this.name} took ${book.title}`;
    },
    returnBook(book) {
      book.giveBack();
      this.books = this.books.filter((b) => b !== book);
      return `${this.name} returned ${book.title}`;
    },
  };
}

console.log("--- Step 3 ---");
const ani = createMember("Ani");
const aram = createMember("Aram");
console.log(ani.takeBook(vardanank));   // Ani took Vardanank
console.log(aram.takeBook(vardanank));  // Vardanank is not available
console.log(ani.returnBook(vardanank)); // Ani returned Vardanank
console.log(aram.takeBook(vardanank));  // Aram took Vardanank


// ---------- STEP 4. Factory function for Library ----------
function createLibrary(name) {
  return {
    name,
    books: [],
    addBook(title, author) {
      const book = createBook(title, author); // a factory inside a factory
      this.books.push(book);
      return book;
    },
    findBook(title) {
      return this.books.find((b) => b.title === title);
    },
    getAvailableBooks() {
      return this.books.filter((b) => b.isAvailable).map((b) => b.getInfo());
    },
  };
}

console.log("--- Step 4 ---");
const library = createLibrary("City Library");
library.addBook("Samvel", "Raffi");
library.addBook("Vardanank", "Derenik Demirchyan");
library.addBook("Anlreli Zangakatun", "Paruyr Sevak");

const lilit = createMember("Lilit");
console.log(lilit.takeBook(library.findBook("Samvel"))); // Lilit took Samvel
console.log(library.getAvailableBooks());
// [ 'Vardanank by Derenik Demirchyan', 'Anlreli Zangakatun by Paruyr Sevak' ]


// ---------- STEP 5. Private data with closure ----------
// Problem: anyone can write  samvel.isAvailable = "banana"
function createSafeBook(title, author) {
  let isAvailable = true; // private: lives only inside the closure

  return {
    title,
    author,
    isAvailable() {
      return isAvailable;
    },
    borrow() {
      if (!isAvailable) return false;
      isAvailable = false;
      return true;
    },
    giveBack() {
      isAvailable = true;
    },
  };
}

console.log("--- Step 5 ---");
const safe = createSafeBook("Samvel", "Raffi");
safe.borrow();
console.log(safe.isAvailable());  // false
safe.available = "banana";        // creates a new useless property
console.log(safe.isAvailable());  // false — the real data is protected
