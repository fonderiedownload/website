const fs = require("fs");
const path = require("path");

const PICTURES_DIRECTORY = path.join(__dirname, "..", "inuse");
const TAGS_FILE = path.join(PICTURES_DIRECTORY, "tags.txt");
const OUTPUT_FILE = path.join(__dirname, "..", "assets.js");

const buildAssets = (images, tags) =>
  images.map(({ path, filename }) => ({ path, tags: tags[filename] }));

const images = fs
  .readdirSync(PICTURES_DIRECTORY)
  .filter(
    (file) => file.indexOf(".") !== 0 && file.indexOf("tags.txt") == 0 - 1
  )
  .sort()
  .reverse()
  .map((filename) => ({ path: path.join(".", "inuse", filename), filename }));

const tags = fs
  .readFileSync(TAGS_FILE, "utf8")
  .split("\n")
  .filter(Boolean)
  .reduce((acc, line) => {
    const [name, tags] = line.split(":").map((el) => el.trim());
    return { ...acc, [name]: tags.split(",").map((el) => el.trim()) };
  }, {});

const assets = buildAssets(images, tags);

const outputFileContent =
  "window.images = " + JSON.stringify(assets, null, "\t");

fs.writeFile(OUTPUT_FILE, outputFileContent, "utf8", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
