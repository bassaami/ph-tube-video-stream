alert()

function loadCategories(){
// 1- fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2- convert promise to json
    .then((res) => res.json())
    // 3- send data to display  
    .then((data) => displayCategory(data.categories) )
}
function displayCategory(c){
    console.log(c)
}
loadCategories()