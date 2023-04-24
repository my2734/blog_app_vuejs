import axios from 'axios'




  import Vuex from 'vuex'
  var store = new Vuex.Store({
    state () {
        return {
          statusOverly: false,
          statusModal: false,
          statusBackground: true,
          isAdmin: false,
          auth: {
            isAuthentication: false,
            username: "",
          },
          list_post: [],
          length_all_blog: 0, 
          category: {
            status: false,
            category:""
          }
        }
      },
      getters: {
        
      },
      mutations: {
        TOGGLE_AUTH(state){
          state.auth.isAuthentication = !state.auth.isAuthentication
        },
        UPDATE_AUTH(state, isAuth){
          state.auth.isAuthentication = isAuth
        },
        UPDATE_AUTH_USERNAME(state, name){
          state.auth.username = name
        },
        UPDATE_ADMIN(state, isAdmin){
          state.isAdmin = isAdmin
        },
        GET_LIST_POST(state, data){
          state.list_post = data.list_post
          state.length_all_blog = data.length
          state.category.status = true
          state.category.category = data.category
        },
        GET_LIST_POST_PAGE(state, list_post){
          state.list_post = list_post
        },
        GET_AUTH_LOGIN(state,result){
          state.auth.isAuthentication = result
        },
        GET_LENGTH_ALL_BLOG(state,length){
          state.length_all_blog = length
        }
      },
      actions: {
        async getAllPost({commit}){
          try{
            let response = await axios.get('http://localhost:8080/api/post')
            response.data.category =  ""
            commit('GET_LIST_POST',response.data)
          }catch(error){
            console.log(error)
          }
        },  
        async getListPost({commit},page){
          try{
            let response = await axios.get('http://localhost:8080/api/post?page='+page)
            response.data.category =  ""
            commit('GET_LIST_POST_PAGE',response.data)
          }catch(error){
            console.log(error)
          }
        },
        async getListPostBySearch({commit},searchKey){
          try{
            let response = await axios.get('http://localhost:8080/api/post?searchKey='+searchKey)
            response.data.category =  ""
            commit('GET_LIST_POST_PAGE',response.data)
          }catch(error){
            console.log(error)
          }
        },
        async getListPostCategory({commit}, category){
          try{
            let response = await axios.get('http://localhost:8080/api/post?category='+category+'&page=1')
            response.data.category =  category
            commit('GET_LIST_POST',response.data)
          }catch(error){
            console.log(error)
          }
        },
        async getAuthLogin(){

        },
        async get_length_all_blog({commit}){
          try{
            const response = await axios.get('http://localhost:8080/api/post')
            const length = response.data.length

            commit('GET_LENGTH_ALL_BLOG',length)
          }catch(error){
            console.log(error)
          }
        }
      }
  })
  
  export default store