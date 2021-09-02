import picturesCardTpl from './tamplates/pictures-cards.hbs';
import PictureApiService from './apiService';
import getRefs from './get-refs';
import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';

const refs = getRefs();

const pictureApiService = new PictureApiService();

console.log(pictureApiService);

refs.searchForm.addEventListener('input', _.debounce(onSearch, 1000));
refs.showMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  pictureApiService.query = e.target.value;
  clearGallery();
  pictureApiService.resetPage();
  pictureApiService.fetchArticles().then(e => {
    console.log(e);
    if (e.length === 0) {
      error({ text: 'ERROR! Please, check if the picture keyword is entered correctly' });
    } else {
      appendArticlesMurkup(e);
    }
  });
}

async function onLoadMore() {
  pictureApiService.fetchArticles().then(appendArticlesMurkup);
}

function appendArticlesMurkup(hits) {
  refs.galleryRef.insertAdjacentHTML('beforeend', picturesCardTpl(hits));
  onScroll();
  visibleShowMoreBTN();
}

function clearGallery() {
  refs.galleryRef.innerHTML = '';
}

function onScroll() {
  refs.galleryRef.scrollIntoView({ block: 'end', behavior: 'smooth' });
}

function visibleShowMoreBTN() {
  refs.showMoreBtn.classList.remove('is-hidden');
}
