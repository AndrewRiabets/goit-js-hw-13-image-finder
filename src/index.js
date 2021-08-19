import countryCardTpl from './tamplates/country-cards.hbs';
import countryListTpl from './tamplates/country-list.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';
import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';

const refs = getRefs();
refs.searchForm.addEventListener('input', _.debounce(onSearch, 500));

function onSearch(e) {
    const countryName = e.target.value;

    API.fetchCountryByName(countryName)
        .then(e => {
            if (e.status === 404) {
                error({ text: 'ERROR! Please, check if the country name is entered correctly' });
            } else renderQueryResult(e);
            })
}

function renderQueryResult(country) {
    if (country.length > 10) {
        console.log('1')
        manyMatchesFoundError(country);
    } if (country.length === 1) {
        console.log('2');
        renderCountryCard(country);
    } if (country.length > 1 && country.length <= 10) {
        console.log('3');
      renderCountryList(country);
    }
}

function manyMatchesFoundError() {
  return error({ text: 'ERROR! To many matches found. Please enter a more specific query' });
}

function renderCountryCard(country) {
  const markup = countryCardTpl(...country);
  refs.cardContainer.innerHTML = markup;
}

function renderCountryList(country) {
  const markupList = countryListTpl(country);
  refs.cardContainer.innerHTML = markupList;
}