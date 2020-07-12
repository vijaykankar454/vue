<template>
  <div class="silver-panels ">

    <carousel :perPageCustom="[[320,4],[800,5]]" :autoplay="true" :autoplayTimeout="3000" :loop="true" :scrollPerPage="false" :paginationEnabled="false" >
      <slide class="item" v-for="list in silverBuilderList" v-bind:key="list.stepid">
        <figure><img v-if="isMobileData" :src="list.compMobileLogo" rel="preload" :alt="list.userCompanyName" :title="list.userCompanyName">
        <img v-else :src="list.compDesktopLogo" rel="preload" :alt="list.userCompanyName" :title="list.userCompanyName">
        </figure>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import { isMobile } from 'mobile-device-detect';
export default {
  
   computed: {
    isMobileData() {
      return isMobile ? true : false
    },
    silverBuilderList() {
      return this.$store.getters.getdashboardSilver
    }
  },
  components: {
    Carousel,
    Slide
  }
}

</script>
