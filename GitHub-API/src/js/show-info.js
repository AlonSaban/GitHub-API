export function getUserProfile(url, main) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {

            const wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            // Creating Elements.
            const img = document.createElement('img');
            const h2 = document.createElement('h2');
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
            // Appending those Elements to the main Element.
            main.appendChild(wrapper);

            wrapper.appendChild(img);
            wrapper.appendChild(h2);
            wrapper.appendChild(h3);
            wrapper.appendChild(p);
            // Putting the Api data on the elements.
            img.src = `${data.avatar_url}`;
            h2.innerHTML = ` Name : <a href="${data.html_url}" target="_blank">${data.name}</a>`;
            h3.innerHTML = ` Bio : ${data.bio} `;
            p.innerHTML = `followers : ${data.followers} <br> <br> since: ${data.created_at}`
        });
        return wrapper;
}