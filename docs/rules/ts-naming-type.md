# ate/ts-naming-type

<!-- end auto-generated rule header -->

Allows to define typescript Type Naming

> **Note**: This is a eslint-plugin for **Team**(ate-Eight).

## Rule Details

You should define when you use typscript Type which must starts with `T`.

Examples of **incorrect** code for this rule:

```jsx
type UserRole = "s" | "ds" | "d";
```

Examples of **correct** code for this rule:

```jsx
type TUserRole = "s" | "ds" | "d";
```

## Rule Options

```js
...
"ate/ts-naming-type": [<enabled>]
...
```
