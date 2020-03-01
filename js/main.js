url_books = "https://api.myjson.com/bins/zyv02";
let data = [];
let books = [];

/*---Sending the Url and fetch the response--*/

fetch(url_books)
  .then(response => {
    // console.log(response);
    return response.json();
  })
  .then(myJson => {
    data = myJson;
    // console.log(data);
    books = data.books;
    createBooks(books);
    //performSearchEvent(books);
    searchButton(books);
  })
  .catch(error => {
    console.log("Error occured" + error);
  });
/*--Create the structure for books through js--*/
function createBooks(books) {
  let book_row = document.getElementById("book_row");
  book_row.innerHTML = "";
  for (i = 0; i < books.length; i++) {
    let flip_card = document.createElement("div");
    flip_card.setAttribute("class", "flip-card col-lg-3 col-md-4");
    book_row.appendChild(flip_card);

    let div_flipCardInner = document.createElement("div");
    div_flipCardInner.setAttribute("class", "flip-card-inner");
    flip_card.appendChild(div_flipCardInner);
    let div_flipCardFront = document.createElement("div");
    div_flipCardFront.setAttribute("class", "flip-card-front");
    div_flipCardInner.appendChild(div_flipCardFront);

    let book_image = document.createElement("img");
    book_image.setAttribute("class", "book-image");
    book_image.setAttribute("src", books[i].cover);
    book_image.setAttribute("alt", "Book image not available");
    div_flipCardFront.appendChild(book_image);
    let div_flipCardBack = document.createElement("div");
    div_flipCardBack.setAttribute("class", "flip-card-back");
    div_flipCardBack.setAttribute("id", "card-back");
    let book_title = document.createElement("h4");
    book_title.innerHTML = books[i].title;
    let book_desc = document.createElement("p");
    book_desc.innerHTML = books[i].description;
    div_flipCardBack.appendChild(book_title);
    div_flipCardBack.appendChild(book_desc);
    div_flipCardInner.appendChild(div_flipCardBack);
    let buttonInfo = document.createElement("button");
    buttonInfo.innerHTML = "More Info";
    div_flipCardBack.appendChild(buttonInfo);
    buttonInfo.setAttribute("id", books[i].detail);
    buttonInfo.setAttribute("class", "btn btn-info");
    buttonInfo.addEventListener("click", function(event) {
      let modal = document.getElementById("image-Modal");
      let div = document.createElement("div");
      div.setAttribute("class", "card");
      let span = document.createElement("span");
      span.innerHTML = "&times;";
      span.addEventListener("click", function() {
        // To clear the model to display the next picture
        modal.innerHTML = "";
      });

      let img = document.createElement("img");
      img.setAttribute("src", event.target.id);

      div.appendChild(span);
      div.appendChild(img);

      modal.appendChild(div);
    });
  }
}
/*---Create search bar with and without button option--*/

let term = null;
// To search for a particulat text entered
// function performSearchEvent(books) {
//   let searchField = document.getElementById("searchField");
//   console.log(searchField);
//   searchField.addEventListener("keyup", function(event) {
//     term = searchField.value.toUpperCase();
//     console.log("term" + term);
//     searchButton(books);
//   });
// }
function searchButton(books) {
  //   let button_search = document.getElementById("searchButton");
  let searchField = document.getElementById("searchField");
  //   button_search.addEventListener("click", function(e)
  searchField.addEventListener("keyup", function(e) {
    let searchedBooks = [];
    e.preventDefault();
    let searchField = document.getElementById("searchField");
    term = searchField.value.toUpperCase();
    console.log("term", searchField.value.toUpperCase());
    for (let i = 0; i < books.length; i++) {
      if (books[i].title.toUpperCase().includes(term)) {
        // console.log(books[i]);
        searchedBooks.push(books[i]);
      }
    }
    console.log(searchedBooks);
    createBooks(searchedBooks);
  });
}
