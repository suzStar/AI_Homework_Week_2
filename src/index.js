window.onload = function () {
  let current_val = "";
  document.getElementById("mood-select").addEventListener(
    "change",
    function () {
      current_val = this.value;

      console.log(current_val);
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

function showPoem(poemResponse) {
  new Typewriter("#poem-output", {
    strings: poemResponse.data.answer,
    autoStart: true,
  });
}

function generatePoem(event) {
  event.preventDefault();
  let userInput = document.querySelector("#user-input");
  let userFormat = document.querySelector("#type-select");
  let userPoeticDevices = document.querySelector("#poetic-devices-select");

  let apiKey = "d04fb3e0250t4fa0be3579oeba197b2c";
  let context =
    "You are a romantic Poem expert and love to write short poems,  You mission is to generate poems in basic HTML and separate each line with a <br />. Make sure to follow the user instructions. On the last line make sure to add a double < br />. Assign Titles to with h4. Sign the poem with 'SheCodes AI' inside a <strong> element at the end of the poem ";
  let prompt = `User instructions: Please write a ${userFormat.value} poem that explores the theme of ${userInput.value}, and make sure to use the following poetic device: ${userPoeticDevices.value}.`;

  let urlBuilder = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let poemElement = document.querySelector("#poem-output");
  poemElement.classList.add("contentAdded");
  poemElement.innerHTML = ` Generating a poem for you about ${userInput.value}`;
  axios.get(urlBuilder).then(showPoem);
}

let poemForm = document.querySelector("#poem-input");
poemForm.addEventListener("submit", generatePoem);
