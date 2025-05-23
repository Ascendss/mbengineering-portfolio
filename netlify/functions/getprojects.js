const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

exports.handler = async function (event, context) {
  try {
    // ✅ Adjusted for Netlify Functions directory structure
    const projectsDir = path.resolve(__dirname, "projects");

    if (!fs.existsSync(projectsDir)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `Directory not found: ${projectsDir}` }),
      };
    }

    const files = fs.readdirSync(projectsDir);
    const projects = files
      .filter(file => path.extname(file) === ".md")
      .map(file => {
        const filePath = path.join(projectsDir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const { data } = matter(content);
        return {
          title: data.title || "Untitled",
          description: data.description || "",
          image: data.image || "",
          link: data.link || "",
        };
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

