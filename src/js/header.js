import Refs from "./Refs";
import DataFetch from "./apiServiceSearch";
import {renderFilmsCard} from "./renderFilmsCard";
import Pagination from 'tui-pagination';
const dataFetch = new DataFetch()
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
// ==================reload page ============================
Refs.backHomePage.addEventListener('click' , onClickReloadPage)
// ==================search by input========================
Refs.searchInput.addEventListener('input', debounce(onFilmSerchValue, DEBOUNCE_DELAY));
// =================functions===============================
function onClickReloadPage(){location.reload()}
// ====================serch film==========================
function onFilmSerchValue(e) {
    e.preventDefault()
    if( e.target.value === ''){
        dataFetch.fetchTopFilms().then(films => {renderFilmsCard(films.results)});
        Refs.errorTextField.textContent ='Search result not successful. Enter the correct movie name'
    return}
      dataFetch.query = e.target.value.trim();
      Refs.galleryRef.innerHTML = '';
      dataFetch.fetchFilms().then(films =>{
      if(films.results.length === 0){dataFetch.fetchTopFilms().then(films => {renderFilmsCard(films.results)});
          Refs.errorTextField.textContent ='Search result not successful. Enter the correct movie name'
    return}
      Refs.errorTextField.textContent =''
      renderFilmsCard(films.results)
      onClickPaginationFilms ()
    })
}
function onClickPaginationFilms (){
    dataFetch.page = 1;
    const instance2 = new Pagination(Refs.paginationContainer, {
      totalItems: DataFetch.totalPages,
      itemsPerPage: 20,
      visiblePages:  5,
      centerAlign: true,
    });
    instance2.on('beforeMove', (event) => {
      dataFetch.page = event.page;
      dataFetch.fetchFilms().then(films => {
        Refs.galleryRef.innerHTML = '';
        renderFilmsCard(films.results)})
    })
  }