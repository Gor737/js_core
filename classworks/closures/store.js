// ---------- functions ----------

// (reducer: Reducer, initialState: State) => { getState, dispatch, subscribe, undo }
//     getState(): State
//     dispatch(action: Action): void
//     subscribe(listener: (state: State) => void): () => void   // returns unsubscribe
//     undo(): void   // bonus
function createStore(reducer, initialState) {
    const state = initialState;
    const listeners = [];
    const history = [];

    const getState = () => state;

    const dispatch = (action) => {
        const newState = reducer(state, action);

        if(state !== newState) {
            history.push(newState);
            state = newState;
        }

        listeners.forEach(listener => listener(state));
    }

    const subscribe = (listener) => {
        if(typeof listener !== 'function') return;

        listeners.push(listener);

        return () => {
            const index = listeners.indexOf(el => el === listener);
            if(index === -1) return;
            listeners = listeners.splice(index, 1);
        }
    }

    const undo = () => {
        if(!history.length) return;
        history.pop();
        state = history[history.length - 1];

        listeners.forEach(listener => listener(state));
    }

    return {
        getState,
        dispatch,
        subscribe,
        undo
    }
}

// (state: State, action: Action) => State   pure, never mutates state
function todoReducer(state, action) {
    switch(action.type){
        case 'add':
            if(!action.text.trim()) return state;
            return {
                todos: [
                    ...state.todos,
                    {
                        id: state.nextId,
                        text: action.text,
                        done: false
                    }
                ],
                nextId: state.nextId++
            }
        case 'toggle':
            const myTodo = state.todos.find(todo => todo.id === action.id);
            if(!myTodo) return state;

            const myTodos = state.todos.filter(todo => todo !== myTodo);
            myTodo.done = !myTodo.done;

            return {
                ...state,
                todos: [
                    ...myTodos,
                    myTodo
                ]
            }
        case 'remove':
            const removedTodo = state.todos.indexOf(todo => todo.id === action.id);
            if(removedTodo !== -1) return state;

            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        case 'clearCompleted':
            const todos = state.todos.filter(todo => !todo.done);

            return {
                ...state,
                todos
            }
        default:
            return state
    }
    
}

// (state: State) => { total, completed, active, percent }
function getStats(state) {
    const total = state.todos.length;
    const completed = state.todos.filter(todo => todo.done).length;
    const active = total - completed;
    const percent = !completed ? 0 : Math.round((completed / total) * 100);

    return {
        total,
        completed,
        active,
        percent
    }
}

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
//         { id: 1, text: "Learn closures", done: true },
//         { id: 2, text: "Write curry", done: false },
//         { id: 3, text: "Push homework", done: true }
store.dispatch({ type: "toggle", id: 2 });
//         { id: 1, text: "Learn closures", done: true },
//         { id: 2, text: "Write curry", done: true },
//         { id: 3, text: "Push homework", done: true }

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
// { id: 3, text: "Push homework", done: true }
store.undo();
console.log(store.getState().todos.length); // 0