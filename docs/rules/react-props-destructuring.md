# ate/react-props-destructuring

<!-- end auto-generated rule header -->

Allows to define react Fuctional Component Props

> **Note**: This is a eslint-plugin for **Team**(ate-Eight).

## Rule Details

React functional Component which have props that counts under 4 should destructure in functional Component props.

Examples of **incorrect** code for this rule:

```jsx
const Components = ({ title, color, size, text }: Props) => {
  //...
};
```

Examples of **correct** code for this rule:

```jsx
const Components = ({ title, color, size }: Props) => {
  //...
};
```

```jsx
const Components = (props: Props) => {
  const { title, color, size, fullWidth } = props;
  //...
};
```

## Rule Options

```js
...
"ate/react-props-destructuring": [<enabled>]
...
```
