import Refs from "./Refs";
// ==================library btn============================
Refs.userButtons.addEventListener('click', onClickShowWatchedAndQueue)
// ==================navigation btn=========================
Refs.navigationPanel.addEventListener('click', onClickChengeNavigationPage)
// ==================functions=========================
function onClickReloadPage(){location.reload()}

function onClickChengeNavigationPage(e){
    // close gate !btn
  if(e.target.nodeName !== 'BUTTON'){return}
  // active btn
  const activeBtn = document.querySelector('.navigation_button.active');
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
  Refs.galleryRef.innerHTML = '<li ><p>You need to register to accesse</p</li>';
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

