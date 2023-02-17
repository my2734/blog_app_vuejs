<template>
  <div>
    <section class="overlay-menu" :class="{ open: status, backgroundBlack: isBlack, backgroundWhite: !isBlack}">
      <div class="container">
        <div class="row">
          <div class="main-menu">
            <ul>
              <li>
                <a href="index.html">Home - Full-width</a>
              </li>
              <li>
                <a href="masonry.html">Home - Masonry</a>
              </li>
              <li>
                <a href="grid.html">Home - Small-width</a>
              </li>
              <li>
                <a href="about.html">About Us</a>
              </li>
              <li>
                <router-link :to="{name: 'postblog'}">Post BLog</router-link>
              </li>
              <li class="btn-login" :class="{ addBtnLogin: !isBlack}">
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
export default {
  name: "ModalApp",
  computed: {
    status(){
      return this.$store.state.statusOverly;
    },
    isBlack(){
    return this.$store.state.statusBackground;
  }
  },
  methods: {
    handleChangeBackground(){
      this.$store.state.statusBackground = !this.$store.state.statusBackground;
      // console.log(this.$store.state.statusBackground)
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

</style>