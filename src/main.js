  import { getImagesByQuery } from "./js/pixabay-api";
  import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    hideLoadMoreButton,
    showLoadMoreButton,
  } from "./js/render-functions";

  import iziToast from "izitoast";
  import "izitoast/dist/css/iziToast.min.css";
  import "./css/loader.css";

  let currentQuery = '';
  let currentPage = 1;
let totalHits = 0;
  const PER_PAGE = 15;

  const form = document.querySelector('.form');
  const loadMoreBtn = document.querySelector('.load-more');


  form.addEventListener('submit', handleSubmit);
  loadMoreBtn.addEventListener('click', handleLoadMore);

  // --- сабміт ---
  async function handleSubmit(event) {
    event.preventDefault();
    showLoader();
    hideLoadMoreButton()
    

    const query = event.target.elements["search-text"].value.trim();
    currentQuery = query;
    currentPage = 1;

    if (query === "") {
      iziToast.warning({
        title: 'Warning!',
        message: 'Please enter a search term before submitting.',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    clearGallery();
    

    try {
      const { hits: images, totalHits: apiTotalHits } =
        await getImagesByQuery(currentQuery, currentPage);

      totalHits = apiTotalHits;

      if (images.length === 0) {
        iziToast.error({
          title: 'Sorry!',
          message: 'There are no images matching your search query.',
          position: 'topRight',
        });
        return;
      }

      createGallery(images);

      if (currentPage * PER_PAGE < totalHits) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }

    } catch (error) {
      console.error(error);
      iziToast.error({
        message: 'Something went wrong.',
      });
    } finally {
    hideLoader(); 
  }
  }

  // --- load more ---
async function handleLoadMore() {
  hideLoadMoreButton();
    showLoader();

    try {
      currentPage += 1;

      const { hits: newImages } =
        await getImagesByQuery(currentQuery, currentPage);

      if (newImages.length === 0) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
        return;
      }

      createGallery(newImages);

      // scroll
      const { height } = document
        .querySelector('.gallery li')
        .getBoundingClientRect();

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });

      if (currentPage * PER_PAGE >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        showLoadMoreButton();
      }

    } catch (error) {
      console.error(error);
      iziToast.error({
        message: 'Something went wrong.',
      });
    } finally {
      hideLoader();
    }
  }