import Refs from "./Refs";
import Pagination from 'tui-pagination';
import {renderFilmsCard} from "./renderFilmsCard";
import {onModalClose} from "./closeModalFunctions";
import filmCard from '../templates/film.hbs';
import DataFetch from "./apiServiceSearch";
const dataFetch = new DataFetch()
// ==================first page load========================
window.addEventListener('load',onloadFetchTopfilms)
// ====================open selected film===================
Refs.galleryRef.addEventListener('click', openfilm);
// =================functions first page render=============
async function onloadFetchTopfilms(){ 
  // genry fetch
  await DataFetch.fetchGenres()
  // TopFilms fetch and render
  await dataFetch.fetchTopFilms().then(films => {
    renderFilmsCard(films.results)
  //  pagination top films
    onClickPaginationTopFilms ()
})}
// ==================function open film by click============
function openfilm(e) {
  if(e.target.nodeName === 'UL' || e.target.nodeName === 'LI'){return}
  DataFetch.moveID = e.target.parentNode.dataset.id
  DataFetch.fetchFilmByID().then(film =>{createFilmCard(film)})
  Refs.backDrop.classList.toggle('is-hidden')
  onModalClose()
  Refs.body.classList.add("modal-open")
  }
// ==================function createFilmCard ===============
  function createFilmCard(film){
    const  {original_title , title, poster_path ,vote_average,vote_count,popularity,genres,overview} = film
    let filmGenry = genres[0].name;
    let rounded = Math.round(popularity * 10) / 10
    Refs.modalContentContainer.insertAdjacentHTML('afterbegin',filmCard({original_title , title, poster_path ,vote_average,vote_count,rounded,filmGenry,overview}),)
  }
 // ==================function onClickPaginationTopFilms ===
  function onClickPaginationTopFilms (){
    dataFetch.page = 0;
    const instance = new Pagination(Refs.paginationContainer, {
      totalItems: DataFetch.totalPages,
      itemsPerPage: 20,
      visiblePages:  5,
      centerAlign: true,
    });
    instance.reset()
    instance.on('beforeMove', (event) => {
      dataFetch.page = event.page;
      dataFetch.fetchTopFilms().then(films => {
        Refs.galleryRef.innerHTML = '';
        renderFilmsCard(films.results)})
    })
  }