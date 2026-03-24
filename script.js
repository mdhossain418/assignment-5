
let issues=[]
let currentIssues=[]


async function loadIssues(){

const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await response.json()

issues=data.data
currentIssues=issues

renderIssues(issues)

}



function renderIssues(data){

const container=document.getElementById("issuesContainer")

container.innerHTML=""

document.getElementById("issueCount").innerText=data.length


data.forEach(issue=>{

let borderColor = issue.status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500"


let priorityColor=""
    console.log(issue);
if(issue.priority==="high") priorityColor="bg-red-100 text-red-600"
if(issue.priority==="medium") priorityColor="bg-yellow-100 text-yellow-600"
if(issue.priority==="low") priorityColor="bg-gray-100 text-gray-400"




container.innerHTML+=`

<div onclick="getIssueDetails('${issue.id}')" class="bg-white p-5 rounded shadow cursor-pointer hover:shadow-lg ${borderColor}">

<div class="flex justify-between items-center mb-2">

${
issue.status==="open"
? `
<div class="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
<img src="Open-Status.png" class="w-4 h-4">
Open
</div>
`
: `
<div class="flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
<img src="Closed-Status.png" class="w-4 h-4">
Closed
</div>
`
}

<span class="text-xs px-2 py-1 rounded ${priorityColor}">
${issue.priority}
</span>

</div>


<h3 class="font-bold text-lg mb-2 truncate">
${issue.title}
</h3>


<p class="text-gray-600 text-sm mb-3">
${issue.description}
</p>


<div class="flex flex-wrap gap-2 mb-3">
${issue.labels.map(label => `
<span class="text-xs bg-amber-400 text-amber-900 px-2 py-1 rounded-md font-semibold">
${label.toUpperCase()}
</span>
`).join("")}
</div>


<div class="text-xs text-gray-500">
Author: ${issue.author}
</div>

<div class="text-xs text-gray-400 mt-1">
Created: ${new Date(issue.createdAt).toLocaleDateString()}
</div>

</div>

`

})

}



function filterIssues(type,btn){

document.querySelectorAll(".filter-btn").forEach(b=>{
b.classList.remove("bg-blue-600","text-white")
b.classList.add("bg-gray-200")
})

btn.classList.remove("bg-gray-200")
btn.classList.add("bg-blue-600","text-white")


if(type==="all"){

currentIssues=issues
renderIssues(issues)

}

else{

let filtered = issues.filter(i=>i.status===type)

currentIssues=filtered

renderIssues(filtered)

}

}



function searchIssues(){

let text=document.getElementById("searchInput").value.toLowerCase()

let filtered=currentIssues.filter(issue=>
issue.title.toLowerCase().includes(text) ||
issue.description.toLowerCase().includes(text)
)

renderIssues(filtered)

}




function getIssueDetails(id){

const issue = issues.find(i => i.id === Number(id))

if(!issue){
  console.error("Issue not found")
  return
}

openModal(issue)

}





function openModal(issue){

const modal=document.getElementById("issueModal")

modal.classList.remove("hidden")
modal.classList.add("flex")

document.getElementById("modalTitle").innerText=issue.title

document.getElementById("modalMeta").innerText=
`${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}`

document.getElementById("modalDescription").innerText=issue.description

// Assignee (fake দিলে problem নাই)
document.getElementById("modalAssignee").innerText = issue.assignee || "jane_smith"

// Priority color
let priorityClass = ""

if(issue.priority==="high") priorityClass="bg-red-100 text-red-600"
if(issue.priority==="medium") priorityClass="bg-yellow-100 text-yellow-600"
if(issue.priority==="low") priorityClass="bg-gray-100 text-gray-500"

const priorityEl = document.getElementById("modalPriority")
priorityEl.innerText = issue.priority.toUpperCase()
priorityEl.className = `text-xs px-3 py-1 rounded-full ${priorityClass}`

// Labels (yellow pill style)
document.getElementById("modalLabels").innerHTML=
issue.labels.map(label=>`
<span class="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-md font-semibold">
${label.toUpperCase()}
</span>
`).join("")


const statusEl = document.getElementById("modalStatus")

if(issue.status === "open"){
  statusEl.innerText = "Opened"
  statusEl.className = "text-green-600 font-semibold"
} else {
  statusEl.innerText = "Closed"
  statusEl.className = "text-purple-600 font-semibold"
}
}





function closeModal(){
  const modal = document.getElementById("issueModal")

  modal.classList.remove("flex")
  modal.classList.add("hidden")
}


window.addEventListener("click", function(e){
  const modal = document.getElementById("issueModal")
  if(e.target === modal){
    closeModal()
  }
})





loadIssues()