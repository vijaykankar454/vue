<template>
  <div>
    <section class="stall-banner"></section>
    <div class="wrapper top">
      <div class="back animate__animated animate__slideInRight ">
        <router-link to="/stalls" class="icon"><svg id="Layer" enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg">
            <path d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" /></svg></router-link> {{ projectName }}
      </div>
      <div class="detail">
        <div class="stall animate__animated animate__zoomIn animate__fast">
          <a href=""><!--<img src="@/assets/booth.png" alt="">--></a>
        </div>
        <div class="right-col">
          <div class="offer animate__animated animate__bounceIn animate__delay-1s">
            <h2>Pay 10% Now</h2>
            and 90% later* Book Now
          </div>
          <div class="view-detail ">
            <a v-if="multipleProject" href="https://preprod.homeonline.com/sale/Singapore-City-kolar_road-bhopal/AED923A1/pdet/" target="_blank" class="button block animate__animated animate__bounceIn animate__delay-2s">View Detail</a>
            <button v-if="!multipleProject" v-on:click="projectModal = true" class="button block animate__animated animate__bounceIn animate__delay-2s">View Projects</button>
          </div>
        </div>

      </div>
    </div>
    <!-- multiple project modal -->
    <div class="modal-wrapper" v-show="projectModal" v-on:click="projectModal = false">
      <div class="modal bottom" v-show="projectModal">
        <button v-on:click="projectModal = false" class="close animate__animated animate__rotateIn animate__delay-1s">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 344.971 344.971" style="enable-background:new 0 0 344.971 344.971;" xml:space="preserve">
            <path d="M342.622,330.438L183.814,172.494L341.79,13.646c3.117-3.133,3.105-8.199-0.028-11.316
c-3.133-3.117-8.199-3.105-11.316,0.028l0,0L172.502,161.182L13.67,3.206C10.537,0.089,5.471,0.101,2.354,3.234
s-3.105,8.199,0.028,11.316l0,0L161.19,172.494L3.23,331.326c-3.117,3.133-3.105,8.199,0.028,11.316
c3.133,3.117,8.199,3.105,11.316-0.028l157.928-158.808l158.8,157.976c3.133,3.117,8.199,3.105,11.316-0.028
c3.117-3.133,3.105-8.199-0.028-11.316l0,0L342.622,330.438z" />
          </svg></button>
        <div class="modal-inner">
          <div class="modal-title">
            <h4>List of Projects</h4>
            <p>by Shrimad Construction</p>
          </div>
          <div class="builders">
            <ul class="animate__animated animate__fadeInUp ">
              <li>
                Project one <a href="#" class="button red">Show Project</a>
              </li>
              <li>
                Project two <a href="#" class="button red">Show Project</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      projectName: '',
      projectModal: false,
      multipleProject: false
    }
  },
  created() {
    // alert(this.$route.params.id);
    this.projectName = this.$route.params.name;
    if (this.$route.params.id == 2) {
      this.multipleProject = true;
    } else {
      this.multipleProject = false;
    }
  }
}

</script>
