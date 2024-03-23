# ate/react-event-handler

<!-- end auto-generated rule header -->

Allows to define react event handler

> **Note**: This is a eslint-plugin for **Team**(ate-Eight).

## Rule Details

you should define react event handler function which starts with `handle`.

Examples of **incorrect** code for this rule:

```jsx
const MyComponent = () => {
  const onBack = () => {};

  return (
    <div>
      <div onClick={onBack}></div>
    </div>
  );
};
```

Examples of **correct** code for this rule:

```jsx
const handleHomeMove = () => {
    /...
}
```

```jsx
const MyComponent = () => {
  const handleMove = () => {};

  return (
    <div>
      <div onClick={handleMove}></div>
    </div>
  );
};
```

## Rule Options

```js
...
"ate/react-event-handler": [<enabled>]
...
```
