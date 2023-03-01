<template>
    <div class="">
      <div class="col-md-9">
        <div class="blog-posts">
          <div class="row">
            <div class="col cover-list-dashboard">
              <ul class="navbar-nav list-dashboard">
                <li class="nav-item d-none d-sm-inline-block list-dashboard-item">
                  <router-link
                    :to="{ name: 'postblog' }"
                    href="../../index3.html"
                    class="nav-link"
                    >Write Blog</router-link
                  >
                </li>
                <li class="nav-item d-none d-sm-inline-block list-dashboard-item">
                  <router-link :to="{ name: 'listpost' }" class="nav-link"
                    >List Blog</router-link
                  >
                </li>
                <li class="nav-item d-none d-sm-inline-block list-dashboard-item">
                  <router-link :to="{ name: 'postcategory' }" class="nav-link"
                    >Category</router-link
                  >
                </li>
                <li class="nav-item d-none d-sm-inline-block list-dashboard-item">
                  <router-link
                    :to="{ name: 'posttags' }"
                    href="#"
                    class="nav-link"
                    >Tags</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <ol
              class="breadcrumb float-sm-right"
              :class="{ backgroundBlack: isBlack, backgroundWhite: !isBlack }"
            >
              <li class="breadcrumb-item active">
                <a href="#" class="custom-tag-link">Home</a>
              </li>
              <li class="breadcrumb-item active">Update Blog</li>
            </ol>
          </div>
  
          <div class="row"></div>
          <div class="row">
            <div class="col-md-12">
              <label for="" class="col-sm-2 col-form-label">Title:</label>
              <div class="col-sm-10">
                <fieldset>
                  <input
                    v-model="blog.name"
                    type="text"
                    class="form-control custom-input"
                    placeholder="Your name12343.."
                    v-on:keyup="error.name = false"
                  />
                </fieldset>
                <div style="margin-bottom: 10px">
                  <transition name="slide-fade">
                    <span v-show="error.name" class="text-danger"
                      >*Vui lòng nhập nội dung Tags*</span
                    >
                  </transition>
                </div>
              </div>
            </div>
            <div class="col-md-12" style="">
              <label for="" class="col-sm-2 col-form-label">Danh mục:</label>
              <div class="col-sm-10">
                <div
                  v-for="category_item in list_category"
                  :key="category_item._id"
                  class="form-check"
                >
                  <input
                    v-model="blog.categories"
                    :value="category_item.name"
                    type="checkbox"
                    class="form-check-input"
                    :id="category_item._id"
                  />
                  <label
                    style="margin-left: 10px"
                    class="form-check-label"
                    :for="category_item._id"
                  >
                    {{ category_item.name }}</label
                  >
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <label for="" class="col-sm-2 col-form-label">Author:</label>
              <div class="col-sm-10">
                <fieldset>
                  <input
                    v-model="blog.author"
                    v-on:keyup="error.author = false"
                    type="text"
                    class="form-control custom-input"
                    placeholder="Your name..."
                  />
                </fieldset>
                <div style="margin-bottom: 10px">
                  <transition name="slide-fade">
                    <span v-show="error.author" class="text-danger"
                      >*Vui lòng nhập nội dung Tags*</span
                    >
                  </transition>
                </div>
              </div>
            </div>
  
            <div class="col-md-12" style="">
              <label for="" class="col-sm-2 col-form-label">Tags:</label>
              <div class="col-sm-10">
                <div
                  v-for="tags_item in list_tags"
                  :key="tags_item._id"
                  class="form-check"
                >
                  <input
                    v-model="blog.tags"
                    :value="tags_item.name"
                    type="checkbox"
                    class="form-check-input"
                    :id="tags_item._id"
                  />
                  <label
                    style="margin-left: 10px"
                    class="form-check-label"
                    for="exampleCheck1"
                  >
                    {{ tags_item.name }}</label
                  >
                </div>
              </div>
            </div>
            <div class="col-md-12" style="">
              <label for="" class="col-sm-2 col-form-label">Image:</label>
              <div class="col-sm-10">
                <div class="custom-file">
                  <input
                    type="file"
                    @change="uploadFile"
                    ref="file"
                    class="custom-file-input"
                  />
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px">
                  <transition name="slide-fade">
                    <span v-show="error.image" class="text-danger"
                      >*Vui lòng nhập nội dung Tags*</span
                    >
                  </transition>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <label for="" class="col-sm-2">Content</label>
              <div class="col-sm-10">
                <fieldset>
                  <textarea
                    v-model="blog.content"
                    @keyup="error.content = false"
                    rows="6"
                    class="form-control custom-input"
                    placeholder="Your message..."
                  ></textarea>
                </fieldset>
                <transition name="slide-fade">
                  <span v-show="error.content" class="text-danger"
                    >*Vui lòng nhập nội dung Tags*</span
                  >
                </transition>
              </div>
            </div>
            <div class="col-md-12" style="margin-bottom: 10px">
              <div class="col-sm-2"></div>
              <div class="col-sm-10 text-center">
                <button
                  @click="handleSumitBlog()"
                  class="btn-login"
                  :class="{ addBtnLogin: !isBlack }"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    <script>
  import axios from "axios";
  export default {
    name: "UpdatePost",
    data() {
      return {
        isError: false,
        error: {
          name: false,
          author: false,
          image: false,
          content: false,
        },
        blog: {
          name: "",
          categories: [],
          author: "",
          tags: [],
          image: "",
          content: "",
        },
        list_tags: [],
        list_category: [],
      };
    },
    computed: {
      isBlack() {
        return this.$store.state.statusBackground;
      },
    },
    methods: {
      validate() {
        //name
        if (!this.blog.name) {
          this.isError = true;
          this.error.name = true;
        }
  
        //author
        if (!this.blog.author) {
          this.error.author = true;
          this.isError = true;
        }
        //content
        if (!this.blog.content) {
          this.error.content = true;
          this.isError = true;
        }
        //image
        if (!this.blog.image.name) {
          this.error.image = true;
          this.isError = true;
        }
      },
      handleSumitBlog() {
        var data = {
          name: this.blog.name,
          content: this.blog.content,
          image: "",
          author: this.blog.author,
          categories: this.blog.categories,
          tags: this.blog.tags,
        };
  
        this.validate();
  
        if (!this.isError) {
          axios
            .post(
              "http://localhost:8080/api/upload",
              { file: this.blog.image },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((response) => {
              if (response.status == 200) {
                data.image = this.blog.image.name;
  
                axios
                  .post("http://localhost:8080/api/post", data)
                  .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {
                      this.blog.name = "";
                      this.blog.content = "";
                      this.blog.image = "";
                      this.blog.categories = [];
                      this.blog.tags = [];
                      this.blog.author = "";
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("can not store blog");
        }
      },
      handleChangeCategory() {
        this.error.categories = false;
      },
      hanleChangetags() {
        this.error.tags = false;
      },
      uploadFile() {
        this.blog.image = this.$refs.file.files[0];
        // console.log(this.blog.image.name)
        this.error.image = false;
      },
    },
    mounted() {
      axios
        .get("http://localhost:8080/api/category")
        .then((response) => {
          if (response.status == 200) {
            this.list_category = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
  
      axios
        .get("http://localhost:8080/api/tags")
        .then((response) => {
          this.list_tags = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  
        const idPost = this.$route.params.id;
        // console.log('http://localhost:8080/api/post/'+idPost);
        axios.get('http://localhost:8080/api/post/'+idPost)
        .then(response=>{
            if(response.status == 200){
                this.blog.name = response.data.name;
                this.blog.author = response.data.author;
                this.blog.content = response.data.content;
                this.blog.categories = response.data.categories;
                this.blog.tags = response.data.tags;
                this.blog.image = response.data.image;
            }
        }).catch(error => {
            console.log(error)
        })
    },
  };
  </script>
      
  <style scoped>
  .custom-input {
    margin-bottom: 20px;
    font-size: 15px;
    font-weight: 300;
    line-height: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 1px solid #9b9999;
    background: rgba(250, 250, 250, 0.9);
  }
  
  .col-form-label {
    margin-top: 10px;
  }
  
  .addBtnLogin {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
  
  .backgroundBlack {
    background-color: #232323;
    color: #fff;
  }
  
  .backgroundWhite {
    background-color: #fff;
    color: #000;
  }
  
  .custom-tag-link {
    text-decoration: none;
  }
  
  .cover-list-dashboard {
    display: flex;
    justify-content: end;
    margin-right: 30px;
  }
  .list-dashboard {
    list-style: none;
    margin: 0px;
    margin-bottom: 20px;
    padding: 0;
  }
  
  .list-dashboard-item {
    margin-right: 20px;
    text-decoration: none;
  }
  .list-dashboard-item a {
    text-decoration: none;
  }
  
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  </style>