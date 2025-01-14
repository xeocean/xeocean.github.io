const username = "xeocean";
const apiUrl = `https://api.github.com/users/${username}/repos`;

const reposContainer = document.getElementById("repos");
const paginationContainer = document.getElementById("pagination");

const itemsPerPage = 5;
let currentPage = 1;
let totalPages = 1;

async function fetchRepositories() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const repositories = await response.json();

    repositories.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    totalPages = Math.ceil(repositories.length / itemsPerPage);

    renderPage(repositories);
    renderPagination();
  } catch (error) {
    reposContainer.innerHTML = `<p>Loading error: ${error.message}</p>`;
  }
}

function renderPage(repositories) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedRepos = repositories.slice(startIndex, endIndex);

  if (paginatedRepos.length > 0) {
    reposContainer.innerHTML = paginatedRepos
      .map(
        (repo) => `
        <div>
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>${repo.description || "No description provided"}</p>
          <p>✨ Language: ${repo.language || "Not defined"}</p>
          <p>📅 Last updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
        </div>
      `
      )
      .join("");
  } else {
    reposContainer.innerHTML = "<p>No repositories found on this page.</p>";
  }
}

function renderPagination() {
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "active" : "";

    button.addEventListener("click", () => {
      currentPage = i;
      fetchRepositories();
    });

    paginationContainer.appendChild(button);
  }
}

fetchRepositories();
