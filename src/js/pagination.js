import Refs from "./Refs";
import DataFetch from "./apiServiceSearch";
// const dataFetch  = new DataFetch
// ==================import HBS==============================
import filmsGalery from '../templates/films.hbs';
// =========================================================================
  Refs.paginationList.addEventListener('click', e =>{
let firstPage = 1;
let totalPages = 100;
let correctPage = 1;
    onClickChengeFilmsPage(e,totalPages,correctPage)
  Refs.firstPagePagination.textContent = firstPage
  Refs.prevPageNumber.textContent = correctPage - 1
  Refs.nextPageNumber.textContent = correctPage + 1
  Refs.lastPagePagination.textContent = totalPages
  Refs.activePaginationPage.textContent = correctPage
  }) 

function onClickChengeFilmsPage(e,totalPages,correctPage){

  // totalPages 
  // correctPage 
console.log(totalPages,correctPage)
  // ===============close gate======================
    if(e.target.classList.contains("pagination_list") || e.target.classList.contains("dots")){
  return
    }
  // ===============prev page button======================
  if(e.target.dataset.action === 'prewPage'){
    if(correctPage < 1){return}
   return correctPage -= 1;
  }
  // ===============first page button======================
  else if(e.target.dataset.action === 'reset'){ 
  return  correctPage = 1;
    // DataFetch.pageReset()
  }
  // ===============last page button======================
  else if(e.target.dataset.action === 'last-page'){ 
   return correctPage = DataFetch.totalPages
  }
  // ===============next page button======================
  else if(e.target.dataset.action === 'nextPage'){ 
   return correctPage += 1;
    // DataFetch.nextPage()
  }
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