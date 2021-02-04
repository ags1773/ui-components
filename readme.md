Sample UI library exporting styled react components.
Sandbox for learning how to export libraries using webpack

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
