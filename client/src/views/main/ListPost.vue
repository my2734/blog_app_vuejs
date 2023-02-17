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
                  >Add Category</router-link
                >
              </li>
              <li class="nav-item d-none d-sm-inline-block list-dashboard-item">
                <router-link
                  :to="{ name: 'posttags' }"
                  href="#"
                  class="nav-link"
                  >Add Tags</router-link
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
            <li class="breadcrumb-item active">List Blog</li>
          </ol>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Bordered Table</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Content</th>
                      <th>Category</th>
                      <th>Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(post_item,index) in list_post" :key="post_item._id">
                      <td>{{ (index+1) }}.</td>
                      <td>{{ post_item.name }}</td>
                      <td>
                        <img
                          style="width: 120px"
                          :src="'http://localhost:8080/images/'+post_item.image"
                          alt=""
                        />
                      </td>
                      <td>
                        <p class="text">{{ post_item.content }}</p>
                      </td>
                      <td style="width: 120px">
                        <span v-for="category in post_item.categories" :key="category" class="badge badge-secondary" style="margin-right: 5px">{{ category }}</span>
                       
                      </td>
                      
                      <td>
                        <button class="btn btn-warning">
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <button class="btn btn-danger">
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer clearfix">
                <ul class="pagination pagination-sm m-0 float-right">
                  <li class="page-item"><a class="page-link" href="#">«</a></li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" href="#">»</a></li>
                </ul>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ListPost",
  data(){
    return{
      list_post : []
    }
  },
  computed: {
    isBlack() {
      return this.$store.state.statusBackground;
    },
  },
  mounted(){
    axios.get('http://localhost:8080/api/post')
    .then(response=>{
      this.list_post = response.data;
    })
    .catch(error=>{
      console.log(error)
    })
  }
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
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>