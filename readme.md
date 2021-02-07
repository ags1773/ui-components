Sample UI library exporting styled react components.
Sandbox for learning how to export libraries using webpack

## IMPORTANT:

- locked css-loader to v3.x.x because of [this](https://github.com/gajus/babel-plugin-react-css-modules/issues/291) issue. Took awfully long to debug this!

## Extract CSS:

With the current setup, CSS is being extracted separately using the `MiniCssExtractPlugin`

```js
import { Basket } from "../../../ui-components/dist/basket"; // Basked component named import. Default will also work
import "../../../ui-components/dist/basket/styles.css"; // styles for basket component, exported separately
import Image from "../../../ui-components/dist/image"; // Image component default import. Named will also work
import "../../../ui-components/dist/image/styles.css"; // styles for image component, exported separately

// *** OR, import all the components and their styles ***
import { Basket, Image } from "../../../ui-components/dist/all";
import "../../../ui-components/dist/all/styles.css";
```
