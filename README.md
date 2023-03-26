# Página HTML estática

Se trata de hacer una página web (no una _app_) con cierta complejidad, en un solo documento (más estilos) que tenga bastante estructura y un diseño lo mejor posible (según la destreza de cada uno). La web tiene que hacerte investigar formas de hacer ciertas cosas que hagas por primera vez. Si es la primera vez que usas HTML, haz algo que no sea demasiado difícil, pero si ya sabes HTML y CSS, aprovecha para ponerte a prueba con algo nuevo: grids, animaciones en CSS, etc.

El tema de la página es libre, pero he aquí algunas sugerencias:

- **Clon**: escribe desde cero un clon de una página que te guste (o una parte). Utilízala como modelo e intenta hacerla igual pero sin copiar nada.

- **Currículum**: crea una página mostrando tu CV en un formato nuevo. Hazla lo mejor posible (y ponla online!). Busca páginas de CV y imita los estilos y lo que te guste, pero intenta hacer las cosas siempre desde cero.

- **Apuntes**: Crea un documento con tus apuntes sobre el Posgrado (u otra cosa), con estilos buenos y una estructura pensada. Intenta poner muestras de código, links a recursos que hayas encontrado, un índice (quizás generado con Javascript?), etc.

## Entregable

Para hacer esta práctica tienes que:
- Hacer un fork de este repositorio.
- Trabajar en tu *fork* haciendo commits regularmente (una práctica que aparece entera en un solo commit tendrá una nota muy baja o cero, hay que enseñar el proceso intermedio).
- Al finalizar, descarga un ZIP y entrega en el Campus Online de UPC School (habrá una tarea para ello).

## Google Diffuser  (David AR)

*Queria hacer un CV Online, pero al final se me ha ocurrido algo un poco más divertido*

- **Idea**: Crear un clon de la página inicial de Google experimentando con Flexbox, Grid y diseño responsivo. Luego, realizar una animación al estilo de los doodles de Google para experimentar con SVG y animación CSS. Finalmente, como ya hemos trabajado con JavaScript, intentar hacer una llamada a alguna API al hacer clic en el buscador y generar un evento que devuelva información e imágenes.


- **UPDATE**: Al final pense en la idea de hacer un Google "Diffuser", buscador tipo Google pero que realmente no busca si no que genera una imagen mediante un modelo textToImage(Stabble Difussion). Usando la librerias de JS de hugging Face (como el github de los modelos de IA), que sirven para interactuar con la su API.

- **UPDATE 2**: Prof of Concept sencillo de como podrían ser los búscadores de los proximos años, buscadores de imágenes que no se limiten a encontrar imágenes ya creadas, sino que también puedan generar imágenes a medida.


**Listas de tareas**

- [x] Clon de la página (Flexbox, Grids)
- [x] Diseño Responsivo  
- [x] Doodle animación sencilla (SVG, CSS)
- [x] API  hugging face js, eventos DOM, etc
- [x] Preload
- [ ] Optimizacion, mejoras version Mobile

EXTRAS (Si hay tiempo):
- [x] Tooltips Informativos
- [x] Capa flotante con búsquedas previas, como en "Google Imágenes"  

Demo: [Google Diffuser](https://pelfsollution.github.io/p1-html-2023/ "Google Diffuser")