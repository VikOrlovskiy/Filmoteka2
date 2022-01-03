import Refs from "./Refs";
import {renderFilmsCard} from "./renderFilmsCard";
import filmCard from '../templates/film.hbs';
import DataFetch from "./apiServiceSearch";
import Pagination from 'tui-pagination';
const dataFetch = new DataFetch()
// ==================first page load=========================
window.addEventListener('load',onloadFetchTopfilms)
// =================functions first page render=============
async function onloadFetchTopfilms(){ 
  // genry fetch
  await DataFetch.fetchGenres()
  // TopFilms fetch and render
  await dataFetch.fetchTopFilms().then(films => {
       renderFilmsCard(films.results)
      //  onPaginationPage(dataFetch.totalPages * 19)
       const instance = new Pagination(Refs.paginationContainer, {
        totalItems: dataFetch.totalPages * 19,
        itemsPerPage: 19,
        visiblePages:  5,
        centerAlign: true,
      });
      instance.on('beforeMove', (event) => {
        dataFetch.page = event.page;
        dataFetch.fetchTopFilms().then(films => {
          Refs.galleryRef.innerHTML = '';
          renderFilmsCard(films.results)})
      })
      })
}
// ====================open selected film==========================
Refs.galleryRef.addEventListener('click', openfilm);

function openfilm(e) {
  if(e.target.nodeName === 'UL' || e.target.nodeName === 'LI'){return}
  DataFetch.moveID = e.target.parentNode.dataset.id
    Refs.productCardInWindow.innerHTML = '';
    DataFetch.fetchFilmByID().then(film =>{
      createFilmCard(film)})
    Refs.backDrop.classList.toggle('is-hidden')
    // ============close modal
    onClickButtonModalClose()
    onClickBackdropModalClose()
    onPressEscapeModalClose()
  }
  function createFilmCard(film){
    const  {original_title , title, poster_path ,vote_average,vote_count,popularity,genres,overview} = film
    let filmGenry = genres[0].name;
    let rounded = Math.round(popularity * 10) / 10
    Refs.productCardInWindow.insertAdjacentHTML('afterbegin',filmCard({original_title , title, poster_path ,vote_average,vote_count,rounded,filmGenry,overview}),)
  }
  function onPressEscapeModalClose(){
    document.addEventListener("keydown", e => {
      if(e.key === "Escape"){
        Refs.backDrop.classList.add('is-hidden')
      }
    })
  }
  function onClickBackdropModalClose(){
    Refs.backDrop.addEventListener('click', e => {
      if(e.target !== e.currentTarget){return}
      Refs.backDrop.classList.add('is-hidden')
    })
  }
  function onClickButtonModalClose(){
    Refs.modalButtonClose.addEventListener('click', e => Refs.backDrop.classList.add('is-hidden'))
  }


  // function onPaginationPage (totalItems){
  //   console.log(totalItems)
  //   const instance = new Pagination(Refs.paginationContainer, {
  //     totalItems: totalItems,
  //     itemsPerPage: 19,
  //     visiblePages:  5,
  //     centerAlign: true,
  //   });

  //   instance.on('beforeMove', (event) => {
  //     dataFetch.fetchTopFilms().then(films => {
  //       Refs.galleryRef.innerHTML = '';
  //       renderFilmsCard(films.results)})
  //   });
  // }

  // onPaginationPage(1000)