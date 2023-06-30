# Use Easy - Unleash the Power of Simple Global State Management 🚀🌍
> Streamline your global state management in React apps with our robust, user-friendly library, Use Easy.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/use-easy.svg)](https://badge.fury.io/js/use-easy)

**Use Easy** is an open-source gem, designed to revolutionize global state management in React apps. It capitalizes on native browser storage technologies like LocalStorage and SessionStorage, paving the way for a global state management solution that's decoupled, lightweight, and incredibly easy to use. Let's make managing global state a breeze! 🍃

## Key Features and Benefits 🔑✨
- 🌍 **Global State Management**: Bid farewell to the woes of prop drilling and intricate data flow management. Effortlessly manage and share state across numerous components.
  
- 📦 **Storage Integration**: Capitalize on your browser's native storage capabilities (LocalStorage and SessionStorage) for persistent global state.

- 🚫 **No External Dependencies**: We take pride in our self-sufficiency. Use Easy doesn't rely on external libraries or frameworks, guaranteeing a lightweight and flexible state management experience.
  
- ⚙️ **Flexible Configuration**: Tailor the global state to meet your specific needs. You can set custom group names, storage types (local or session), and keys.
  
- 🔥 **Advanced Actions**: Execute complex operations on the global state, like resetting to the initial state, removing specific state keys, and even purging the entire state from storage.
  
- 🚦 **Error Handling**: Handle errors seamlessly during state loading, updates, and storage operations. Customizable error messages allow for effortless debugging.

## Installation 📥⚙️
Installing Use Easy is as simple as running an npm or yarn command:

```shell
npm install use-easy

# or

yarn add use-easy
```

## Usage 🚀💡

To start using Use Easy, import the `useEasy` hook from the `use-easy` package:

```jsx
import { useEasy } from 'use-easy';
```

Next, define your initial state and configuration options:

```jsx
const initial = {
  count: 0,
};
```

Finally, use the `useEasy` hook to access the global state and advanced actions:

```jsx
const MyCounter = () => {
  const { state } = useEasy({ initial })

  const handleClick = () => {
    state.count++;
  };

  const handleReset = () => {
    state.count = 0;
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={handleClick}>Increment</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};
```

Eureka! You're now leveraging the benefits of Use Easy for managing global state in your React application! 🎉💻

## Jump-Start Your Journey With Use Easy 🚀📋

To start your adventure with Use Easy in your Task Manager app, follow these simple steps:

1. Install the Use Easy library:

   ```shell
   npm install use-easy
   ```

2. Import the `useEasy` hook in your component:

   ```jsx
   import { useEasy } from 'use-easy';
   ```

3. Define your initial state and updaters:

   ```jsx
   export const initial = {
     tasks: [],
   };

   export const updaters = {
     // Define your custom updaters here
     // Example:
     addTask: (state, task) => ({ ...state, tasks: [...state.tasks, task] }),
     // ...
   };
   ```

4. Use the `useEasy` hook in your component:

   ```jsx
   function App() {
     const { state, actions } = useEasy({ initial, updaters });

     // Use the state and actions in your component

     return (
       // Your component JSX
     );
   }
   ```

5. Voilà! You're all set to manage your state with Use Easy! 🎉💼

## Dive into the Pool of Actions 🏊‍♂️🚀

Use Easy equips you with a multitude of predefined actions to modify the state based on the updaters you've defined.

Here's how you can put these actions to use:

```jsx
// Add a new task
actions.addTask({ id: 'unique-id', name: 'New Task', completed: false });

// Remove a task
actions.removeTask(taskId);

// Update a task
actions.updateTask(taskId, updatedTask);
```

Dive deep into the `updaters` object to explore all the ways you can play around with the tasks.

```jsx
const initialState = {
  tasks: [],
};

const updaters = {
  addTask: (state, task) => ({ ...state, tasks: [...state.tasks, task] }),
  // ... your updaters
};

const App = () => {
  const { state, actions } = useEasy({ initial: initialState, updaters });

  return (
    // Your component JSX
  );
};

actions.addTask({ id: '1', name: 'New Task', completed: false });
```

## Advanced Actions 🎩✨

Use Easy isn't just about basic actions. It empowers you with advanced actions to perform additional operations on the global state:

- `resetInitial()`: Reset the global state to the current initial state.
- `onlyCurrentInitial()`: Reset the global state to only the current initial state, disregarding any other changes.
- `removeState(key: string)`: Remove a specific state key from the global state.
- `deleteState()`: Wipe out the entire global state from storage.

## Error Handling 🚦🐛

In case of any errors during state loading, updates, or storage operations, Use Easy offers an error message and indicator for effortless debugging:

```jsx
if (actions.isError) {
  console.log('An error occurred:', actions.errorMessage);
}
```

## Join the Family - Contribute! 🤝❤️

We love seeing new faces in the Use Easy family! If you've found any issues or have suggestions for improvements, feel free to open an issue on our [GitHub repository](). And yes, pull requests are very much appreciated!

Just make sure to follow our code style, add tests for new features, and provide appropriate documentation.

## License 📄

Use Easy is released under the [MIT License](https://opensource.org/licenses/MIT).

---

Developed and maintained with love by [JuanDAC](https://github.com/JuanDAC). We sincerely hope Use Easy simplifies managing global state in your React applications, making your coding life a whole lot easier! 😊💻🌍
