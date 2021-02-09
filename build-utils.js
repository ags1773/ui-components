const fs = require("fs");
const path = require("path");

/**
 * NOTE:
 * - Do not include this file in the bundle!
 * - Has to be in root dir
 * - This needs to be run after webpack builds and before publish
 * - Assumes webpack builds in ./dist dir
 */
function main() {
  const safePkgJsonObj = getSafePackageJson();
  fs.writeFileSync(
    path.join(__dirname, "dist", "package.json"),
    Buffer.from(JSON.stringify(safePkgJsonObj), "utf-8")
  );
}

main();

/**
 * The package.json that is to be distributed in the library should not contain sensitive info.
 * This function strips sensitive info
 * add/remove keys in the `take` var to take those keys from package json
 *
 * @returns object containing relevant fields from package json
 */
function getSafePackageJson() {
  const take = [
    "name",
    "version",
    "description",
    "main",
    "repository",
    "author",
    "license",
    "bugs",
    "peerDependencies",
    "dependencies",
  ];
  const pkgJsonStr = fs
    .readFileSync(path.resolve(path.join(__dirname, "package.json")))
    .toString("utf-8");
  const pkgJsonObj = JSON.parse(pkgJsonStr);
  const acc = {};
  take.forEach((key) => {
    if (pkgJsonObj.hasOwnProperty(key)) {
      acc[key] = pkgJsonObj[key];
    }
  });
  if (acc.main.startsWith("dist/")) {
    acc.main = acc.main.slice(5);
  }
  return acc;
}
