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
  let context = `You're a librarian. Return 8 books as a basic HTML unordered list. Format: Title <strong>by Author</strong>. No summaries or markdown.`;

  let prompt = `User instructions: Recommend 8 books in the genre: ${userGenre.value}, that are similar to "${userInput.value}".`;

  let urlBuilder = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let bookListElement = document.querySelector("#bookListOutput");
  bookListElement.classList.add("contentAdded");
  bookListElement.innerHTML = `<div class="blinkingAnimation">Generating book list for "${userInput.value}"...</div>`;

  axios.get(urlBuilder).then(showBookList);
}

let booklistGenerator = document.querySelector("#book-input");
booklistGenerator.addEventListener("submit", generateList);
