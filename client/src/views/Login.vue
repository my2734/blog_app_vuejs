<template>
  <transition name="slide-fade">
    <div class="login-wrap">
      <div class="login-html">
        <div>
          <a @click="handleBackGoHome()" class="btn-back tab"
            ><i class="fa fa-arrow-left" aria-hidden="true"></i> Go Home</a
          >
          <!-- <router-link to="/" class="btn-back tab"><i class="fa fa-arrow-left" aria-hidden="true"></i> Go Home</router-link> -->
        </div>
        <input
          id="tab-1"
          type="radio"
          name="tab"
          class="sign-in"
          checked
        /><label for="tab-1" class="tab">Sign In</label>

        <input id="tab-2" type="radio" name="tab" class="sign-up" /><label
          for="tab-2"
          class="tab"
          >Sign Up</label
        >

        <div class="login-form">
          <div class="sign-in-htm">
            <div class="group">
              <label for="user" class="label">Username</label>
              <input
                @keyup="handleLoginUsername()"
                id="user"
                v-model="user_login.username"
                type="text"
                class="input"
              />
              <transition name="slide-fade">
                <span v-show="error_user_login.username">{{
                  error_user_login.username_content
                }}</span>
              </transition>
            </div>
            <div class="group">
              <label for="pass" class="label">Password</label>
              <input
                @keyup="handleLoginPassword()"
                v-model="user_login.password"
                id="pass"
                type="password"
                class="input"
                data-type="password"
              />
              <transition name="slide-fade">
                <span v-show="error_user_login.password">{{
                  error_user_login.password_content
                }}</span>
              </transition>
            </div>
            <div class="group">
              <input id="check" type="checkbox" class="check" checked />
              <label for="check"
                ><span class="icon"></span> Keep me Signed in</label
              >
            </div>
            <div class="group">
              <input
                type="submit"
                @click="submit_login()"
                class="button"
                value="Sign In"
              />
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <a href="#forgot">Forgot Password?</a>
            </div>
          </div>

          <div class="sign-up-htm">
            <h5 v-if="show_message_register">Register sucess. Now Login!</h5>
            <div class="group">
              <label for="user" class="label">Username</label>
              <input
                @keyup="handleRegisterUsername()"
                id="user"
                v-model="user.username"
                type="text"
                class="input"
              />
              <transition name="slide-fade">
                <span v-show="error_user_register.username">{{
                  error_user_register.username_content
                }}</span>
              </transition>
            </div>
            <div class="group">
              <label for="pass" class="label">Password</label>
              <input
                @keyup="handleRegisterPassword()"
                id="pass"
                type="password"
                class="input"
                data-type="password"
                v-model="user.password"
              />
              <transition name="slide-fade">
                <span v-show="error_user_register.password">{{
                  error_user_register.password_content
                }}</span>
              </transition>
            </div>
            <div class="group">
              <label for="pass" class="label">Repeat Password</label>
              <input
                @keyup="handleRegisterRepeatPassword()"
                id="pass"
                type="password"
                class="input"
                data-type="password"
                v-model="user.repeat_password"
              />
              <transition name="slide-fade">
                <span v-show="error_user_register.repeat_password">{{
                  error_user_register.repeat_password_content
                }}</span>
              </transition>
            </div>
            <div class="group">
              <label for="pass" class="label">Email Address</label>
              <input
                @keyup="handleRegisterEmail()"
                id="pass"
                type="text"
                class="input"
                v-model="user.email"
              />
              <transition name="slide-fade">
                <span v-show="error_user_register.email">{{
                  error_user_register.email_content
                }}</span>
              </transition>
            </div>
            <div class="group">
              <input
                type="submit"
                @click="submit_register()"
                class="button"
                value="Sign Up"
              />
            </div>
            <div class="hr"></div>
            <div class="foot-lnk">
              <label for="tab-1">Already Member?</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginApp",
  data() {
    return {
      show_message_register: false,
      user: {
        username: "",
        email: "",
        password: "",
        repeat_password: "",
      },
      user_login: {
        username: "",
        password: "",
      },
      error_user_login: {
        username: false,
        username_content: "",
        password: false,
        password_content: "",
      },
      error_user_register: {
        username: false,
        password: false,
        repeat_password: false,
        email: false,
        username_content: "",
        password_content: "",
        repeat_password_content: "",
        email_content: "",
      },
      isErrorRegister: false,
      isErrorLogin: false,
    };
  },
  methods: { 
    handleBackGoHome() {
      this.$store.state.statusOverly = false;
      this.$router.push({ path: "/" });
    },
    validate_register() {
      //
    },
    submit_register() {
      const data = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
      };

      axios
        .post("http://localhost:8080/api/auth/register", data)
        .then((response) => {
          if(response.status ==200){
            this.user.username = ""
            this.user.email = ""
            this.user.password = ""
            this.user.repeat_password = ""
            this.show_message_register = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    submit_login() {
      const data = {
        username: this.user_login.username,
        password: this.user_login.password,
      };
      // console.log(data)

      axios
        .post("http://localhost:8080/api/auth/login", data)
        .then((response) => {
          const token = response.data;
          this.setCookie("token", token, '3d');
          this.user_login.username=""
          this.user_login.password=""
          axios.get("http://localhost:8080/api/isAdmin/"+token)
            .then((response)=>{
              if(response.status == 200){
                  this.$store.commit('TOGGLE_AUTH')
                // if(response.data == "true"){
                // this.$store.state.isAdmin = true;
                // }else{
                //   this.$store.state.isAdmin = false;
                // }
                // this.$store.state.isAuthentication = true;
              }              
            })
          this.$router.push({name: 'home'})
        })
        .catch(() => {
          alert("co loi roi");
        });
    },
    handleLoginUsername() {
      if (!this.user_login.username) {
        this.error_user_login.username_content = "Vui lòng nhập username";
        this.error_user_login.username = true;
      } else {
        if (this.user_login.username.length < 6) {
          this.error_user_login.username_content = "Nhập ít nhất 6 kí tự";
          this.error_user_login.username = true;
        } else {
          this.error_user_login.username = false;
        }
      }
    },
    handleLoginPassword() {
      if (!this.user_login.password) {
        this.error_user_login.password_content = "Vui lòng nhập password";
        this.error_user_login.password = true;
      } else {
        if (this.user_login.password.length < 6) {
          this.error_user_login.password_content = "Nhập ít nhất 6 kí tự";
          this.error_user_login.password = true;
        } else {
          this.error_user_login.password = false;
        }
      }
    },
    handleRegisterUsername() {
      if (!this.user.username) {
        this.error_user_register.username_content = "Vui lòng nhập username";
        this.error_user_register.username = true;
      } else {
        if (this.user.username.length < 6) {
          this.error_user_register.username_content = "Nhập ít nhất 6 kí tự";
          this.error_user_register.username = true;
        } else {
          this.error_user_register.username = false;
        }
      }
    },
    handleRegisterPassword() {
      if (!this.user.password) {
        this.error_user_register.password_content = "Vui lòng nhập password";
        this.error_user_register.password = true;
      } else {
        if (this.user.password.length < 6) {
          this.error_user_register.password_content = "Nhập ít nhất 6 kí tự";
          this.error_user_register.password = true;
        } else {
          this.error_user_register.password = false;
        }
      }
    },
    handleRegisterRepeatPassword() {
      if (!this.user.repeat_password) {
        this.error_user_register.repeat_password_content =
          "Vui lòng nhập password";
        this.error_user_register.repeat_password = true;
      } else {
        if (this.user.repeat_password.length < 6) {
          this.error_user_register.repeat_password_content =
            "Nhập ít nhất 6 kí tự";
          this.error_user_register.repeat_password = true;
        } else {
          this.error_user_register.repeat_password = false;
        }
      }
    },
    handleRegisterEmail() {
      if (!this.user.email) {
        this.error_user_register.email_content = "Vui lòng nhập email";
        this.error_user_register.email = true;
      } else {
        if (!this.user.email.includes("@")) {
          this.error_user_register.email_content = "Nhập không đúng định dạng";
          this.error_user_register.email = true;
        } else {
          this.error_user_register.email = false;
        }
      }
    },
  },
};
</script>

<style>
.login-html {
  padding-top: 70px !important;
}
.login-wrap {
  margin-top: 40px !important;
  margin-bottom: 40px !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* Trước 2.1.8 thì dùng .slide-fade-leave-active */ {
  transform: translateY(-100%);
  opacity: 0;
}

.btn-back {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 18px;
  text-transform: capitalize;
  cursor: pointer;
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