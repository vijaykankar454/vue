<template>
  <div>
    <section class="stall-banner">
        <video v-if="isMobileData" autoplay muted loop id="myVideo" style="width:100%; height:100%;position:absolute;">
          <source src="dist/360-640-new.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
        <video v-else autoplay muted loop id="myVideo" style="width:100%; height:100%;position:absolute;">
          <source src="dist/desktop-bg.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
    </section>
    <div class="wrapper top">
      <div class="back animate__animated animate__slideInRight ">
        <router-link to="/dashboard" class="icon"><svg id="Layer" enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg">
            <path d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" /></svg></router-link> All Exhibitors
      </div>
      <div class="stalls">
        <carousel :autoplay="!projectModal" :autoplayTimeout="5000" :loop="true" :speed="1000" :perPageCustom="[[320, 1], [800, 2]]" :scrollPerPage="false" :paginationEnabled="false" :navigationEnabled="true">
          <slide class="stall animate__animated animate__zoomIn animate__fast" v-for="list in stallList" v-bind:key="list.stepid" v-bind:data-id="list.userID" @slideclick="showProjectModal"  :data-name="list.userCompanyName">
            <figure>
              <img :src="list.stallMobileImage" :alt="list.userCompanyName" rel="preload" :title="list.userCompanyName">
            </figure>
            <!-- <router-link :to="{ name: 'stalldetail', params: { id: list.id, name: list.name }}"><img :src="list.image" :alt="list.name"></router-link> -->
            <div class="detail">
              <div class="offer animate__animated animate__bounceIn animate__delay-1s">
                <h2 v-text="list.offerText"></h2>
               <!-- on booking* Book Now to avail the exclusive offer.-->
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>

    <project-list />
    
  </div>
</template>
<script>
import ProjectList from '@/components/dashboard/ProjectList';
import { Carousel, Slide } from 'vue-carousel';
import { isMobile } from 'mobile-device-detect';

export default {
  data: function() {
    return {
      projectModal: false,
    
    }
  },
   mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  components: {
    ProjectList,
    Carousel,
    Slide
  },
   created() {
     this.$Progress.start()
     if(this.$store.getters.getStallnfo.length < 1){
          this.$store.dispatch('getStallDataInfo');
     }
     /*else{
       
          this.$store.commit('setstalllList','')
          this.$store.dispatch('getStallDataInfo',this.$route.params.id);
     }*/
  },
  computed: {
    isMobileData() {
      return isMobile ? true : false
    },
    stallList() {
      return this.$store.getters.getStallnfo
    },
  },
  methods: {
    showProjectModal: function(dataset) {
      // alert("click");
       this.$store.commit('setUserUnitList','');
      this.$store.dispatch('getStallDataInfoUnit',dataset.id);
      
    
      this.projectModal = true;
      
    },
  }
}

</script>
<style>
.VueCarousel-navigation-prev[data-v-453ad8cd],
.VueCarousel-navigation-next[data-v-453ad8cd] {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: 1px solid #151515;
  border-radius: 50px;
  width: 40px; height: 40px;
}

</style>
