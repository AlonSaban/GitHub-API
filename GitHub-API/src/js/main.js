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
const list = document.createElement('h3');
const listTitle = document.createElement('h2');
listTitle.classList.add('repo-list');
list.classList.add('repo-list');
footer.appendChild(listTitle);
footer.appendChild(list);

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
            const repoUrl = data.repos_url;
            console.log(repoUrl);
            if (repoUrl) {

                getUserRepos(repoUrl)
                list.innerHTML = '';
            }
        });
}

function getUserRepos(repoUrl) {
    fetch(repoUrl)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            //console.log(data[0]);
            //console.log(data[0].name);
            console.log(data.name);

            listTitle.innerHTML = `Repositories:`
            data.forEach(function(data) {
                list.innerHTML += `<li>${data.name}</li> <br> `
                console.log(data.name);

                /* 
                for (let i = 0; i < data.length; i++) {
                    const rangeRepo = '';
                    rangeRepo += data[i].name;
                    console.log(rangeRepo);
                    list.innerHTML += ` ${data.name}`;
                }
                */
            });

        })
}