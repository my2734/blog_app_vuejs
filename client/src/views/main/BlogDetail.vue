<template>

    <div>
        <div class="col-md-9">
            <div class="blog-posts">
                <div class="row">
                    <div class="col-md-12">
                        <div class="single-blog-post">
                            <img :src="'http://localhost:8080/images/'+blogdetail.image" alt="">
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
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
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
        }
    },
   computed:{},
    mounted(){
        const id = this.$route.params.id;
        axios.get('http://localhost:8080/api/post/'+id)
        .then(response=>{
            this.blogdetail = response.data;
            console.log(this.blogdetail);
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

</script>

<style>
</style>