const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const input_title = document.getElementById("input-title-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const returnBtn = document.getElementById("return-btn")
const ulEl = document.getElementById("ul-el")

let category = location.href.split("=").pop()

list(category, [], [])


function list(category, list, titleList) {

    const leadsLocalStorage = JSON.parse( localStorage.getItem(category) )
    const titleLocalStorage = JSON.parse( localStorage.getItem(`${category}title`) )

    if (titleLocalStorage)[
        titleList = titleLocalStorage
    ]
    if (leadsLocalStorage){
        list = leadsLocalStorage
        render(list)
    }

    //Criar categorias para cada link
    inputBtn.addEventListener("click", function() {
        if (!list.includes(inputEl.value)){
            list.push(inputEl.value)
            //Check Title
            if (!input_title.value == ""){
                titleList.push(input_title.value)
            }
            else{
                titleList.push(inputEl.value)
            }
        }

        inputEl.value = "" 
        input_title.value = "" 

        localStorage.setItem(category, JSON.stringify(list))
        localStorage.setItem(`${category}title`, JSON.stringify(titleList) )
        render(list)
    })

    tabBtn.addEventListener("click", function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (!list.includes(tabs[0].url)){
                list.push(tabs[0].url)
                //Check Title
                if (!input_title.value == ""){
                    titleList.push(input_title.value)
                    input_title.value = ""
                }
                else{
                    titleList.push(inputEl.value)
                }
                localStorage.setItem(category, JSON.stringify(list))
                localStorage.setItem(`${category}title`, JSON.stringify(titleList) )
            }
            render(list)
        });
    })
    returnBtn.addEventListener("click", function() {
        window.location.replace("index.html")
    })

    function render(leads){
        let listItems = ""
        for (i in  leads){
            listItems += `<li>
                            <a target='_blank' href='${leads[i]}'>
                                ${titleList[i]}
                            </a>
                            <button class="close-button" value='${i}' aria-label="Dismiss alert" type="button">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </li>`
        }
        ulEl.innerHTML = listItems

        const closeBtns = document.getElementsByClassName("close-button")
        console.log(category)
        console.log(titleList)
        console.log(list)
        for (i in leads) {
            let close_btn = closeBtns[i]
            close_btn.addEventListener("click", function() {
                list.splice(close_btn.value,1)
                titleList.splice(close_btn.value, 1)
                localStorage.setItem(category, JSON.stringify(list) )
                localStorage.setItem(`${category}title`, JSON.stringify(titleList) )
                render(list)                
            })
        }
        
    }

    deleteBtn.addEventListener("dblclick", function() {
        localStorage.removeItem(category)
        localStorage.removeItem(`${category}title`)
        list = []
        titleList = []
        render(list)
    })
}