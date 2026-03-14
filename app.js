const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", analyze);

function extractUsernames(html){

const parser = new DOMParser();

const doc = parser.parseFromString(html,"text/html");

const links = doc.querySelectorAll("a");

const users = new Set();

links.forEach(link => {

const name = link.textContent.trim().toLowerCase();

if(name){

users.add(name);

}

});

return users;

}

async function analyze(){

const followingFile = document.getElementById("followingFile").files[0];

const followerFiles = document.getElementById("followersFiles").files;

if(!followingFile || followerFiles.length === 0){

alert("Upload following.html and followers files");

return;

}

analyzeBtn.disabled = true;

analyzeBtn.textContent = "Analyzing...";

try{

const followingHTML = await followingFile.text();

const following = extractUsernames(followingHTML);

const followers = new Set();

for(const file of followerFiles){

const html = await file.text();

const users = extractUsernames(html);

users.forEach(u => followers.add(u));

}

const notFollowingBack = [];

following.forEach(user => {

if(!followers.has(user)){

notFollowingBack.push(user);

}

});

renderResults(following,followers,notFollowingBack);

}
catch(err){

alert("Error reading files");

}

analyzeBtn.disabled = false;

analyzeBtn.textContent = "Analyze";

}

function renderResults(following,followers,notFollowingBack){

const results = document.getElementById("results");

let html = "";

html += `
<div>
<b>Following:</b> ${following.size}<br>
<b>Followers:</b> ${followers.size}<br>
<b>Not following back:</b> ${notFollowingBack.length}
</div>
`;

html += "<h3>Users not following you back</h3>";

html += "<ul>";

notFollowingBack.forEach(user => {

html += `
<li>
<span>${user}</span>
<a class="profile" target="_blank" href="https://instagram.com/${user}">
Open
</a>
</li>
`;

});

html += "</ul>";

results.innerHTML = html;

}