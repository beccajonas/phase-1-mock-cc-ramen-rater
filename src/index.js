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
    // Render menu image to menu div
    let menuImage = document.createElement('img')
    menuImage.src = array.image
    menuDiv.appendChild(menuImage)

    // Select data containers 
    let detailDiv = document.querySelector('#ramen-detail')
    let detailImage = document.querySelector('.detail-image')
    let name = document.querySelector('.name')
    let restaurant = document.querySelector('.restaurant')
    let rating = document.querySelector('p')
    let comment = document.querySelector('#comment-display')

    // On menu image click, render fetched data into containers
    function clickMenuImage() {
        menuImage.addEventListener('click', () => {
        detailImage.src = array.image
        detailImage.className = 'detail-image'

        name.innerText = array.name

        restaurant.innerText = array.restaurant

        detailDiv.append(detailImage, name, restaurant)

        rating.innerText = array.rating

        comment.innerText = array.comment
    })}
    clickMenuImage();

    // On menu image dblclick, delete menu image, restore placeholder information in detail div
    function dblClickMenuImage() {
        menuImage.addEventListener('dblclick', () => {
        fetch(`http://localhost:3000/ramens/${array.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            console.log(response, 'Deleting');
            if (response.status === 200) {
                menuImage.remove()
                detailImage.src = './assets/image-placeholder.jpg'
                name.innerText = 'Insert Name Here'
                restaurant.innerText = 'Insert Restaurant Here'
                rating.innerText = ' / 10'
                comment.innerText = 'Insert comment here'
            }
        })
    })}
    dblClickMenuImage(); 
}

// * Submit new form 
function formSubmission() {
    let form = document.querySelector('#new-ramen')

    form.addEventListener('submit', handleSubmit)

    function handleSubmit(e) {
        e.preventDefault();
        
        let image = document.createElement('img')
        image.src = e.target[2].value

        menuDiv.append(image)
        
        let name = e.target[0].value
        let restaurant = e.target[1].value
        let rating = e.target[3].value
        let comment = e.target[4].value

        form.reset()

        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {'content-type' : 'application/JSON'},
            body: JSON.stringify({
                name: name ,
                restaurant: restaurant,
                image: image.src,
                rating: rating,
                comment: comment})
        })
        .then(response => response.json())
        .then(data => {console.log(data);
        }) 
    } 
}






