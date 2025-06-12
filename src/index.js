window.onload = function () {
  let current_val = "";
  document.getElementById("mood-select").addEventListener(
    "change",
    function () {
      current_val = this.value;
      for (let el of document.querySelectorAll("#genre-topic-select option")) {
        el.style.display = "none";
      }
      for (let el of document.querySelectorAll(
        '#genre-topic-select option[data-type="' + current_val + '"]'
      )) {
        el.style.display = "block";
      }
    },
    false
  );
};

function showBookList(bookListResponse) {
  console.log(bookListResponse.data.answer);
  new Typewriter("#bookListOutput", {
    strings: bookListResponse.data.answer,
    autoStart: true,
  });
}

function generateList(event) {
  event.preventDefault();
  let userInput = document.querySelector("#user-input");
  let userMood = document.querySelector("#mood-select");
  let userGenre = document.querySelector("#genre-topic-select");

  let apiKey = "d04fb3e0250t4fa0be3579oeba197b2c";
  let context = `You are a librarian expert. Your mission is to generate a list of 8 books in basic HTML using an unordered list. 
Follow the user's instructions. Each book must appear in this format:<li>Book Title <strong>by Author Name</strong></li>
Do not include any other formatting such as code blocks, HTML tags outside of <ul> and <li>, or explanations. Output only the <ul> with the <li> items.`;

  let prompt = `User instructions: Recommend 8 books in the genre: ${userGenre.value}, that are similar to "${userInput.value}".`;

  let urlBuilder = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  console.log(context);
  console.log(prompt);
  console.log(urlBuilder);

  let bookListElement = document.querySelector("#bookListOutput");
  //bookListElement.classList.add("contentAdded");
  bookListElement.innerHTML = `Generating a poem for you about ${userInput.value}`;
  axios.get(urlBuilder).then(showBookList);
}

let booklistGenerator = document.querySelector("#book-input");
booklistGenerator.addEventListener("submit", generateList);
