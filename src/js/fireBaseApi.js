const URL ='https://filmoteka-1591f-default-rtdb.europe-west1.firebasedatabase.app/user/'
const KEY_WATCHED ='Watched.json'
const KEY_queue ='queue.json'
// =================================================
import Refs from './Refs';
const axios = require('axios');
export default class UserData {
    static post (postFilm){
       return fetch(URL,{method:'POST',
        body:JSON.stringify({postFilm}),
        Headers:{'Content-Type' : 'application/json'},}).then(response => response.json()).then(response => console.log(response))
    }
constructor(){
}
async postUserFilm() {
    try {
      const  requst = await fetch(URL,`${this.options}`);
      const response = requst.json()
      return response
    } catch (error) {
      console.error(error);
    }
}
async fetchUserFilm() {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
}