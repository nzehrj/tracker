let myLead = []
const inputEL = document.getElementById("input-el")
const saveInput = document.getElementById("input-btn")
const ulElement = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const storedLeads = JSON.parse(localStorage.getItem("myLead"))
const tabBtn = document.getElementById("tab-btn")


if (storedLeads) {
  myLead = storedLeads
  render(myLead)
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLead = []
  render(myLead)
})

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLead.push(tabs[0].url)
    localStorage.setItem("mylead", JSON.stringify(myLead))
    render(myLead)

  })
  
})


saveInput.addEventListener("click", function() {
  myLead.push(inputEL.value)
  inputEL.value = ""
  localStorage.setItem("myLead", JSON.stringify(myLead))
  render(myLead)
})

function render(lead) {
  let listItems  = ""
  for (let i = 0; i < lead.length; i++) {
      listItems += `
        <li>
          <a target='_blank' href='${lead[i]}'> 
            ${lead[i]} 
          </a>
        </li>
      `
  }  
  ulElement.innerHTML = listItems
}