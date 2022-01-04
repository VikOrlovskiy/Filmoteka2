import Refs from "./Refs";
//============= modal close =================
function onModalClose(){
  onClickButtonModalClose()
  onClickBackdropModalClose()
  onPressEscapeModalClose()
}
// ============ close madal by esc tab btn ==
function onPressEscapeModalClose(){
    document.addEventListener("keydown", e => {
      if(e.key !== "Escape"){return}
      Refs.backDrop.classList.add('is-hidden')
      Refs.body.classList.remove("modal-open")
    })
  }
  // ======== close madal by backdrop click ==
  function onClickBackdropModalClose(){
    Refs.backDrop.addEventListener('click', e => {
      if(e.target !== e.currentTarget){return}
      Refs.backDrop.classList.add('is-hidden')
      Refs.body.classList.remove("modal-open")
    })
  }
    // ====== close madal by close btn click ==
  function onClickButtonModalClose(){
    Refs.modalButtonClose.addEventListener('click', e => {
    Refs.body.classList.remove("modal-open")
    Refs.backDrop.classList.add('is-hidden')})
  }


  export{onModalClose}