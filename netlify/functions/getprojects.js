const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

exports.handler = async function () {
  try {
    const projectsDirectory = path.resolve(__dirname, 'projects');
    const filenames = fs.readdirSync(projectsDirectory);
    const projects = filenames.map((filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
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
