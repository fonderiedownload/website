const fs = require("fs");
const path = require("path");

const PICTURES_DIRECTORY = path.join(__dirname, "..", "inuse");
const INFO_FILE = path.join(PICTURES_DIRECTORY, "info.txt");
const OUTPUT_FILE = path.join(__dirname, "..", "assets.js");

const buildAssets = (images, info) =>
  images.map(({ path, filename }) => ({ path, ...info[filename] }));

const images = fs
  .readdirSync(PICTURES_DIRECTORY)
  .filter(
    (file) => file.indexOf(".") !== 0 && file.indexOf("info.txt") == 0 - 1
  )
  .sort()
  .reverse()
  .map((filename) => ({ path: path.join(".", "inuse", filename), filename }));

const info = fs
  .readFileSync(INFO_FILE, "utf8")
  .split("\n")
  .filter(Boolean)
  .reduce((acc, line) => {
    const [name, rest] = line.split(":").map((el) => el.trim());
    const [tags, title, author] = rest.split(";").map((el) => el.trim());
    return {
      ...acc,
      [name]: { tags: tags.split(",").map((el) => el.trim()), title, author },
    };
  }, {});

const assets = buildAssets(images, info);

const outputFileContent =
  "window.images = " + JSON.stringify(assets, null, "\t");

fs.writeFile(OUTPUT_FILE, outputFileContent, "utf8", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
