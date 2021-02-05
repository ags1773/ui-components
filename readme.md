Sample UI library exporting styled react components.
Sandbox for learning how to export libraries using webpack

## IMPORTANT:

- locked css-loader to v3.x.x because of [this](https://github.com/gajus/babel-plugin-react-css-modules/issues/291) issue. Took awfully long to debug this!

#### Note:

if you're getting warning `react not defined`, install it `npm i react react-dom --no-save`
react is a peer dependancy. It's needed for development but npm doesn't install it on running `npm i`

## Multiple imports:

With the current setup,

```js
import { Basket } from "../../../ui-components/dist/basket";
import Image from "../../../ui-components/dist/image";
import { Basket, Image } from "../../../ui-components/dist";
```

### Note:

- now using CSS modules
- check how css is imported and used in component
- uses `css-loader`, you need to tell it to use modules by giving `modules: true` or pass an obj
- `basketWrapper` has now become `<ul class="basket-m__basketWrapper___2xiDz">`
