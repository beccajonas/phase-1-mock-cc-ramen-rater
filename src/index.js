let menuDiv = document.querySelector('#ramen-menu')

fetchData();
formSubmission();

// * Fetch data from local host, invoke data rendering
function fetchData() {
    fetch('http://localhost:3000/ramens')
    .then (response => response.json())
    .then(data => data.forEach(element => renderMenu(element)))
}

// * Render menu items, add event listener to menu items
function renderMenu(array) {
    let menuImage = document.createElement('img')
    menuImage.src = array.image

    menuDiv.appendChild(menuImage)

    menuImage.addEventListener('click', () => {
        let detailDiv = document.querySelector('#ramen-detail')

        let detailImage = document.querySelector('.detail-image')
        let name = document.querySelector('.name')
        let restaurant = document.querySelector('.restaurant')
      
        detailImage.src = array.image
        detailImage.className = 'detail-image'

        name.innerText = array.name

        restaurant.innerText = array.restaurant

        detailDiv.append(detailImage, name, restaurant)

        let rating = document.querySelector('p')
        let comment = document.querySelector('#comment-display')

        rating.innerText = array.rating

        comment.innerText = array.comment
    })
}

// * Submit new form 
function formSubmission() {
    let form = document.querySelector('#new-ramen')

    form.addEventListener('submit', handleSubmit)

    function handleSubmit(e) {
        
        e.preventDefault()
        
        let image = document.createElement('img')
        image.src = e.target[2].value

        // let name = e.target[0].value
        // let restaurant = e.target[1].value
        // let rating = e.target[3].value
        // let comment = e.target[4].value

        menuDiv.append(image)
    } 
}





