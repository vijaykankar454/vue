<template>
  <div>
    <div v-if="isMobileData">
      <section class="hero-banner"></section>
      <div class="wrapper">
        <app-header @modalstatusheader="showModal=$event"></app-header>
        <div class="intro-wrapper">
          <div class="info animate__animated animate__fadeInDown animate__delay-1s">
            <h3>Welcome to <span class="red-text">all new</span></h3>
            <h1><span class="red-text">Virtual</span> Expo</h1>
            <h4>Property deals on the go</h4>
          </div>
          <div class="pointer animate__animated animate__bounceInUp animate__delay-2s">
            <svg xmlns="http://www.w3.org/2000/svg" width="81" height="142" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" viewBox="0 0 61 106">
              <path d="M27 100l0 0c0-4-11-30-12-33-1-1-1-3-3-3-1 2-1 2 0 6 4 12 9 23 13 35 1 1 1 1 3 1 1-4 10-15 14-20 2-1 23-22 17-22-2 0-17 15-19 17-2 2-12 15-13 19zm-27-100c0 2 0 2 2 5l5 5c15 15 23 40 21 60l0 8c0 1-1 5 1 5 1 0 2-3 3-4 7-24 1-48-15-67-4-4-8-8-13-11-1-1-2-1-4-1z" fill="#FFC750" /></svg>
          </div>
        </div>
      </div>
      <div class="modal-wrapper" v-show="showModal">
          <div class="modal" v-if="showModal">
            <app-model @modalstatus="showModal=$event"></app-model>
          </div>
      </div>
    </div>
    <div v-else>
      <section class="hero-banner"></section>
      <div class="wrapper">
        <app-header @modalstatusheader="showModal=$event"></app-header>
        <div class="intro-wrapper">
          <div class="info animate__animated animate__fadeInDown animate__delay-1s">
            <h3>Welcome to <span class="red-text">all new</span></h3>
            <h1><span class="red-text">Virtual</span> Expo</h1>
            <h4>Property deals on the go</h4>
          </div>
          <div class="pointer animate__animated animate__bounceInUp animate__delay-2s">
            <svg xmlns="http://www.w3.org/2000/svg" width="81" height="142" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" viewBox="0 0 61 106">
              <path d="M27 100l0 0c0-4-11-30-12-33-1-1-1-3-3-3-1 2-1 2 0 6 4 12 9 23 13 35 1 1 1 1 3 1 1-4 10-15 14-20 2-1 23-22 17-22-2 0-17 15-19 17-2 2-12 15-13 19zm-27-100c0 2 0 2 2 5l5 5c15 15 23 40 21 60l0 8c0 1-1 5 1 5 1 0 2-3 3-4 7-24 1-48-15-67-4-4-8-8-13-11-1-1-2-1-4-1z" fill="#FFC750" /></svg>
          </div>
        </div>
      </div>
      <div class="modal-wrapper" v-show="showModal">
        <div class="modal" v-if="showModal">
          <app-model @modalstatus="showModal=$event"></app-model>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginModel from '@/components/layout/Loginmodel.vue';
import Header from '@/components/layout/Header.vue';
import { isMobile } from 'mobile-device-detect';
export default {
  data: function() {
    return {
      color: 'red',
      showModal: false

    }
  },
  computed: {
    isMobileData() {
      return isMobile ? true : false
    }
  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created() {
    this.$Progress.start()
    if(localStorage.getItem('virtual_token') && localStorage.getItem('virtual_key')){
      if(localStorage.getItem('virtual_username') == ''){
       this.showModal = true
       this.$store.commit('changeStatus',4);

      }else{
        this.$router.push('/dashboard');
      }
    }else{
      this.$store.dispatch('verifyOfferKey', this.$route.params.keyname);
    }
   
  },
  components: {
    appModel: LoginModel,
    appHeader: Header,
  }
}

</script>
<style scoped>
body,
html {
  overflow: hidden;
}

</style>
