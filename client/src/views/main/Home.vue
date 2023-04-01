<template>
  <div class="">
    <div class="col-md-9">
      <div class="blog-posts">
        <div class="row">
          <div
            class="col-md-12"
            v-for="post_item in list_post"
            :key="post_item._id"
          >
            <div class="blog-post">
              <img
                :src="'http://localhost:8080/images/' + post_item.image"
                alt=""
              />
              <div class="text-content">
                <span
                  ><a href="#">{{ post_item.author }}</a> /
                  <a href="#">{{ post_item.createdAt }}</a> /
                  <a href="#">{{ post_item.categories[0] }}</a></span
                >
                <h2>{{ post_item.name }}</h2>
                <p class="text">
                  {{ post_item.content }}
                </p>
                <div class="simple-btn">
                  <a style="cursor: pointer" @click="handlerClickBlogDetail(post_item._id)"
                    >continue reading</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <ul class="page-number">
              <li v-for="item in length_page" :key="item"><a @click="handlerClickPagination(item)">{{ (item) }}</a></li>
              <!-- <li><a href="#">></a></li> -->
            </ul>
          </div>
          <!-- <div class="col-md-12">
            <ul class="page-number">
              <li class="active"><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">></a></li>
            </ul>
          </div>
          <h1>{{ length_blog }}</h1> -->
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import axios from "axios";
import "vue-router";
import { mapActions } from "vuex";
export default {
  name: "HomeApp",
  data() {
    return {
      // list_post: [],
    };
  },
 computed: {
  list_post(){
    return this.$store.state.list_post;
  },
  // length_all_blog(){
  //   return this.$store.state.length_all_blog
  // },
  length_page(){
    const quantity_blog =  this.$store.state.length_all_blog
    return Math.ceil(quantity_blog/2)
  }
 },
  created(){
    this.getListPost(1)
    this.get_length_all_blog()
  },
  mounted() {
  },
  updated(){
    const categoryId =  this.$route.params.id;
    if(categoryId){
      this.list_post = []
      axios
      .get("http://localhost:8080/api/post?page=2")
      .then((response) => {
        this.list_post = response.data;
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  },
  methods: {
    handlerClickBlogDetail(id) {
      this.$router.push({ name: "blogdetail" , params: { id: id } });
    },
    handlerClickPagination(page){
      this.getListPost(page)
    },  
    ...mapActions(['getListPost','get_length_all_blog'])
  },
};
</script>
    
<style scoped>
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>