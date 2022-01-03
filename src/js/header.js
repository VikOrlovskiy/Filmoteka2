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
// ==================navigation btn=========================
Refs.navigationPanel.addEventListener('click', onClickChengeNavigationPage)
// ==================library btn============================
Refs.userButtons.addEventListener('click', onClickShowWatchedAndQueue)
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
function onClickChengeNavigationPage(e){
    // active btn
    const activeBtn = document.querySelector('.navigation_button.active');
    // close gate !btn
    if(e.target.nodeName !== 'BUTTON'){return}
    // chenge disabled btn
    activeBtn.disabled = false;
    e.target.disabled = true;
    // chenge active class btn
    activeBtn.classList.remove('active');
    e.target.classList.add('active');
    // chenge bg header
    Refs.headerContainer.classList.toggle('active');
    // hide serch block
    Refs.searchBlock.classList.toggle('is-hidden');
    // show library buttons
    Refs.userButtons.classList.toggle('is-hidden');
    // fetch users film
   if(e.target.dataset.action === 'LIBRARY'){
    // clear library field
    Refs.galleryRef.innerHTML = '<p>you</p>';
    Refs.paginationContainer.classList.add("is-hidden")
    // fetch user library films
    return;
    }
    //click in home btn
    Refs.errorTextField.textContent = '';
    onClickReloadPage()
}
function onClickShowWatchedAndQueue(e){
    // close gate !btn
    if (e.target.nodeName !== 'BUTTON') {return}
    // active btn
    const activeBtn = document.querySelector('.button.active');
    // chenge disabled btn
    activeBtn.disabled = false;
    e.target.disabled = true;
    // chenge active class btn
    activeBtn.classList.remove('active');
    e.target.classList.add('active');
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
      console.log(event.page)
      dataFetch.page = event.page;
      dataFetch.fetchFilms().then(films => {
        Refs.galleryRef.innerHTML = '';
        renderFilmsCard(films.results)})
    })
  }