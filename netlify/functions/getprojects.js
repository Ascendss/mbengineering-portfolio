const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

exports.handler = async function () {
  try {
    const dir = path.resolve(__dirname, "./projects"); // updated path
    if (!fs.existsSync(dir)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `❌ Directory not found: ${dir}` })
      };
    }

    const files = fs.readdirSync(dir).filter(file => file.endsWith(".md"));
    const projects = files.map(filename => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      return data;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(projects)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `❌ ${err.message}` })
    };
  }
};

