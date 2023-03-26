import { HfInference } from "https://cdn.skypack.dev/@huggingface/inference@1.6.0";

document.addEventListener("DOMContentLoaded", () => {
  const myEnteredToken = document.getElementById("myEnteredToken");
  const storeTokenBtn = document.getElementById("store-token-btn");
  const Prompt = document.getElementById("Prompt");
  const modelo = document.getElementById("modelo");
  const loadTextBtn = document.getElementById("load-text-btn");
  const icoClick = document.getElementById("ico-click");
  const luckyTextBtn = document.getElementById("lucky-text-btn");
  const Estado = document.getElementById("estado");
  const Canvas = document.getElementById("Canvas");
  const ctx = Canvas.getContext("2d");
  const preloader = document.getElementById("preloader");
  const searchHistory = document.getElementById("search-history");
  const searchForm = document.getElementById("search-bar");
  const historicPrompts = [
    "A computer from the 90s in the style of vaporwave",
    "An abstract painting of artificial intelligence",
    "A 3D render of an astronaut walking in a green desert",
    "Cat on top of computer keyboard",
    "Cucumber",
  ];

  if (localStorage.getItem("myStoredToken")) {
    myEnteredToken.value = localStorage.getItem("myStoredToken");
  }

  storeTokenBtn.addEventListener("click", () => {
    localStorage.setItem("myStoredToken", myEnteredToken.value);
    Estado.innerHTML =
      "Se ha almacenado el token más reciente que contiene estos últimos 4 caracteres: " +
      myEnteredToken.value.slice(-4);
  });

  const loadImage = async () => {
    Estado.innerHTML = "";
    Canvas.style.display = "none";
    preloader.classList.remove("hidden");
    const hf = new HfInference(myEnteredToken.value);
    const objectDetectionRes = await hf.textToImage({
      model: modelo.value,
      inputs: Prompt.value,
      negative_prompt:
        "bad anatomy, bad proportions, blurry, cloned face, cropped, deformed, dehydrated, disfigured, duplicate, error, jpeg artifacts, low quality, lowres, mutated hands, mutation, out of frame, poorly drawn face, signature, text, too many fingers, username, watermark, worst quality",
    });
    if (!objectDetectionRes) {
      console.error("Error loading image");
      return;
    }

    const imagen = new Image();

    imagen.onload = function () {
      Canvas.width = imagen.width;
      Canvas.height = imagen.height;
      ctx.drawImage(imagen, 0, 0);
      Canvas.style.display = "block";
      preloader.classList.add("hidden");
    };
    imagen.src = URL.createObjectURL(objectDetectionRes);
    console.log(objectDetectionRes, "imagen.src", imagen.src);
    Estado.innerHTML ="🧙‍♂️🤖 <span style='font-size:12px;'>Imagen generada by <strong>Google Diffuser</strong></span>.";
  };

  function populateSearchHistory() {
    searchHistory.innerHTML = "";
    historicPrompts.forEach((search) => {
      const listItem = document.createElement("div");
      listItem.classList.add("search-history-item");
      const itemText = document.createElement("p");
      itemText.textContent = search;
      const icon = document.createElement("i");
      icon.classList.add("fa-regular", "fa-clock");
      icon.style.color = "#d1d1d1";
      icon.style.marginRight = "6px";
      itemText.prepend(icon);
      listItem.appendChild(itemText);
      itemText.onclick = () => {
        Prompt.value = search;
        searchHistory.classList.add("hidden");
      };
      listItem.appendChild(itemText);
      searchHistory.appendChild(listItem);
    });
  }

  icoClick.addEventListener("click", loadImage);
  loadTextBtn.addEventListener("click", loadImage);
  luckyTextBtn.addEventListener("click", () => {
    let input = Prompt.value;
    window.location.href =
      "https://www.google.com/search?q=" +
      input +
      "&tbm=isch&sxsrf=APwXEdct1XtjBX6aIWFABUBbVvLUTJbaiA%3A1679778157438&source=hp&biw=1877&bih=1199&ei=bWEfZJnmGNukkdUP_JmVoAw&iflsig=AOEireoAAAAAZB9vfUiBoe4WKpktqkphu5cMyzdvhBKb&oq=&gs_lcp=CgNpbWcQARgAMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnMgcIIxDqAhAnUABYAGDmB2gBcAB4AIABAIgBAJIBAJgBAKoBC2d3cy13aXotaW1nsAEK&sclient=img";
  });

  Prompt.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      loadImage();
    }
  });

  searchHistory.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "P") {
      Prompt.value = target.textContent;
      searchHistory.classList.add("hidden");
    }
  });

  Prompt.addEventListener("focus", () => {
    searchHistory.classList.remove("hidden");
    populateSearchHistory();
  });

  Prompt.addEventListener("blur", () => {
    setTimeout(() => searchHistory.classList.add("hidden"), 200);
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Buscar:", Prompt.value);
  });

  populateSearchHistory();
});
