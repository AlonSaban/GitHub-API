// make search-bar
export function search(element) {
    element.innerHTML = `
    <form action="">
    <input id="search" type="search" placeholder="type user name as is">
    <button id="searchBtn">Search</button>
    </form>
    `;
    return element;
}