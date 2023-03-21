document.addEventListener('DOMContentLoaded', () => {

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar la acción predeterminada del navegador
        console.log('Enter key pressed');
        /*loadImage();*/
    }
});

});