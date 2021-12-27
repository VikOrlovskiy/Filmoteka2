import Refs from "./Refs";
// ==================first page load========================
window.addEventListener('load',onloadFetchTopfilms)
// ==================reload page ========================
Refs.backHomePage.addEventListener('click' , onClickReloadPage)
// ==================search by submit========================
Refs.searchForm.addEventListener('submit', onClickGetSerchValue )
// ==================navigation btn========================
Refs.navigationPanel.addEventListener('click', onClickChengePage)
// ==================library btn========================
Refs.userButtons.addEventListener('click', onClickShowWatchedAndQueue)
// =================functions================================
function onClickReloadPage(){location.reload()}
async function onloadFetchTopfilms(e){ 
    // let filmsGenry = await 
    // let TopFilms = await 
    console.log(e)}
function onClickGetSerchValue(e){
    e.preventDefault()
    if(this.search.value === ''){
    Refs.errorTextField.textContent = 'Search result not successful. Enter the correct movie name and ';
    return
    }
    let searchValue = this.search.value.trim();
    Refs.errorTextField.textContent = '';
    this.search.value ='';
}
function onClickChengePage(e){
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
    // Refs.galleryRef.innerHTML = '';
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