<template>

    <div>
        <div class="col-md-9">
            <div class="blog-posts">
                <div class="row">
                    <div class="col-md-12">
                        <div class="single-blog-post">
                            <img v-if="blogdetail.image" :src="'http://localhost:8080/images/'+blogdetail.image" alt="">
                            <div class="text-content">
                                <h2>{{ blogdetail.name }}</h2>
                                <span>
                                    <a href="#">{{ blogdetail.author }}</a> / <a href="#">{{ blogdetail.createdAt }}</a> 
                                    <a v-if="blogdetail.categories[0]" href="#"> / {{ blogdetail.categories[0] }}</a>
                                </span>
                                <p>{{ blogdetail.content }}</p>
                                <div class="tags-share">
                                    <div class="row">
                                        <div v-if="blogdetail.tags.length>0" class="col-md-6">
                                            <ul class="tags">
                                                <li>Tags:</li>
                                                <li v-for="tags in blogdetail.tags" :key="tags"><a href="#">{{ tags }}</a>,</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-6">
                                            <ul class="share">
                                                <li>Share:</li>
                                                <li><a href="#">facebook</a>,</li>
                                                <li><a href="#">twitter</a>,</li>
                                                <li><a href="#">behance</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div v-if="status_login" class="search">
                            <fieldset>
                                <input class="form-control" v-model="content_comment" placeholder="Comment" required="">
                            </fieldset>
                            <span v-if="info_updata.status_update" @click="handlerUpdateComment()" class="btn-login" style="margin-top: 20px;">Update</span>
                            <span v-else @click="handlerComment()" class="btn-login" style="margin-top: 20px;">Submit</span>
                        </div>
                        <h2>Comments</h2>
                        <div v-for="comment in blogdetail.comment" :key="comment._id" style="margin-bottom: 20xp!important;"  class="text-justify darker mt-4 float-right">
                            <h4>{{ comment.username }}</h4> 
                            <span v-if="status_login && comment.username == currentUsername">
                                <span @click="handlerClickUpdate(comment._id, comment.content)" style="margin-left: 500px; margin-right: 10px;cursor:pointer">Edit</span><span @click="handlerCliCkDeleteComment(comment._id)" style="cursor:pointer">Delete</span>
                            </span>
                            <br>
                            <p>{{ comment.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import store from '@/store'
export default{
    name: 'BlogDetailApp',
    data(){
        return {
            blogdetail: {
                name: "",
                categories: [],
                author: "",
                tags: [],
                image: "",
                content:"",
            },
            content_comment:"",
            info_updata: {
                status_update: false,
                id_comment: ""
            }
           
        }
    },
   computed:{
    currentUsername(){
        return store.state.auth.username
    },
    status_login(){
        return store.state.auth.isAuthentication
    }
   },
   methods: {
    handlerComment(){
        const data = {
            username: store.state.auth.username,
            content: this.content_comment
        }
        const id = this.$route.params.id;
        axios.post('http://localhost:8080/api/post/comment/'+id, data)
            .then(response=>{
                if(response.status == 200){
                    this.content_comment = ""
                }
            })
            .catch(error=>{
                console.log(error)
            })
    },
    handlerCliCkDeleteComment(id){
        const id_blog = this.$route.params.id;
        const id_comment = id
        // console.log(id_blog,data)
        axios.delete('http://localhost:8080/api/post/comment/'+id_blog+'?id_comment='+id_comment)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>{
                console.log(error)
            })
    },
    handlerClickUpdate(id,content){
       this.info_updata.status_update = true
       this.info_updata.id_comment = id
      
       this.content_comment = content
    },
    handlerUpdateComment(){
        const id_blog = this.$route.params.id;
        const id_comment = this.info_updata.id_comment
        const data = {
            id: id_comment,
            content: this.content_comment
        }
        console.log(id_blog, id_comment)
        axios.put('http://localhost:8080/api/post/comment/'+id_blog,data)
            .then(response=>{
               if(response.status == 200){
                this.content_comment = ""
               }
            })
            .catch(error=>{
                console.log(error)
            })
    }
   },
   created(){
        const id = this.$route.params.id;
        axios.get('http://localhost:8080/api/post/'+id)
        .then(response=>{
            this.blogdetail = response.data;
            console.log(this.blogdetail)
        })
        .catch(error=>{
            console.log(error)
        })
   },
    mounted(){
       
    },
    updated(){
        const id = this.$route.params.id;
        axios.get('http://localhost:8080/api/post/'+id)
        .then(response=>{
            this.blogdetail = response.data;
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

</script>

<style scoped>
.navbar-nav{
    width: 100%;
}

@media(min-width:568px){
    .end{
        margin-left: auto;
    }
}

@media(max-width:768px){
    #post{
        width: 100%;
    }
}
#clicked{
    padding-top: 1px;
    padding-bottom: 1px;
    text-align: center;
    width: 100%;
    background-color: #ecb21f;
    border-color: white;
    border-width: 1px;
    border-style: solid;
    border-radius: 13px; 
}

#profile{
    background-color: unset;
    
} 

#post{
    margin: 10px;
    padding: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
    text-align: center;
    background-color: #ecb21f;
    border-color: white;
    color: black;
    border-width: 1px;
    border-style: solid;
    border-radius: 13px;
    width: 50%;
}

body{
    background-color: black;
}

#nav-items li a,#profile{
    text-decoration: none;
    color: rgb(224, 219, 219);
    background-color: black;
}


.comments{
    margin-top: 5%;
    margin-left: 20px;
}

.darker{
    border: 1px solid white;

    border-radius: 5px;
    padding-left: 40px;
    padding-right: 30px;
    padding-top: 10px;
    margin-bottom: 10px !important;
}

.comment{
    border: 1px solid rgba(16, 46, 46, 1);
    background-color: rgba(16, 46, 46, 0.973);
    float: left;
    border-radius: 5px;
    padding-left: 40px;
    padding-right: 30px;
    padding-top: 10px;
    
}
.comment h4,.comment span,.darker h4,.darker span{
    display: inline;
}

.comment p,.comment span,.darker p,.darker span{
    color: rgb(184, 183, 183);
}

h1,h4{
    color: white;
    font-weight: bold;
}
label{
    color: rgb(212, 208, 208);
}

#align-form{
    margin-top: 20px;
}
.form-group p a{
    color: white;
}

#checkbx{
    background-color: black;
}

#darker img{
    margin-right: 15px;
    position: static;
}

.form-group input,.form-group textarea{
    background-color: black;
    border: 1px solid rgba(16, 46, 46, 1);
    border-radius: 12px;
}

form{
    border: 1px solid rgba(16, 46, 46, 1);
    background-color: rgba(16, 46, 46, 0.973);
    border-radius: 5px;
    padding: 20px;
 }
</style>