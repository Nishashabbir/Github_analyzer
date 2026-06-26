// ===========================
// DOM Elements
// ===========================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const loader = document.getElementById("loader");
const errorBox = document.getElementById("errorBox");

const profileContainer = document.getElementById("profileContainer");
const repoSection = document.getElementById("repoSection");

const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

const locationElement = document.getElementById("location");
const company = document.getElementById("company");
const website = document.getElementById("website");

const profileLink = document.getElementById("profileLink");

const repoContainer = document.getElementById("repoContainer");


// ===========================
// Event
// ===========================

searchBtn.addEventListener("click", () => {

    const username = searchInput.value.trim();

    if (username === "") {

        alert("Enter a GitHub username");

        return;

    }

    getUser(username);

});



// Press Enter to Search

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});



// ===========================
// Main Function
// ===========================

async function getUser(username) {

    showLoader();

    try {

        // User

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        if (!response.ok) {

            throw new Error();

        }

        const user = await response.json();


        // Repositories

        const repoResponse = await fetch(user.repos_url);

        const repositories = await repoResponse.json();


        displayUser(user);

        displayRepos(repositories);

    }

    catch (error) {

        showError();

    }

    finally {

        hideLoader();

    }

}



// ===========================
// Display User
// ===========================

function displayUser(user) {

    errorBox.classList.add("hidden");

    profileContainer.classList.remove("hidden");

    repoSection.classList.remove("hidden");


    avatar.src = user.avatar_url;

    nameElement.textContent = user.name || "No Name";

    username.textContent = "@" + user.login;

    bio.textContent = user.bio || "No Bio";


    repos.textContent = user.public_repos;

    followers.textContent = user.followers;

    following.textContent = user.following;


    locationElement.textContent =
        user.location || "Not Available";

    company.textContent =
        user.company || "Not Available";

    website.textContent =
        user.blog || "Not Available";


    profileLink.href = user.html_url;

}



// ===========================
// Display Repositories
// ===========================

function displayRepos(repositories) {

    repoContainer.innerHTML = "";

    repositories.forEach(repo => {

        repoContainer.innerHTML += `

        <div class="repo">

            <h3>${repo.name}</h3>

            <p>${repo.description || "No Description"}</p>

            <p>⭐ Stars : ${repo.stargazers_count}</p>

            <p>🍴 Forks : ${repo.forks_count}</p>

            <p>💻 Language : ${repo.language || "Unknown"}</p>

            <a
                href="${repo.html_url}"
                target="_blank">

                Open Repository

            </a>

        </div>

        `;

    });

}



// ===========================
// Loader
// ===========================

function showLoader() {

    loader.classList.remove("hidden");

    profileContainer.classList.add("hidden");

    repoSection.classList.add("hidden");

    errorBox.classList.add("hidden");

}


function hideLoader() {

    loader.classList.add("hidden");

}



// ===========================
// Error
// ===========================

function showError() {

    profileContainer.classList.add("hidden");

    repoSection.classList.add("hidden");

    errorBox.classList.remove("hidden");

}