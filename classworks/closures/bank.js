// ---------- functions ----------

// (owner: string, initialBalance?: number) => Account
function createAccount(owner, initialBalance = 0) {}

// (from: Account, to: Account, amount: number) => boolean
function transfer(from, to, amount) {}

// bonus: (accounts: Account[]) => number
function getTotalBalance(accounts) {}

// bonus: (accounts: Account[], percent: number) => void
function applyInterest(accounts, percent) {}

// ---------- state ----------

// Account: {
//     deposit(amount: number): boolean,
//     withdraw(amount: number): boolean,
//     getBalance(): number,
//     getOwner(): string,
//     getHistory(): { type: "deposit" | "withdraw", amount: number, balance: number }[]
// }
// valid amount: finite number > 0

const alice = createAccount("Alice", 1000);
const bob = createAccount("Bob");

// ---------- calls ----------

console.log(alice.getOwner());    // "Alice"
console.log(alice.getBalance());  // 1000
console.log(bob.getBalance());    // 0

console.log(alice.deposit(500));   // true
console.log(alice.withdraw(2000)); // false
console.log(alice.withdraw(-10));  // false
console.log(alice.deposit(0));     // false
console.log(alice.deposit("100")); // false
console.log(alice.deposit(NaN));   // false
console.log(alice.withdraw(300));  // true
console.log(alice.getBalance());   // 1200

console.log(transfer(alice, bob, 200)); // true
console.log(alice.getBalance());        // 1000
console.log(bob.getBalance());          // 200

console.log(transfer(bob, alice, 500)); // false
console.log(alice.getBalance());        // 1000
console.log(bob.getBalance());          // 200

console.log(alice.getHistory());
// [
//     { type: "deposit",  amount: 500, balance: 1500 },
//     { type: "withdraw", amount: 300, balance: 1200 },
//     { type: "withdraw", amount: 200, balance: 1000 }
// ]

alice.getHistory().push("hack");
console.log(alice.getHistory().length); // 3
console.log(alice.balance);             // undefined

applyInterest([alice, bob], 1.5);
console.log(alice.getBalance());           // 1015
console.log(bob.getBalance());             // 203
console.log(getTotalBalance([alice, bob])); // 1218