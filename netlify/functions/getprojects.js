const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

exports.handler = async function () {
  try {
    const projectsDirectory = path.resolve(__dirname, '../../functions/projects');
    const filenames = fs.readdirSync(projectsDirectory);
    const mdFiles = filenames.filter(file => file.endsWith('.md'));

    const projects = mdFiles.map((filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      return data;
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(projects),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
