const username = "xeocean";

const apiUrl = `https://api.github.com/users/${username}/repos`;

const reposContainer = document.getElementById("repos");

async function fetchRepositories() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const repositories = await response.json();
    
    if (repositories.length > 0) {
      reposContainer.innerHTML = repositories
        .map(
          (repo) => `
          <div>
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || "Нет описания"}</p>
            <p>⭐ Stars: ${repo.stargazers_count}</p>
          </div>
        `
        )
        .join("");
    } else {
      reposContainer.innerHTML = "<p>Репозитории не найдены.</p>";
    }
  } catch (error) {
    reposContainer.innerHTML = `<p>Ошибка загрузки: ${error.message}</p>`;
  }
}

fetchRepositories();
