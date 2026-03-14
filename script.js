const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", async () => {

const followersFile = document.getElementById("followersFile").files[0];
const followingFile = document.getElementById("followingFile").files[0];

if (!followersFile || !followingFile) {
alert("Upload both files");
return;
}

const followers = await parseFile(followersFile);
const following = await parseFile(followingFile);

const notFollowingBack = following.filter(user => !followers.includes(user));

displayResults(notFollowingBack);

});

async function parseFile(file) {

const text = await file.text();

if (file.name.endsWith(".json")) {
return parseJson(text);
}

return parseHtml(text);

}

function parseJson(text) {

const data = JSON.parse(text);

return data.map(entry => entry.string_list_data[0].value);

}

function parseHtml(text) {

const parser = new DOMParser();
const doc = parser.parseFromString(text, "text/html");

const links = doc.querySelectorAll("a");

let users = [];

links.forEach(link => {
users.push(link.textContent.trim());
});

return users;

}

function displayResults(users) {

const list = document.getElementById("result");
list.innerHTML = "";

users.forEach(user => {

const li = document.createElement("li");
li.textContent = user;
list.appendChild(li);

});

}