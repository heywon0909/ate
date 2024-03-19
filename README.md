# eslint-plugin-ate

This is eslint-plugin for ate-Eight

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-ate`:

```sh
npm install eslint-plugin-ate --save-dev
```

## Usage

Add `ate` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ate"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ate/rule-name": 2
    }
}
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

| Name                                                                 |
| :------------------------------------------------------------------- |
| [react-event-handler](docs/rules/react-event-handler.md)             |
| [react-props-check](docs/rules/react-props-check.md)                 |
| [react-props-destructuring](docs/rules/react-props-destructuring.md) |
| [ts-naming-interface](docs/rules/ts-naming-interface.md)             |
| [ts-naming-type](docs/rules/ts-naming-type.md)                       |

<!-- end auto-generated rules list -->


