<template>
  <div class="gold-slider ">

    <carousel :perPage="3" :autoplay="true" :autoplayTimeout="6000" :loop="true" :scrollPerPage="false" :paginationEnabled="false"  >
      <slide class="item" v-for="list in showGoldList" v-bind:key="list.stepid">
        <figure><img :src="list.compMobileLogo" rel="preload" :alt="list.userCompanyName" :title="list.userCompanyName"></figure>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
   computed: {
    showGoldList() {
      return this.$store.getters.getdashboardGold
    }
  },
  components: {
    Carousel,
    Slide
  }
}

</script>
