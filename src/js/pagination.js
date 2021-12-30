import Refs from "./Refs";
import DataFetch from "./apiServiceSearch";
// const dataFetch  = new DataFetch
// ==================import HBS==============================
import filmsGalery from '../templates/films.hbs';

// =========================================================================
Refs.paginationList.addEventListener('click', e =>{
      // dataFetch.fetchTopFilms().then(films => {
      //   Refs.galleryRef.innerHTML = '';
      //   filmsGalery(films.results)})
      onClickChengeFilmsPage(e)
    // filmsApiService.fetchFilms().then(films => {
    //   Refs.galleryRef.innerHTML = '';
    //   createfilmsCard(films.results)});
    //   onClickChengeFilmsPage(e)}) 
})
function onClickChengeFilmsPage(e){
  let firstPage = 1;
  let totalPages = 999;
  let correctPage = 1;
    // ===============close gate======================
      if(e.target.classList.contains("pagination_list") || e.target.classList.contains("dots")){
    return
      }
    // ===============prev page button======================
    if(e.target.dataset.action === 'prewPage'){
      if(correctPage < 1){return}
    }
    // ===============first page button======================
    else if(e.target.dataset.action === 'reset'){ 
      correctPage = firstPage
    }
    // ===============last page button======================
    else if(e.target.dataset.action === 'last-page'){ 
      correctPage =  totalPages
    }
    // ===============next page button======================
    else if(e.target.dataset.action === 'nextPage'){ 
    }
    Refs.firstPagePagination.textContent = firstPage
    Refs.prevPageNumber.textContent = correctPage - 1
    Refs.nextPageNumber.textContent = correctPage + 1
    Refs.lastPagePagination.textContent = totalPages
    Refs.activePaginationPage.textContent = correctPage
     }

    function onHidePaginationNextElements(){
      Refs.paginationListButtonNextPage.classList.add('is-hidden')
      Refs.nextPageNumber.classList.add('is-hidden')
      Refs.nextPageDots.classList.add('is-hidden')
      Refs.lastPagePagination.classList.add('is-hidden')
    }
    function onHidePaginationPrevElements(){
      Refs.paginationListButtonPrevPage.classList.add('is-hidden')
      Refs.prevPageNumber.classList.add('is-hidden')
      Refs.prevPageDots.classList.add('is-hidden')
      Refs.firstPagePagination.classList.add('is-hidden')
    }
    function onShowPaginationNextElements(){
      Refs.paginationListButtonNextPage.classList.remove('is-hidden')
      Refs.nextPageNumber.classList.remove('is-hidden')
      Refs.nextPageDots.classList.remove('is-hidden')
      Refs.lastPagePagination.classList.remove('is-hidden')
    }
    function onShowPaginationPrevElements(){
      Refs.paginationListButtonPrevPage.classList.remove('is-hidden')
      Refs.prevPageNumber.classList.remove('is-hidden')
      Refs.prevPageDots.classList.remove('is-hidden')
      Refs.firstPagePagination.classList.remove('is-hidden')
    }
export{onClickChengeFilmsPage }