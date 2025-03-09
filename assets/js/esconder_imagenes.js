document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img.mi-foto");
  let loadedImagesCount = 0;

  images.forEach((img) => {
    img.addEventListener("load", () => {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) {
        images.forEach((img) => {
          img.classList.remove("hidden");
        });
      }
    });
  });
});
