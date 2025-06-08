document.addEventListener("DOMContentLoaded", () => { 
  fetch("/.netlify/functions/getprojects")
    .then(res => res.json())
    .then(projects => {
      console.log("Fetched projects:", projects); // ✅ Debug log

      if (!Array.isArray(projects)) {
        console.error("Expected an array but got:", projects);
        return;
      }

      const gallery = document.querySelector(".gallery");
      if (!gallery) {
        console.error("Gallery element not found");
        return;
      }

      gallery.innerHTML = "";

      if (projects.length === 0) {
        gallery.innerHTML = "<p>No projects available at the moment.</p>"; // Optional fallback message
        return;
      }

      projects.forEach(project => {
        const div = document.createElement("div");
        div.className = "project-card";
        div.innerHTML = `
          <a href="${project.link || "#"}" target="_blank">
            <img src="${project.image}" alt="${project.title}" />
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </a>
        `;
        gallery.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Failed to load projects:", err);
    });
});
