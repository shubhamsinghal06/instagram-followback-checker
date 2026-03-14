document.getElementById("analyzeBtn").addEventListener("click", analyze);

async function analyze() {

const followersFile = document.getElementById("followersFile").files[0];
const followingFile = document.getElementById("followingFile").files[0];

if (!followersFile || !followingFile) {
alert("Please upload both files");
return;
}

const followers = await parseFile(followersFile);
const following = await parseFile(followingFile);

const notFollowingBack = following.filter(
user => !followers.includes(user)
);

displayResults(notFollowingBack);

}

async function parseFile(file) {

const text = await file.text();

if (file.name.endsWith(".json")) {

const data = JSON.parse(text);

let users = [];

data.forEach(item => {
if (item.string_list_data) {
users.push(item.string_list_data[0].value);
}
});

return users;

}

return parseHtml(text);

}

function parseHtml(text) {

const parser = new DOMParser();
const doc = parser.parseFromString(text, "text/html");

const links = doc.querySelectorAll("a");

return Array.from(links).map(a => a.textContent.trim());

}

function displayResults(users) {

const list = document.getElementById("result");

list.innerHTML = "";

if (users.length === 0) {
list.innerHTML = "<li>Everyone follows you back</li>";
return;
}

users.forEach(user => {

const li = document.createElement("li");

li.textContent = user;

list.appendChild(li);

});

}