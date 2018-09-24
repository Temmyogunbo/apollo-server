import fs from "fs";
import path from "path";

// To be used when type definitions get larger
const loadGQLFile = (type) => {
  const filePath = path.join(__dirname, "../api", type);
  return fs.readFileSync(filePath, "utf-8");
};

module.exports = loadGQLFile;
