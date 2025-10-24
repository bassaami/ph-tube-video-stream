alert()
function removeActiveClass(){
    let activeButtons = document.getElementsByClassName("active")

    for(let btn of activeButtons){
        btn.classList.remove("active")
    }
    console.log(activeButtons)
}

function loadCategories(){      //nav buttons api
// 1- fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2- convert promise to json
    .then((res) => res.json())
    // 3- send data to display  
    .then((data) => displayCategory(data.categories) )
}

function loadVideo(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((resp) => resp.json())
    .then((data) => {
removeActiveClass()
document.getElementById("btn-all").classList.add("active")
        displayVideos(data.videos)
    })
}
let loadCategoryVideos = (id) => {

let url = ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`
console.log(url)

fetch(url)
.then((resp) => resp.json())
.then((data) => {
    removeActiveClass() // no active class
    let clickedButton = document.getElementById(`btn-${id}`)
clickedButton.classList.add("active")

    // console.log(clickedButton)
    displayVideos(data.category)

} )
}

let loadVideoDetails= (videoID) => {
    // console.log(videoID)
    let url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
    fetch(url)
    .then(resp => resp.json())
    .then(data => displayVideoDetails(data.video))
}

let displayVideoDetails = (video) => {
    console.log(video)
    document.getElementById("video_details").showModal()
    let detailsContainer = document.getElementById("details_container")

    detailsContainer.innerHTML=`
    
    <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.title}</p>
    
  </div>
</div>
    `
}

function displayCategory(categories){       //api loop
    // get the container
let categoryContainer = document.getElementById("category-container")
    // loop operation on array of object
    for( let cat of categories){
        // console.log(cat)
// create element
let categoryDiv  = document.createElement("div")
categoryDiv.innerHTML = `
<button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn hover:text-white hover:bg-[#ff1f3d] btn-sm">${cat.category}</button>
`
    // append the element
    categoryContainer.append(categoryDiv)
    }
    
}

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
let displayVideos = (videos) => {
    // console.log(videos)
    let videoContainer = document.getElementById("video-container")

videoContainer.innerHTML = ``   // clear the page

if(videos.length == 0){
videoContainer.innerHTML = `
<div class="py-30 col-span-full text-center flex flex-col items-center ">
    <img class="w-[320px]" src="oops-font-wh1200.png" alt="">
    <h2 class="font-bold text-2xl">Sorry, No content here</h2>
</div>
`
    return
}

    videos.forEach((video) =>{
        // console.log(video)
let videoCard = document.createElement("div")
videoCard.innerHTML= `
<div class="card bg-base-100 shadow-sm">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" /> 
    <span class="absolute bottom-2 right-2 text-white bg-black px-1 rounded ">3 h 45 min</span>
  </figure>
  <div class="py-3 flex gap-3 px-0">
    
<div class="profile">
    <!-- Channel Avatar -->
    <div class="avatar">
        <div class="w-6 rounded-full bg-indigo-600 ring ring-indigo-600 ring-offset-2 ring-offset-base-100 overflow-hidden flex-shrink-0">
            <img src="${video.authors[0].profile_picture}" alt="Channel Avatar" />
        </div>
    </div>
</div>

<div class="intro">
    <h2 class="text-sm font-semibold ">${video.title}</h2>
    <p class="text-sm text-gray-500 flex gap-1 ">${video.authors[0].profile_name} <img class="w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""></p>
    <p class="text-sm text-gray-500 ">${video.others.views} views</p>
</div>
  </div>
  <button onclick=  loadVideoDetails("${video.video_id}") class="btn btn-block">Show detailsx</button>
</div>

`
// append
videoContainer.append(videoCard)
    })
}

loadCategories()



