# ate/ts-naming-interface

<!-- end auto-generated rule header -->

Allows to define typescript Interface Naming

> **Note**: This is a eslint-plugin for **Team**(ate-Eight).

## Rule Details

You should define when you use typscript Interface which must starts with `I`.

Examples of **incorrect** code for this rule:

```jsx
interface UserInfo {
  role: UserRole;
}
```

Examples of **correct** code for this rule:

```jsx
interface IUserInfo {
  role: TUserRole;
}
```

## Rule Options

```js
...
"ate/ts-naming-interface": [<enabled>]
...
```
