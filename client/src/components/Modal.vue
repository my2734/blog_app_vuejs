<template>
  <div>
    <section class="overlay-menu" :class="{ open: status, backgroundBlack: isBlack, backgroundWhite: !isBlack}">
      <div class="container">
        <div class="row">
          <div class="main-menu">
            <ul>
              <li>
                <a @click="handlerClickHome($event)">Home</a>
              </li>
              <li>
                <a @click="handlerClickAbout($event)">About Us</a>
              </li>
              
              <li v-if="isAdmnin">
                <a style="cursor: pointer" @click="handleClickAdmin()">Admin</a>
              </li>

              <li v-if="auth.isAuthentication" class="btn-login" :class="{ addBtnLogin: !isBlack}">
                <a @click="handlerLogout($event)">Logout</a>
                
              </li>
              <li v-else class="btn-login" :class="{ addBtnLogin: !isBlack}">
                <router-link :to="{name:'login'}">Login</router-link>
              </li>
              <li >
                <label class="switch">
                  <input type="checkbox" @click="handleChangeBackground()">
                  <span class="slider round"></span>
                </label>
                
              </li>
            </ul>
            <p>We create awesome templates for you</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from '@/store'
import 'vue-router'
import { mapState } from 'vuex';
// import axios from 'axios';
export default {
  name: "ModalApp",
  data(){
    
  },
  computed: {
    status(){
      return this.$store.state.statusOverly;
    },
    isBlack(){
    return this.$store.state.statusBackground;
    },
    isAdmnin(){
      return  store.state.isAdmin
    },
    ...mapState(['auth'])
    
  },
  methods: {
    handleChangeBackground(){
      this.$store.state.statusBackground = !this.$store.state.statusBackground;
      // console.log(this.$store.state.statusBackground)
    },
    handleClickAdmin(){
      this.$store.state.statusOverly = false;
      if(this.$store.state.auth.isAuthentication == true){
        this.$router.push({ name: 'postblog' })    
      }else{
        this.$router.push({ name: 'login' })    

      }
    },
    handlerLogout(e){
      e.preventDefault();
      // //delete Token 
      this.deleteCookie('token')
      // //isAuthentication = false
      store.commit('UPDATE_ADMIN',false)
      store.commit('UPDATE_AUTH',false)

      //isAdmin =  false
      //login
      this.$router.push({name: 'login'})
    },
    deleteCookie(name) {
      document.cookie = name + '=;expires=' + new Date(1970, 0, 1).toUTCString() + ';path=/'
    },
    handlerClickHome(e){
      e.preventDefault();
      this.$router.push({name: "home"});
      this.$store.state.statusOverly = false;
      this.$store.state.statusModal = false;
    },
    handlerClickAbout(e){
      e.preventDefault();
      this.$router.push({name: "about"});
      this.$store.state.statusOverly = false;
      this.$store.state.statusModal = false;
    }
  }
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.backgroundBlack{
  background-color: #232323;
  color: #fff;
}

.backgroundWhite{
  background-color: #fff;
  color: #000;
} 

.addBtnLogin{
  background-color: rgba(0,0,0,0.5);
  color: #fff;
}

.main-menu a{
  cursor: pointer;
}

</style>