# eslint-plugin-gwizxs-plugin

plugin for my projects or production

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-gwizxs-plugin`:

```sh
npm install eslint-plugin-gwizxs-plugin --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-gwizxs-plugin` and add `gwizxs-plugin` to the `plugins` key:

```js
import gwizxs-plugin from "eslint-plugin-gwizxs-plugin";

export default [
    {
        plugins: {
            gwizxs-plugin
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import gwizxs-plugin from "eslint-plugin-gwizxs-plugin";

export default [
    {
        plugins: {
            gwizxs-plugin
        },
        rules: {
            "gwizxs-plugin/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


