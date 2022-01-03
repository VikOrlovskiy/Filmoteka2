import Refs from "./Refs";

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
  export{onPressEscapeModalClose,onClickBackdropModalClose,onClickButtonModalClose}