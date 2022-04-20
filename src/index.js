import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImageApiService from './js/imageApiService';
import image from './templates/image.hbs';
import { getRefs } from './js/refs';

const imageApiService = new ImageApiService();
const {formEl, galleryEl, buttonLoadMore} = getRefs();
const gallerySimplelightbox = new SimpleLightbox('.gallery a', { captions: true, captionDelay: 250, captionsData: 'alt' });

formEl.addEventListener('submit', onFormSubmit);

buttonLoadMore.classList.add('is-hidden');

function onFormSubmit(event) {
    event.preventDefault();
    imageApiService.resetPage();
    galleryEl.innerHTML = '';
    imageApiService.query = event.currentTarget.elements.searchQuery.value.toLowerCase().trim();

    if (imageApiService.query === '') {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }

    imageApiService.getImages().then(createMarkup);
    formEl.reset();
};

function createMarkup(data) {
    console.log(data.totalHits);

    if(data.totalHits === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;

    } else if(imageApiService.page === 2) {
        let totalHits = data.totalHits;
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    
    } else if(data.totalHits !== 0 && data.hits.length === 0) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }

    galleryEl.insertAdjacentHTML('beforeend', image(data.hits));
    buttonLoadMore.classList.remove('is-hidden');
    
    gallerySimplelightbox.refresh();
};

buttonLoadMore.addEventListener('click', onLoadMoreClick);

function onLoadMoreClick() {
    imageApiService.getImages().then(createMarkup);

}