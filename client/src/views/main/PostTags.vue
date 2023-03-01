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
            <li class="breadcrumb-item active">Add Tags</li>
          </ol>
        </div>

        <div v-if="status_update == false" class="row">
          <div class="col-md-12">
            <label for="" class="col-sm-2 col-form-label">Name:</label>
            <div class="col-sm-10">
              <fieldset>
                <input
                  v-model="tags"
                  type="text"
                  class="form-control custom-input"
                  placeholder="Nhập tên Tags..."
                  v-on:keyup="isError = false"
                  @click="tags = ''"
                />
              </fieldset>
              <transition name="slide-fade">
                <span class="text-danger" v-show="isError"
                  >*Vui lòng nhập nội dung Tags*</span
                >
              </transition>
            </div>
          </div>
          <div class="col-md-12">
            <div class="col-sm-2"></div>
            <div class="col-sm-10 text-center">
              <button
                class="btn-login"
                @click="handleSubmitTags()"
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
                  v-model="tags_update.name"
                  type="text"
                  class="form-control custom-input"
                  :placeholder="tags_update.name"
                  v-on:keyup="isError = false"
                />
              </fieldset>
              <transition name="slide-fade">
                <span class="text-danger" v-show="isError"
                  >*Vui lòng nhập nội dung Tags*</span
                >
              </transition>
            </div>
          </div>
          <div class="col-md-12">
            <div class="col-sm-2"></div>
            <div class="col-sm-10 text-center">
              <button
                class="btn-login"
                @click="handleUpdateTags()"
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
                <h3 class="card-title">List Tags</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Name</th>
                      <th style="width: 180px">Display</th>
                      <th>Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(tags_item, index) in list_tags"
                      :key="tags_item.name"
                    >
                      <td>{{ index + 1 }}.</td>
                      <td>{{ tags_item.name }}</td>
                      <td>
                        <span
                          @click="
                            handleUpdateStatus(tags_item._id, index, true)
                          "
                          v-if="tags_item.status"
                          class="badge badge-sm badge-success"
                          style="cursor: pointer"
                          >Hiển thị</span
                        >
                        <span
                          @click="
                            handleUpdateStatus(tags_item._id, index, false)
                          "
                          v-else
                          class="badge badge-sm badge-primary"
                          style="cursor: pointer"
                          >Không hiển thị</span
                        >
                      </td>
                      <td>
                        <button
                          @click="handleGetDetail(tags_item._id, index)"
                          class="btn btn-warning"
                          style="margin-right: 20px"
                        >
                          Update
                        </button>
                        <button
                          @click="handleDeleteTags(tags_item._id, index)"
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
        <p></p>
      </div>
    </div>
  </div>
</template>
    <script>
import axios from "axios";
export default {
  name: "PostTags",
  computed: {
    isBlack() {
      return this.$store.state.statusBackground;
    },
  },
  data() {
    return {
      tags: "",
      isError: false,
      list_tags: [],
      status_update: false,
      tags_update: {
        id: "",
        name: "",
        index: null,
      },
    };
  },
  methods: {
    handleSubmitTags() {
      if (!this.tags) {
        this.isError = true;
      }

      if (!this.isError) {
        axios
          .post("http://localhost:8080/api/tags", { name: this.tags })
          .then((response) => {
            this.list_tags.push(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        this.status_update = false;
        this.tags = "";
      }
    },
    handleDeleteTags(id, index) {
      axios
        .delete("http://localhost:8080/api/tags/" + id)
        .then((response) => {
          response.status == 200 && this.list_tags.splice(index, 1);
        })
        .catch((error) => {
          console.log(error);
        });
      this.status_update = false;
    },
    handleGetDetail(id, index) {
      axios
        .get("http://localhost:8080/api/tags/" + id)
        .then((response) => {
          if (response.status == 200) {
            this.status_update = true;
            this.tags_update.name = response.data.name;
            this.tags_update.id = id;
            this.tags_update.index = index;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validateUpdate(){
      if(this.tags_update.name.length==0){
        this.isError = true;
      }
    },
    handleUpdateTags() {
      this.validateUpdate()
      if (!this.isError) {
        axios
          .patch("http://localhost:8080/api/tags/" + this.tags_update.id, {
            name: this.tags_update.name,
          })
          .then((response) => {
            if (response.status == 200) {
              this.list_tags[this.tags_update.index].name =
                this.tags_update.name;
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
        .patch("http://localhost:8080/api/tags/" + id, { status: !status })
        .then((response) => {
          if (response.status == 200) {
            this.list_tags[index].status = !status;
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
      .get("http://localhost:8080/api/tags")
      .then((response) => {
        if (response.status == 200) {
          this.list_tags = response.data;
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