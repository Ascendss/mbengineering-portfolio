exports.handler = async function () {
  try {
    const localPath = path.resolve(__dirname, 'projects');
    const prodPath = path.resolve(__dirname, '../../content/projects');
    const projectsDirectory = fs.existsSync(localPath) ? localPath : prodPath;

    console.log("Looking in:", projectsDirectory); // 👈

    const filenames = fs.readdirSync(projectsDirectory);
    console.log("Found files:", filenames); // 👈

    const mdFiles = filenames.filter(file => file.endsWith('.md'));
    console.log("Markdown files:", mdFiles); // 👈

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
    console.error("ERROR:", error); // 👈 log full error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
