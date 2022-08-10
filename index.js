let body = document.getElementsByTagName("body")[0]
let oldHTML = body.innerHTML
let listOfCategories = []

if (localStorage.getItem('categoryName')){
    const localStorageList = JSON.parse( localStorage.getItem('categoryName') )
    listOfCategories = localStorageList
}

renderButtons()

function renderButtons(){
    body.innerHTML = oldHTML
    for (let i = 0; i<listOfCategories.length; i++){
        let categoryName = listOfCategories[i]
        const div1 = document.getElementById("div1")
        const div2 = document.getElementById("div2")
        if (i%2==0){
            div1.innerHTML += `
            <li>
                <button class="category" id="${categoryName}-btn">${categoryName}</button>
                <button class="close-button" value='${i}' aria-label="Dismiss alert" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
            `
        }
        else{
            div2.innerHTML += `
            <li>
                <button class="category" id="${categoryName}-btn">${categoryName}</button>
                <button class="close-button" value='${i}' aria-label="Dismiss alert" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
            `
        }
    }
    const buttons = document.getElementsByClassName("category")
    const closeBtns = document.getElementsByClassName("close-button")
    for (i = 0; i<buttons.length; i++){
        let j = i
        let btn = buttons[i]
        let close_btn = closeBtns[i]
        btn.addEventListener("click", function() {
                window.location.replace(`tab.html?var=${btn.textContent}`)
            })
        close_btn.addEventListener("click", function() {
                listOfCategories.splice(close_btn.value,1)
                localStorage.setItem('categoryName', JSON.stringify(listOfCategories) )
                renderButtons()                
            })
    }

    addBtn = document.getElementById("add-btn")
    addBtn.addEventListener("click", function() {
        body.innerHTML = `
        <input type='text' id='input-el'> <br>
        <button id='input-btn'>Save Category</button>
        `
        const inputEl = document.getElementById("input-el")
        const inputBtn = document.getElementById("input-btn")
        inputBtn.addEventListener("click", function() {
            let categoryName = inputEl.value
            listOfCategories.push(categoryName)
            localStorage.setItem("categoryName", JSON.stringify(listOfCategories))
            renderButtons()
        })
    })
};