<template>
  <transition name="slide-fade" :class="{ backgroundBlack: isBlack, backgroundWhite: !isBlack }">
    <div v-if="status" id="modal" class="modal" style="display: block">
      <!-- Modal Content -->
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h3 class="header-title">Say hello to <em>Highway</em></h3>
          <div class="close-btn" :class="{ addStyleCloseBtn: !isBlack }" @click="handleCloseModal">
            <img src="img/close_contact.png" alt="" />
          </div>
        </div>
        <!-- Modal Body -->
        <div class="modal-body">
          <div class="col-md-6 col-md-offset-3">
            <form id="contact" action="" method="post">
              <div class="row">
                <div class="col-md-12">
                  <fieldset>
                    <input :class="{ addStyleInput: !isBlack }"
                      name="name"
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Your name..."
                      required=""
                    />
                  </fieldset>
                </div>
                <div class="col-md-12">
                  <fieldset>
                    <input :class="{ addStyleInput: !isBlack }"
                      name="email"
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Your email..."
                      required=""
                    />
                  </fieldset>
                </div>
                <div class="col-md-12">
                  <fieldset>
                    <textarea :class="{ addStyleInput: !isBlack }"
                      name="message"
                      rows="6"
                      class="form-control"
                      id="message"
                      placeholder="Your message..."
                      required=""
                    ></textarea>
                  </fieldset>
                </div>
                <div class="col-md-12">
                  <fieldset>
                    <button type="submit" :class="{ addStyleButton: !isBlack }" id="form-submit" class="btn">
                      Send Message Now
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalRealApp",
  computed: {
    status() {
      return this.$store.state.statusModal;
    },
    isBlack(){
      return this.$store.state.statusBackground;
    }
  },
  methods: {
    handleCloseModal() {
      this.$store.state.statusModal = !this.$store.state.statusModal;
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* Trước 2.1.8 thì dùng .slide-fade-leave-active */ {
    transform: translateY(-100%);
    opacity: 0;
  }

  .backgroundBlack{
    background-color: #232323;
    color: #fff;
  }
  
  .backgroundWhite{
    background-color: #fff;
    color: #000;
  }
  .addStyleInput{
    border: 1px solid #333;
    color: #000;

  }

  .addStyleButton{
    background-color: rgba(0,0,0,0.2);
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
  }
  .addStyleCloseBtn{
    background-color: rgba(0,0,0,0.3);
    border: none;
  }

</style>