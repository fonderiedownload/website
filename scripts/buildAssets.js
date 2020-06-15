const fs = require("fs");
const path = require("path");

const PICTURES_DIRECTORY = path.join(__dirname, "..", "inuse");

const OUTPUT_FILE = path.join(__dirname, "..", "assets.js");

const buildAssets = (array) => array;
// TODO newest first .sort((a, b) => a.hash - b.hash)

const images = fs
  .readdirSync(PICTURES_DIRECTORY)
  .filter((file) => file.indexOf(".") !== 0)
  .sort()
  .reverse()
  .map((file) => path.join(".", "inuse", file));

const assets = buildAssets(images);

const outputFileContent =
  "window.images = " + JSON.stringify(assets, null, "\t");

fs.writeFile(OUTPUT_FILE, outputFileContent, "utf8", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
