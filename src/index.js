const API_URL = "https://animal-api-two.vercel.app/";

const $content = document.querySelector("div.content");
let template = "";

const getData = async (name) => {
  let res = await fetch(`${API_URL}${name}`);
  template = "";
  try {
    if (res) {
      data = await res.json();
      addImg(data);
      $content.innerHTML = template;
    }
  } catch (error) {
    console.log(error);
  }
};

const addImg = (data) => {
  data.photos.forEach((element) => {
    template += `<img src="${element.url}" alt="${element.name}" />`;
  });
};

const $tabBar = document.querySelectorAll("button[data-id]");
$tabBar.forEach((element) => {
  element.addEventListener("click", (e) => {
    $tabBar.forEach((btn) => btn.classList.remove("clicked"));
    getData(e.target.dataset.id);
    element.classList.add("clicked");
  });
});

getData("");
