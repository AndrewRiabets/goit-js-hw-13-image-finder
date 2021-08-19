const BASE_URL = 'https://restcountries.eu/rest/v2/';
function fetchCountryByName(searchQuery) {
  return fetch(`${BASE_URL}name/${searchQuery}`).then(response => { return response.json() }).catch(error => { return error });
}

export default { fetchCountryByName };