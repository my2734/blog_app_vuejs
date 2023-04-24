<template>
  <div class="">
    <header-app></header-app>
    <div class="blog-entries">
      <div class="container">
       <router-view></router-view>
        <side-bar-app></side-bar-app>
      </div>
    </div>

    <footer-app></footer-app>


   
    <modal-app />
    <modal-real-app />
  </div>
</template>
<script>
import HeaderApp from "../components/Header.vue";
import FooterApp from "../components/Footer.vue";
import SideBarApp from '../components/SideBar.vue';
import ModalApp from '../components/Modal.vue'
import ModalRealApp from '../components/ModalReal.vue'
export default {
  name: "MainLayout",
  components: {
    HeaderApp,
    FooterApp,
    SideBarApp,
    ModalApp,
    ModalRealApp 
  },
  methods: {
    handleModal(){
      this.$store.state.statusModal = !this.$store.state.statusModal;
      this.$store.state.statusOverly = false;      
    }
  },
  compoted:{
    isBlack(){
      return this.$store.state.statusBackground;
    }
  }
};
</script>
  
<style scoped>
.addStylePuppop{
  background-color: rgba(0,0,0,0.6);

}

</style>
  