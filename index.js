const inputBtn = document.querySelector(".input");
const info = document.querySelector(".info");
const meaningContainer = document.querySelector(".meaning-container");
const infoTextEl = document.querySelector('.info-text');
const title = document.querySelector('.title');
const meaning = document.querySelector('.meaning');
const audioEl = document.getElementById('audio');

inputBtn.addEventListener("keyup", (e) => {
  if (e.target.value && e.key == "Enter") {
    fetchApi(e.target.value);
    //meaningContainer.style.display = "block";
  }
});

async function fetchApi(word) {
  try {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((response) => response.json());
    console.log(result.title);

    if (result.title) {
      infoTextEl.style.display = 'none';
      meaningContainer.style.display = 'block';
      meaning.innerText = 'N/A';
      title.innerText = word;
      audioEl.style.display = 'none';
    } else {
      infoTextEl.style.display = "none";
      meaningContainer.style.display = 'block';
      title.innerText = result[0].word;
      meaning.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }

  } catch (error) {
    console.log(error);
    infoTextEl.style.display = "block";
    infoTextEl.innerText = 'try again later';
  }
}