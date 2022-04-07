
// after document is loaded.
window.addEventListener('DOMContentLoaded', () => {
    // form
    const form = document.getElementById('recipe-form')

    //after submit
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        let queryStr = form.elements[0].value; 
        getRecipe(queryStr);
        // empty inut field after submition
        form.elements[0].value = '';
    })

})


// getRecipe and map to html page. 
function getRecipe(queryStr) {
    const recipeWrapper = document.getElementById('recipe-wrapper'); 
    const notFound = document.getElementById('not-found'); 
    const resultTitle = document.getElementById('result-title')

    const URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i="; 
    
    fetch(URL+queryStr)
        .then(response => response.json())
        .then((data) => {
            const recipeItems = data.meals; 
            let notFoundCart = ``; 
            let htmlContent = ``; 

            if(recipeItems) {
                resultTitle.innerText = "Recipes for "+queryStr; 
                htmlContent = recipeItems.map(item => {
                    return `
                        <div data-id=${item.idMeal} class="recipe-card cursor-pointer block w-full shadow-md rounded-md bg-white pb-5 border-0 hover:scale-105 transition duration-200">
                            <div class="h-full flex flex-col items-center text-center">
                                <img
                                alt="team-member"
                                class="flex-shrink-0 rounded-t-md w-full h-56 object-cover mb-4"
                                src=${item.strMealThumb}
                                />
                
                                <div class="w-full px-2">
                                <h2 class="title-font font-medium text-lg text-gray-900">
                                    ${item.strMeal}
                                </h2>
                                </div>
                            </div>
                        </div>
                    `
                }).join(''); 
            } else {
                resultTitle.innerText = ``; 
                notFoundCart = `<div class="block w-full shadow-md rounded-md bg-white pb-5 border-0">
                    <div class="h-full flex flex-col items-center text-center">
                        <img
                        alt="team-member"
                        class="flex-shrink-0 rounded-t-md w-full h-56 object-cover mb-4"
                        src="https://janakihome.files.wordpress.com/2021/04/untitled-design-37.png?w=800&h=600&crop=1"
                        />
        
                        <div class="w-full px-2">
                        <h2 class="title-font font-medium text-lg text-gray-900">
                            Sorry, but not reciped found. 
                        </h2>

                        <p class="mt-3 text-center">Please try again with different category</p>
                        </div>
                    </div>
                </div>`
            }
            
            notFound.innerHTML = notFoundCart;
            recipeWrapper.innerHTML = htmlContent; 
        })
}