<template>
   <div class="">
    <nav>
        <div class="logo">
            <a style="cursor:pointer" @click="handlerClickLogo($event)">Trav<em>el</em> Blog</a>
            
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
import { mapActions } from 'vuex';
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
        },
        handlerClickLogo(e){
            e.preventDefault()
            this.getListPost(1)
            this.get_length_all_blog()
            this.$router.push({name: 'home'})
        },
        ...mapActions(['getListPost','get_length_all_blog'])
    }
}
</script>

<style scoped>


</style>