// ---------- functions ----------

// (reducer: Reducer, initialState: State) => { getState, dispatch, subscribe, undo }
//     getState(): State
//     dispatch(action: Action): void
//     subscribe(listener: (state: State) => void): () => void   // returns unsubscribe
//     undo(): void   // bonus
function createStore(reducer, initialState) {}

// (state: State, action: Action) => State   pure, never mutates state
function todoReducer(state, action) {
    
}

// (state: State) => { total, completed, active, percent }
function getStats(state) {}

// ---------- state ----------

// Todo:   { id: number, text: string, done: boolean }
// State:  { todos: Todo[], nextId: number }
// Action: { type: "add", text: string }
//       | { type: "toggle", id: number }
//       | { type: "remove", id: number }
//       | { type: "clearCompleted" }

const initialState = { todos: [], nextId: 1 };

// ---------- calls ----------

const store = createStore(todoReducer, initialState);

const log = [];
const unsubscribe = store.subscribe(state => log.push(state.todos.length));

console.log(getStats(store.getState())); // { total: 0, completed: 0, active: 0, percent: 0 }

store.dispatch({ type: "add", text: "Learn closures" });
store.dispatch({ type: "add", text: "Write curry" });
store.dispatch({ type: "add", text: "Push homework" });
store.dispatch({ type: "add", text: "   " });

console.log(store.getState());
// {
//     todos: [
//         { id: 1, text: "Learn closures", done: false },
//         { id: 2, text: "Write curry", done: false },
//         { id: 3, text: "Push homework", done: false }
//     ],
//     nextId: 4
// }

store.dispatch({ type: "toggle", id: 1 });
store.dispatch({ type: "toggle", id: 3 });
store.dispatch({ type: "toggle", id: 99 });
console.log(getStats(store.getState())); // { total: 3, completed: 2, active: 1, percent: 67 }

const before = store.getState();
store.dispatch({ type: "toggle", id: 2 });
console.log(before.todos[1].done);           // false
console.log(store.getState().todos[1].done); // true
console.log(initialState);                   // { todos: [], nextId: 1 }

unsubscribe();
store.dispatch({ type: "clearCompleted" });
store.dispatch({ type: "unknown" });

console.log(store.getState()); // { todos: [], nextId: 4 }
console.log(log);              // [1, 2, 3, 3, 3, 3, 3, 3]

store.dispatch({ type: "add", text: "Bonus task" });
console.log(store.getState().todos.length); // 1
store.undo();
console.log(store.getState().todos.length); // 0