const endpoint = "https://api.punkapi.com/v2/beers?page=1&per_page=80";
$.getJSON(endpoint, function(data) {
  console.log(data);
  let weakBeers = data.filter(beer => beer.abv <= 4.5);
  let medBeers = data.filter(beer => beer.abv > 4.5 && beer.abv <= 7.5);
  let strongBeers = data.filter(beer => beer.abv > 7.5 && beer.abv <= 50);

  
  function Display(range, percent) {
   
    let beerHtml = range.map(
      item =>
        `
        <div class = 'beer-wrapper'>
        <div class = "beer ${percent}">
          <i class="fa fa-star" aria-hidden="true"></i>
          <h3 class="beer__name">${item.name}</h3>
          <img class ="beer__img" src = "${item.image_url}">
          <h4 class ="beer__tagline">${item.tagline}</h4>
         
         </div>
         <div class ="pop-up">
          <i class="fa fa-window-close-o" aria-hidden="true"></i>
            <h3 class ="title">Description</h3>
            <p>${item.description}</p>
            <h3 class ="title">Food Pairing</h3>
              <ul>
       
               ${item.food_pairing
                 .map(ingredient => `<li>${ingredient}</li>`)
                 .join("")}

              </ul>
          </div>
        </div>
            `
    );

    $(".beers").append(beerHtml);
  }
  
  Display(weakBeers, "weak");
  Display(medBeers, "medium");
  Display(strongBeers, "strong");


 
  $(".favourites").append(
    '<i class="fa fa-window-close-o favourites__close" aria-hidden="true"></i>'
  );

  $(".favourites").on("click", ".favourites__close", function() {
    $(".favourites").fadeOut();
  });

  $(".favourites__title").on("click", function() {
    $(".favourites").fadeIn();
  });

  
  $(".beer img").on("click", function() {
    $(this)
      .closest(".beer-wrapper")
      .find(".pop-up")
      .fadeIn();
    $(".bg").fadeIn();
  });

  $(".fa-window-close-o").on("click", function() {
    $(".pop-up").fadeOut();
    $(".bg").fadeOut();
  });
  

  $(".beer").css("display", "none");

  $(".beers .medium").css("display", "block");

  $(".tab__item").on("click", function() {
    $(".tab__item").removeClass("active");
    $(this).addClass("active");
  });

  $(".tab__item.weak").on("click", function() {
    $(".beers .weak").show();

    $(".beers .medium").hide();
    $(".beers .strong").hide();
  });

  $(".tab__item.medium").on("click", function() {
    $(".beers .medium").show();

    $(".beers .weak").hide();
    $(".beers .strong").hide();
  });

  $(".tab__item.strong").on("click", function() {
    $(".beers .strong").show();

    $(".beers .weak").hide();
    $(".beers .medium").hide();
  });
});
const input=document.getElementById("search")
const reset=document.getElementById("reset")

reset.addEventListener("click", () => {
    data.value = "";
    Display(); 
});

