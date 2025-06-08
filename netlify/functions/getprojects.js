const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

exports.handler = async function () {
  try {
    // Corrected relative path for Netlify deployment
    const projectsDirectory = path.resolve(__dirname, 'projects');
    
    if (!fs.existsSync(projectsDirectory)) {
      throw new Error(`Directory not found: ${projectsDirectory}`);
    }

    const filenames = fs.readdirSync(projectsDirectory);
    const projects = filenames
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => {
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
