import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42443321-a6618d4e2f1d36fd52b1b59e6';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const query = encodeURIComponent(searchInput.value.trim());

  if (query.trim() === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  showLoader();

  const apiUrl = new URL(BASE_URL);
  apiUrl.searchParams.set('key', API_KEY);
  apiUrl.searchParams.set('q', query);
  apiUrl.searchParams.set('image_type', 'photo');
  apiUrl.searchParams.set('orientation', 'horizontal');
  apiUrl.searchParams.set('safesearch', true);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayImages(data.hits);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });
});
function displayImages(images) {
  galleryList.innerHTML = '';

  if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });
    return;
  }

  const markup = createMarkup(images);
  galleryList.innerHTML = markup;

  lightbox.refresh();
  hideLoader();
}

function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          width="360"
        />
      </a>
      <div class="thumb-block">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${likes}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${views}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${comments}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${downloads}</p>
        </div>
      </div>
    </li>`
    )
    .join('');
}

function showLoader() {
  if (loader) {
    loader.style.display = 'block';
  }
}

function hideLoader() {
  if (loader) {
    loader.style.display = 'none';
  }
}