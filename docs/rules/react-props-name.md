# ate/react-props-name

<!-- end auto-generated rule header -->

Allows to define react Fuctional Component Props Name

> **Note**: This is a eslint-plugin for **Team**(ate-Eight).

## Rule Details

React functional Component which have props which must be `Props`.

Examples of **incorrect** code for this rule:

```jsx
const Components = ({ title, color, size }: componentProps) => {
  //...
};
```

Examples of **correct** code for this rule:

```jsx
const Components = ({ title, color, size, text }: Props) => {
  //...
};
```

## Rule Options

```js
...
"ate/react-props-name": [<enabled>]
...
```
