const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

exports.handler = async function () {
  try {
    const projectsDir = path.resolve(__dirname, "projects");
    if (!fs.existsSync(projectsDir)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Directory not found: ${projectsDir}` }),
      };
    }

    const files = fs.readdirSync(projectsDir);
    const projects = files
      .filter(file => file.endsWith(".md"))
      .map(file => {
        const filePath = path.join(projectsDir, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return data;
      });

    return {
      statusCode: 200,
      body: JSON.stringify(projects),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
