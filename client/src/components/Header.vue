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
import axios from 'axios'
import store from '@/store'
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
        ...mapActions(['getListPost','get_length_all_blog']),
        getCookie(cname) {
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
    },
    created(){
        const token = this.getCookie('token')
        if(token){
            axios.post('http://localhost:8080/api/verify',{token:token})
            .then(response=>{
                if(response.status == 200){
                    if(response.data.role == 0){
                        store.commit('UPDATE_ADMIN',true)
                    }
                    store.commit('UPDATE_AUTH',true)
                    store.commit('UPDATE_AUTH_USERNAME',response.data.username)
                }
            })
            .catch(()=>{
                console.log('Loi verify user')
            })
        }

       
    }
}
</script>

<style scoped>


</style>