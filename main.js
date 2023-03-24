import { HfInference } from 'https://cdn.skypack.dev/@huggingface/inference@1.6.0';

document.addEventListener('DOMContentLoaded', () => {
    const myEnteredToken = document.getElementById('myEnteredToken');
    const storeTokenBtn = document.getElementById('store-token-btn');
    const myDataOrImage = document.getElementById('myDataOrImage');
    const myModel = document.getElementById('myModel');
    const loadTextBtn = document.getElementById('load-text-btn');
    const luckyTextBtn = document.getElementById('lucky-text-btn');
    const myDiv01 = document.getElementById('myDiv01');
    const myCanvas = document.getElementById('myCanvas');
    const ctx = myCanvas.getContext('2d');
    const preloader = document.getElementById('preloader');

    if (localStorage.getItem('myStoredToken')) {
        myEnteredToken.value = localStorage.getItem('myStoredToken');
    }

    storeTokenBtn.addEventListener('click', () => {
        localStorage.setItem('myStoredToken', myEnteredToken.value);
        myDiv01.innerHTML = 'Latest Token has been stored containing these last 4 characters: ' + myEnteredToken.value.slice(-4);
    });
    
    const loadImage = async () => {
        myDiv01.innerHTML = '';
        myCanvas.style.display = 'none';
        preloader.classList.remove('hidden'); 

        const hf = new HfInference(myEnteredToken.value);
        const objectDetectionRes = await hf.textToImage({
            model: myModel.value,
            inputs: myDataOrImage.value,
            negative_prompt: 'blurry'
        });
        // Sacar un error por consola si no carga la imagen
        if (!objectDetectionRes) {
            console.error('Error loading image');
            return;
        }

        const myImg = new Image();
        myImg.onload = function () {
            myCanvas.width = myImg.width;
            myCanvas.height = myImg.height;
            ctx.drawImage(myImg, 0, 0);
            myCanvas.style.display = 'block';
            preloader.classList.add('hidden');
        };
        myImg.src = URL.createObjectURL(objectDetectionRes);
        console.log(objectDetectionRes, 'myImg.src', myImg.src);
        myDiv01.innerHTML = JSON.stringify(objectDetectionRes);
        myDiv01.innerHTML = '<span class="color-blue">Image loaded:</span>' + '<span class="color-red">' + myImg.src + '</span>';


    };

 // Evento de click para cargar la imagen
 loadTextBtn.addEventListener('click', loadImage);
 luckyTextBtn.addEventListener('click', () => {
    let myData = myDataOrImage.value
    myDataOrImage.value = myData + ' seed:' + Math.floor(Math.random() * 1000);
    loadImage();
    myDataOrImage.value ="";
  });
 // Evento de tecla Enter para cargar la imagen
 myDataOrImage.addEventListener('keydown', (event) => {
     if (event.key === 'Enter') {
         event.preventDefault(); // Evitar la acción predeterminada del navegador
         loadImage();
     }
 });

});
