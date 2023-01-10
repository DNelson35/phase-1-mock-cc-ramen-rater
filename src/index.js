// write your code here

const menu = document.querySelector("#ramen-menu")
const detailImageDiv = document.querySelector("#ramen-detail")
const rating = document.querySelector("#rating-display")
const comment = document.querySelector("#comment-display")
const form = document.querySelector("#new-ramen")

fetch("http://localhost:3000/ramens")
.then(resp => resp.json())
.then(resp => getRamen(resp))



function getRamen(resp){
    if(resp.length > 1){
        resp.forEach(noodle => {
            const img = document.createElement('img')
            img.src = noodle.image
            menu.appendChild(img)
            addClickEvent(img, noodle)
    
        })
    }else {
        const img = document.createElement('img')
        img.src = resp.image
        menu.appendChild(img)
        addClickEvent(img, resp)
    }

}

function addClickEvent(element, noodle){
    element.addEventListener("click", (e) => {
        const ramenInfo = detailImageDiv.children
        ramenInfo[0].src = e.target.src
        ramenInfo[1].textContent = noodle.name
        ramenInfo[2].textContent = noodle.restaurant
        rating.textContent = noodle.rating
        comment.textContent = noodle.comment

    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
        body: JSON.stringify({
            name: e.target[0].value,
            restaurant: e.target[1].value,
            image: e.target[2].value,
            rating: e.target[3].value,
            comment: e.target[4].value
        })
    })
    .then(resp => resp.json())
    .then(resp => getRamen(resp))

    form.reset()

})
