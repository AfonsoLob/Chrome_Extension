const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const input_title = document.getElementById("input-title-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
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

    function render(leads){
        let listItems = ""
        for (i in  leads){
            listItems += `<li>
                            <a target='_blank' href='${leads[i]}'>
                                ${titleList[i]}
                            </a>
                        </li>`        
        }

        ulEl.innerHTML = listItems
    }

    deleteBtn.addEventListener("dblclick", function() {
        localStorage.removeItem(category)
        localStorage.removeItem(`${category}title`)
        list = []
        titleList = []
        render(list)
    })
}