

// let menuDiv = document.querySelector('#ramen-menu')

// fetchData();
// formSubmission();

// // * Fetch data from local host, invoke data rendering
// function fetchData() {
//     fetch('http://localhost:3000/ramens')
//     .then (response => response.json())
//     .then(data => data.forEach(element => renderMenu(element)))
// }

// // * Render menu items, add event listener to menu items
// function renderMenu(ramen) {
//     // Render menu image to menu div
//     let menuImage = document.createElement('img')
//     menuImage.src = ramen.image
//     menuDiv.appendChild(menuImage)

//     // Select data containers 
//     let detailDiv = document.querySelector('#ramen-detail')
//     let detailImage = document.querySelector('.detail-image')
//     let name = document.querySelector('.name')
//     let restaurant = document.querySelector('.restaurant')
//     let rating = document.querySelector('p')
//     let comment = document.querySelector('#comment-display')

//     // On menu image click, render fetched data into containers
//     function renderRamenDetail() {
//         menuImage.addEventListener('click', () => {
//         detailImage.src = ramen.image
//         detailImage.className = 'detail-image'

//         name.innerText = ramen.name

//         restaurant.innerText = ramen.restaurant

//         detailDiv.append(detailImage, name, restaurant)

//         rating.innerText = ramen.rating + ' / 10'

//         comment.innerText = ramen.comment
//     })}
//     renderRamenDetail();

//     // ! DELETE METHOD
//     // On menu image dblclick, delete menu image, restore placeholder information in detail div
//     function deleteImage() {
//         menuImage.addEventListener('dblclick', () => {
//         fetch(`http://localhost:3000/ramens/${ramen.id}`, {
//             method: 'DELETE',
//         })
//         .then(response => {
//             console.log(response, 'Deleting');
//             if (response.status === 200) {
//                 menuImage.remove()
//                 detailImage.src = './assets/image-placeholder.jpg'
//                 name.innerText = 'Insert Name Here'
//                 restaurant.innerText = 'Insert Restaurant Here'
//                 rating.innerText = ' / 10'
//                 comment.innerText = 'Insert comment here'
//             }
//         })
//     })}
//     deleteImage(); 
// }

// // * Submit new form 
// function formSubmission() {
//     let form = document.querySelector('#new-ramen')

//     form.addEventListener('submit', handleSubmit)

//     function handleSubmit(e) {
//         e.preventDefault();
        
//         let image = document.createElement('img')
//         image.src = e.target[2].value

//         menuDiv.append(image)
        
//         let name = e.target[0].value
//         let restaurant = e.target[1].value
//         let rating = e.target[3].value
//         let comment = e.target[4].value

//         form.reset()
        
//         // ! POST METHOD
//         fetch('http://localhost:3000/ramens', {
//             method: 'POST',
//             headers: {'content-type' : 'application/JSON'},
//             body: JSON.stringify({ // What am I trying to post? Pass that in as an object
//                 name: name ,
//                 restaurant: restaurant,
//                 image: image.src,
//                 rating: rating,
//                 comment: comment})
//         })
//         .then(response => response.json())
//         .then(data => {console.log(data);
//         }) 
//     } 
// }

fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        renderMenu(element)
    })
})

let menu = document.querySelector('#ramen-menu')
let image = document.querySelector('.detail-image')
let name = document.querySelector('.name')
let restaurant = document.querySelector('.restaurant')
let rating = document.querySelector('#rating-display')
let comment = document.querySelector('#comment-display')
let detailImage = document.querySelector('.detail-image')

function renderMenu(ramens) {
    let image = document.createElement('img')
    image.src = ramens.image
    menu.appendChild(image)

    image.addEventListener('click', renderDetail)

    function renderDetail() {
        
        detailImage.src = ramens.image

        name.innerText = ramens.name

        restaurant.innerText = ramens.restaurant

        rating.innerText = ramens.rating

        comment.innerText = ramens.comment
    }

    image.addEventListener('dblclick', () => {
        menu.removeChild(image)
        detailImage.src = './assets/image-placeholder.jpg'
        name.innerText = 'Insert Name Here'
        restaurant.innerText = 'Insert Restaurant Here'
        rating.innerText = 'Insert rating here'
        comment.innerText = 'Insert comment here'

    fetch(`http://localhost:3000/ramens/${ramens.id}`,{
        method: 'DELETE',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify()
    })
    .then(res => res.json())
    .then(data => console.log(data))
    })
}

let form = document.querySelector('#new-ramen')
form.addEventListener('submit', e => {
    e.preventDefault()
    let image = document.createElement('img')
    image.src = e.target.image.value
    menu.appendChild(image)
    
    let newName = e.target.name.value
    let newRestaurant = e.target.restaurant.value
    let newImage = document.createElement('img')
    newImage.src = e.target.image.value
    let newRating = e.target.rating.value
    let newComment = e.target['new-comment'].value

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            restaurant: newRestaurant,
            image: newImage.src,
            rating: newRating,
            comment: newComment
        })
    })
    .then(res => res.json())
    .then(data => (
        console.log(data)
    ))
})




