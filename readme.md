Sample UI library exporting styled react components.
Sandbox for learning how to export libraries using webpack

## IMPORTANT:

- locked css-loader to v3.x.x because of [this](https://github.com/gajus/babel-plugin-react-css-modules/issues/291) issue. Took awfully long to debug this!
- run ./publish to publish. Do Not publish directly!
- publish script builds, then `cd`'s into the dist folder and runs publish. This ensures it's `import "@ags1773/ui-components/basket/styles.css"` and not `import "@ags1773/ui-components/dist/ basket/styles.css"`

## Extract CSS:

With the current setup, CSS is being extracted separately using the `MiniCssExtractPlugin`

```js
import { Basket } from "@ags1773/ui-components/basket"; // Basked component named import. Default will also work
import "@ags1773/ui-components/basket/styles.css"; // styles for basket component, exported separately
import Image from "@ags1773/ui-components/image"; // Image component default import. Named will also work
import "@ags1773/ui-components/image/styles.css"; // styles for image component, exported separately

// *** OR, import all the components and their styles ***
import { Basket, Image } from "@ags1773/ui-components";
import "@ags1773/ui-components/styles.css";
```
