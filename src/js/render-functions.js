  import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

export function clearGallery() {
  gallery.innerHTML = '';
}

export function createGallery(images) {
  const markup = images.map(image => {
    return `<li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="200" />
      </a>
      <ul class="info-list">
        <li class="info-item"><h3 class="info-title">Likes</h3><p class="info-text">${image.likes}</p></li>
        <li class="info-item"><h3 class="info-title">Views</h3><p class="info-text">${image.views}</p></li>
        <li class="info-item"><h3 class="info-title">Comments</h3><p class="info-text">${image.comments}</p></li>
        <li class="info-item"><h3 class="info-title">Downloads</h3><p class="info-text">${image.downloads}</p></li>
      </ul>
    </li>`;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); 
}

export function showLoader() {
  loader.classList.remove("hidden");
}

export function hideLoader() {
  loader.classList.add("hidden");
}