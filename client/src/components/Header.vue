<template>
   <div class="">
    <nav>
        <div class="logo">
            <a href="index.html">Gala<em>xy</em> </a>
            
        </div>
        
        <div class="menu-icon" v-bind:class="{ active: isActive}" @click="handleButtonMenu" >
            <span></span>
        </div>
    </nav>

    <div class="page-heading">
        <div class="container">
            <div class="heading-content">
                <h1>Travel <em>Blog</em></h1>
            </div>
        </div>
    </div>
   </div>
</template>

<script>
export default{
    name: "HeaderApp",
    data(){
        return {
            isActive: false,
            status: ""
        }
    }, 
    methods: {
        handleButtonMenu(){
            this.isActive = !this.isActive;
            this.$store.state.statusOverly = this.isActive;
            
        }
    }
}
</script>

<style scoped>


</style>