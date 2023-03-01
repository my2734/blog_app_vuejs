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
                <router-link
                  :to="{ name: 'postcategory' }"
                  href="#"
                  class="nav-link"
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
            <li class="breadcrumb-item active">Add Category</li>
          </ol>
        </div>

        <div v-if="!status_update" class="row">
          <div class="col-md-12">
            <label for="" class="col-sm-2 col-form-label">Name:</label>
            <div class="col-sm-10">
              <fieldset>
                <input
                  v-model="category_name"
                  type="text"
                  class="form-control custom-input"
                  placeholder="Nhập tên danh mục..."
                  @click="category_name = ''"
                  v-on:keyup="handleKeyUp()"
                />
              </fieldset>
              <transition name="slide-fade">
                <span class="text-danger" v-show="isError"
                  >*Vui lòng nhập tên danh mục*</span
                >
              </transition>
            </div>
          </div>
          <div class="col-md-12">
            <div class="col-sm-2"></div>
            <div class="col-sm-10 text-center">
              <button
                @click="handleStoreCategory()"
                class="btn-login"
                :class="{ addBtnLogin: !isBlack }"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-md-12">
            <label for="" class="col-sm-2 col-form-label">Name:</label>
            <div class="col-sm-10">
              <fieldset>
                <input
                  v-model="category_update.name"
                  @keyup="handleKeyUpUpdate()"
                  type="text"
                  class="form-control custom-input"
                  :placeholder="category_update.name"
                />
              </fieldset>
              <transition name="slide-fade">
                <span class="text-danger" v-show="isError"
                  >*Vui lòng nhập tên danh mục*</span
                >
              </transition>
            </div>
          </div>
          <div class="col-md-12">
            <div class="col-sm-2"></div>
            <div class="col-sm-10 text-center">
              <button
                @click="handleUpdateCategory()"
                class="btn-login"
                :class="{ addBtnLogin: !isBlack }"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">List Category</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Name</th>
                      <th class="text-center" style="width: 180px">Display</th>
                      <th class="text-center">Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(category_item, index) in list_category"
                      :key="category_item.name"
                    >
                      <td>{{ index + 1 }}.</td>
                      <td>{{ category_item.name }}</td>
                      <td class="text-center">
                        <span
                          @click="
                            handleUpdateStatus(category_item._id, index, true)
                          "
                          v-if="category_item.status"
                          style="cursor: pointer"
                          class="badge badge-success"
                          >Hiển thị</span
                        >
                        <span
                          @click="
                            handleUpdateStatus(category_item._id, index, false)
                          "
                          v-else
                          style="cursor: pointer"
                          class="badge badge-success"
                          >Không hiển thị</span
                        >
                      </td>

                      <td class="text-center">
                        <button
                          @click="handleGetDetail(category_item._id, index)"
                          class="btn btn-warning"
                          style="margin-right: 20px"
                        >
                          Update
                        </button>
                        <button
                          @click="handleDeleteTags(category_item._id, index)"
                          class="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    <script>
import axios from "axios";
export default {
  name: "PostCategory",
  computed: {
    isBlack() {
      return this.$store.state.statusBackground;
    },
  },
  data() {
    return {
      isError: false,
      list_category: [],
      status_update: false,
      category_name: "",
      category_update: {
        name: "",
        index: null,
        id: "",
      },
    };
  },
  methods: {
    validate() {
      if (this.category_name.length == 0) {
        this.isError = true;
      }
    },
    validateUpdate(){
      if(this.category_update.name.length==0){
        this.isError = true;
      }
    },  
    handleKeyUp() {
      if (this.category_name.length == 0) {
        this.isError = true;
      } else {
        this.isError = false;
      }
    },
    handleKeyUpUpdate(){
      if(this.category_update.name.length == 0){
        this.isError = true;
      }else{
        this.isError = false;
      }
    },
    handleStoreCategory() {
      this.validate();
      if (!this.isError) {
        axios
          .post("http://localhost:8080/api/category", {
            name: this.category_name,
          })
          .then((response) => {
            if (response.status == 200) {
              this.list_category.push(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        this.status_update = false;
      }
    },
    handleDeleteTags(id, index) {
      axios
        .delete("http://localhost:8080/api/category/" + id)
        .then((response) => {
          if (response.status == 200) {
            this.list_category.splice(index, 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.status_update = false;
    },
    handleGetDetail(id, index) {
      axios
        .get("http://localhost:8080/api/category/" + id)
        .then((response) => {
          if (response.status == 200) {
            this.status_update = true;
            this.category_update.name = response.data.name;
            this.category_update.id = id;
            this.category_update.index = index;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleUpdateCategory() {
      this.validateUpdate();
      if (!this.isError) {
        axios
          .patch(
            "http://localhost:8080/api/category/" + this.category_update.id,
            { name: this.category_update.name }
          )
          .then((response) => {
            if (response.status == 200) {
              this.list_category[this.category_update.index].name =
                this.category_update.name;
            }
          })
          .catch((error) => {
            console.log(error);
          });
        this.status_update = false;
      }
    },
    handleUpdateStatus(id, index, status) {
      axios
        .patch("http://localhost:8080/api/category/" + id, { status: !status })
        .then((response) => {
          if (response.status == 200) {
            this.list_category[index].status = !status;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.status_update = false;
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