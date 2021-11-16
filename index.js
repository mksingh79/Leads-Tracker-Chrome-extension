// adding event listener instead of onclick on html tag

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const savetabBtn = document.getElementById("savetab-btn")
//const tabs = [{url: "http://www.sss.com/ss/dd/a/"}]
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )  //variable to store local storage content

// if localstorage has data then use renderleads to display that data on webpage
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderList(myLeads)
}

//event listener for double click on delete button
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderList(myLeads)
})

// event listener for save text 
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    //console.log(myLeads)
    renderList(myLeads)
    inputEl.value = ""
    //save myLeads to local storage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads))   //convert myleads array to string as setItem requires both key and value to be string
    console.log(localStorage.getItem("myLeads"))                //verify if myleads saved to localstorage

})

// event listener for save tab. Chrome extension object used to get the active tab on the active window. change manifest to give permissions
savetabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderList(myLeads)
    })
})

// function to render list on webpage
function renderList(leadlist){
    //listItems += "<li><a target='_blank' href='" + inputEl.value + "'>" + inputEl.value + "</a></li>"  // keep the format as <a href='website name'>website name</a>
    let listItems = ""
    for (let i = 0; i < leadlist.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leadlist[i]}'>
                    ${leadlist[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems                       // keep DOM manipulation outside of for loop to reduce computation
}
