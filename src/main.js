import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "./css/loader.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const query = event.target.elements["search-text"].value.trim();

  if (query === "") {
    iziToast.warning({
      title: 'Warning!',
      message: 'Please enter a search term before submitting.',
      position: 'topRight',
      timeout: 3000,
      pauseOnHover: true,
    });
    return;
  }

  clearGallery();
  showLoader();

  
  try {
    const { hits: images } = await getImagesByQuery(query);
    hideLoader();

    if (images.length === 0) {
      iziToast.error({
        title: 'Sorry!',
        message: 'There are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(images);
  } catch (error) {
    hideLoader();
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  };
}
