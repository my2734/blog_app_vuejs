<template>
  <div class="col-md-3">
    <div class="side-bar">
      <div class="search">
        <fieldset>
          <input
            name="search"
            type="text"
            class="form-control"
            id="search"
            placeholder="Search..."
            required=""
          />
        </fieldset>
      </div>
      <div class="archives">
        <div class="sidebar-heding">
          <h2>Archives</h2>
        </div>
        <ul>
          <li><a href="#">> 2018 September (4)</a></li>
          <li><a href="#">> 2018 August (16)</a></li>
          <li><a href="#">> 2018 July (5)</a></li>
          <li><a href="#">> 2018 May (3)</a></li>
          <li><a href="#">> 2018 February (27)</a></li>
          <li><a href="#">> 2017 December (18)</a></li>
          <li><a href="#">> 2017 November (12)</a></li>
        </ul>
      </div>
      <div class="recent-posts">
        <div class="sidebar-heding">
          <h2>Recent Posts</h2>
        </div>
        <ul>
          <li v-for="blog in list_limit_blog3" :key="blog._id">
            <a @click="handlerClickDetailPage(blog._id)" class="blog_current">
              <div class="image_current">
                <img
                  class=""
                  :src="'http://localhost:8080/images/' + blog.image"
                  alt="Recent Post 1"
                />
              </div>
              <div class="text">
                <h6>{{ blog.name }}</h6>
                <span>{{ blog.createdAt }}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="categories">
        <div class="sidebar-heding">
          <h2>Categories</h2>
        </div>
        <ul>
          <li v-for="category_item in list_category" :key="category_item.name">
            <a href="#"
              >> {{ category_item.name }} ({{ category_item.quantity }})</a
            >
          </li>
        </ul>
      </div>
      <div class="latest-gallery">
        <div class="sidebar-heding">
          <h2>Latest Gallery</h2>
        </div>
        <ul>
          <li v-for="blog in list_limit_blog8" :key="blog._id">
            <a href="#">
              <img :src="'http://localhost:8080/images/' + blog.image" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "SideBarApp",
  data() {
    return {
      list_blog: [],
      list_category: [],
      list_limit_blog3: [],
      list_limit_blog8: [],
    };
  },
  methods:{
    handlerClickDetailPage(id){
      this.$router.push({ name: 'blogdetail', params: { id: id } })
    }
  },
  mounted() {
    const getListBlog = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/post");
        this.list_blog = await response.data;
      } catch (error) {
        console.log(error);
      }
    };
    getListBlog();
    const getCategory = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/category");
        this.list_category = await response.data;
        for (var index in this.list_category) {
          this.list_category[index].quantity = 0;
          for (var index_blog in this.list_blog) {
            if (
              this.list_blog[index_blog].categories.includes(
                this.list_category[index].name
              )
            ) {
              this.list_category[index].quantity++;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();

    const getListBlogLimit3 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/post/limit/3"
        );
        this.list_limit_blog3 = response.data;
      } catch (error) {
        console.log(error);
      }
    };
    getListBlogLimit3();

    const getListBlogLimit8 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/post/limit/8"
        );
        this.list_limit_blog8 = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    getListBlogLimit8();
  },
};
</script>

<style scoped>
.blog_current {
  display: flex;
}

.image_current img {
  width: 80px;
  max-height: 50px;
}
.text {
  margin-left: 20px;
}

.text h6 {
}

.text span {
  font-size: 12px;
}
</style>