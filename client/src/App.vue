<template>
  <div id="app" :class="{ backgroundBlack: isBlack, backgroundWhite: !isBlack}">
    <router-view />
  </div>
</template>

<script>
export default{ 
 computed:{
  isBlack(){
    return this.$store.state.statusBackground;
  }
 }
}
</script>

<style scoped>
  .backgroundBlack{
    background-color: #232323;
    color: #fff;
  }

  .backgroundWhite{
    background-color: #fff;
    color: #000;
  } 

  
.blog-entries .page-number li.active a {
  color: #232323 !important;
  /* background-color: #fff; */
}
.blog-entries .page-number li a {
  font-size: 18px;
  /* color: #fff; */
  /* color: #333; */
  text-decoration: none !important;
  width: 50px !important;
  height: 50px !important;
  display: inline-block !important;
  line-height: 50px !important;
  text-align: center !important;
  background-color: #414141 !important;
  transition: all 0.5s !important;
}
</style>
