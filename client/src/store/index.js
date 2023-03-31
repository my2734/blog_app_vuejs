import axios from 'axios'
 
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  var isAdmin = false;
  var isAuthentication = false;
  const token = getCookie('token');
  if(token) isAuthentication = true;
  axios.get('http://localhost:8080/api/isAdmin/'+token)
  .then((response) => {
      if(response.status==200){
        if(response.data == false){
          isAdmin = true
        }else{
          isAdmin = false
        }
      }
    })
  .catch(() => {
      return false;
  });




  import Vuex from 'vuex'
  var store = new Vuex.Store({
    state () {
        return {
          statusOverly: false,
          statusModal: false,
          statusBackground: true,
          isAdmin: isAdmin,
          auth: {
            isAuthentication: isAuthentication,
          },
          list_post: [],
        }
      },
      mutations: {
        TOGGLE_AUTH(state){
          state.auth.isAuthentication = !state.auth.isAuthentication
        },
        GET_LIST_POST(state){
          
        }
      },
      actions: {
        async getListPost({commit},page){
          await axios.get('')
        }
      }
  })
  
  export default store