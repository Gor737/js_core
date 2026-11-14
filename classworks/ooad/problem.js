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
