// =====LOADMESL====//
const loadMeals = (searFieldText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searFieldText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data))
    .catch((error) => console.log(error));
};

// =====DISPLAY LOAD MEALS=====//
const displayMeals = (data) => {
  const meals = data.meals;
  const mealsContainer = document.getElementById("meals__container");
  //FOR:: CLEARING THE PREVIOUSLY EXISTING SEARCH MEALS
  mealsContainer.innerHTML = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
            <div class="card h-100" onclick='loadMealDetails(${meal.idMeal})' >
              <img src=${
                meal.strMealThumb
              } class="card-img-top card__img" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text mt-1">
                ${meal.strInstructions.slice(0, 150)}
                </p>
              </div>
            </div>
    `;
    mealsContainer.appendChild(mealDiv);
  });
};

// =======SEARCH MEALS======//
document.getElementById("search__btn").addEventListener("click", function (e) {
  e.preventDefault();
  const searchField = document.getElementById("search__field");
  const searFieldText = searchField.value;
  loadMeals(searFieldText);
  //FOR:: Clearing the Input field text
  searchField.value = "";
});

// ====loadMealDetails====//
const loadMealDetails = (idMeal) => {
  //   console.log("Meal", idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data));
};

// =====displayMealDetails=====//
const displayMealDetails = (data) => {
  const meal = data.meals[0];
  const youtubeUrl = meal.strYoutube;
  console.log(youtubeUrl);

  const mealDetailsContainer = document.getElementById("meal__details");
  //FOR:: CLEARING THE PREVIOUSLY EXISTING MEAL DETAILS INFO
  mealDetailsContainer.innerHTML = "";

  mealDetailsContainer.innerHTML = `
  <button type="button" class="btn btn-dark text-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Show Details of <span style='color:red'> ${meal.strMeal}</span>
</button>

  <div class="modal fade mt-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                 <div>
                 <img src=${meal.strMealThumb} class="card-img" alt="..."/>
                 </div>
            </div>
            <div class="modal-body">
               <h2 class="modal-title text-center" id="exampleModalLabel">${
                 meal.strMeal
               }</h2>
               <hr>
               <p><strong>Category :</strong> ${meal.strCategory}</p>
               <p><strong>Descriptions :</strong> ${meal.strTags}</p>
               <hr>
               <p><strong>Ingredients:</strong></p>
               <ul>
                  <li>${meal.strIngredient1}</li>
                  <li>${meal.strIngredient2}</li>
                  <li>${meal.strIngredient3}</li>
                  <li>${meal.strIngredient4}</li>
                  <li>${meal.strIngredient5}</li>
                  <li>${meal.strIngredient6}</li>
               </ul>
               <hr>
               <p><strong>Instructions: </strong>${meal.strInstructions.slice(
                 0,
                 200
               )}</p>
               <hr>
               <p><strong>YouTube Video</strong></p>
               <iframe width="100%" height="315"  src="https://www.youtube.com/embed/dsJtgmAhFF4"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
</div>
  `;
};

// loadMeals
loadMeals("");
