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
                  <a style="cusor: pointer" @click="handlerClickBlogDetail(post_item._id)"
                    >continue reading</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <ul class="page-number">
              <li class="active"><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import axios from "axios";
import "vue-router";
export default {
  name: "HomeApp",
  data() {
    return {
      list_post: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/post")
      .then((response) => {
        this.list_post = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handlerClickBlogDetail(id) {
      this.$router.push({ name: "blogdetail" , params: { id: id } });
    },
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