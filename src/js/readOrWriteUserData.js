import { getDatabase, ref, set, child, get  } from "firebase/database";
const dbRef = ref(getDatabase());
const db = getDatabase();
// ========== read User Data to Firebase====================
function readUserDataByCategoryName(category,userId){
  readUserData(category,userId)
}
// ========== write User Data to Firebase====================
function writeUserDataByCategoryName(name,data,userId){
    console.log(userId)
    if(!userId){return}
  if(name === 'Watched'){
  return  writeWatchedData(userId,data)
  }
  console.log('no')
}
  function writeWatchedData(userId,data) {
    set(ref(db, `users//` + userId), {
      Watched:data,
    });
  }

// ========== read User Data to Firebase====================
function readUserData(category,userId){
  get(child(dbRef, `users/${userId}/${category}`)).then((data) => {
      console.log(userId)
      if (data.exists()) {
        console.log(data.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}
export{writeUserDataByCategoryName,readUserDataByCategoryName}