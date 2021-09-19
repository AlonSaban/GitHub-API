import { search } from './search-form.js';

const apiUrl = 'https://api.github.com/users/';
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const element = document.createElement('form');
const repos = document.createElement('div');
footer.appendChild(repos);
const mockRepository = [];
element.classList.add('search-bar');
main.appendChild(element)

search(element)

getSearchResults(element)
function getSearchResults(element) {
    const input = document.querySelector('input');
    element.addEventListener("submit", (e) => {
        e.preventDefault();
        main.innerHTML = '';
        console.log(input.value);
        const searchTerm = input.value;
        if (searchTerm) {
            getUserProfile(apiUrl + searchTerm);
            input.value = "";
        }
    });
    return input;
}

function getUserProfile(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Creating Elements.
            const wrapper = document.createElement("div");
            const img = document.createElement('img');
            const name = document.createElement('h2');
            const txt = document.createElement('h3');

            // Appending those Elements.
            wrapper.classList.add("wrapper");
            main.appendChild(element);
            main.appendChild(wrapper);
            wrapper.appendChild(img);
            wrapper.appendChild(name);
            wrapper.appendChild(txt);
            if (data.bio === null) {
                data.bio = `the user hasn't posted their bio`;
            }
            // placing the data on the html.
            img.src = `${data.avatar_url}`;
            name.innerHTML = ` Name : <a href="${data.html_url}" target="_blank">${data.name}</a> <br>`;
            txt.innerHTML = ` Bio : ${data.bio}  <br> <br> followers : ${data.followers} <br>  <br> Number of repository: ${data.public_repos} <br> <br> active since: ${data.created_at}`
            getUserRepos()
            console.log(data.repos_url);
        });
}
function getUserRepos() {
    const deposet = document.createElement('div');
    deposet.classList.add('repo-list');
    // repos.appendChild(deposet);
    console.log('first stage');
    const component = {
        element: deposet,
        search: async function (query) {
            try {
                const response = await fetch(`https://api.github.com/users/${query}/repos`)
                console.log(response);
                const repository = await response.json();
                const userRepository = repository.map(repo => repo.name)
                console.log('second stage');
                // userRepository.forEach(element =>
                //     console.log(element)
                // )
                // repos.push(data.name);
                // console.log(repos);
                renderRepositorys(userRepository);
            }
            catch (error) {
                throw error;
            }
        },
    }
    function renderRepositorys(repos) {
        deposet.innerHTML = ""
        repos
            .map(repo => getReposItemComponent(repo).element)
            .map(element => deposet.appendChild(element));
    }
    renderRepositorys(mockRepository);
    console.log(component);
    return component;
}
function getReposItemComponent(repo) {
    console.log('its in');
    const element = document.createElement('div');
    element.classList.add('show-repo');
    element.innerHTML = `<h1>${repo.name}</h1>`;
    return element;
}