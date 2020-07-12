<template>
  <div>
    <section class="lobby-banner"></section>
    <div class="wrapper top">
      <app-header></app-header>
      <div v-if="isMobileData">
       
        <div class="led-panel">
          <div class="platinum-group">
            <div class="platinum"  v-for="list in getdashboardPlatinum" v-bind:key="list.stepid">
              <figure><img :src="list.compMobileLogo" rel="preload" :alt="list.userCompanyName" :title="list.userCompanyName"></figure>
            </div>
          </div>
        </div>
        <div class="info-desk">
          <div class="button-wrap">
            <router-link to="/stalls" class="button  red animate__animated animate__headShake animate__repeat-3 ">Explore Expo</router-link>
          </div>
          <a @click="openParticipant" class="text-right link ripple" style="display: block;"><img rel="preload" src="https://vijay.homeonline.com//public/uploads/virtualexpo/helpdesk.png" class="helpdesk" alt=""></a>
        </div>
        <gold-slider></gold-slider>
        <bottom-slider></bottom-slider>
      </div>
      <div v-else>
        <div class="led-panel">
          <div class="platinum-group">
            <div class="platinum"  v-for="list in getdashboardPlatinum" v-bind:key="list.stepid">
              <figure><img :src="list.compDesktopLogo" rel="preload" :alt="list.userCompanyName" :title="list.userCompanyName"></figure>
            </div>
          </div>
          <div class="gold-group">
            <div class="gold" v-for="list in showGoldList" v-bind:key="list.stepid">
              <figure><img :src="list.compDesktopLogo" rel="preload" :alt="list.userCompanyName" :title="list.userCompanyName"></figure>
            </div>
       
          </div>
        </div>
        <div class="info-desk">
          <div class="button-wrap">
            <router-link to="/stalls" class="button  red animate__animated animate__headShake animate__repeat-3 ">Explore Expo</router-link>
          </div>
          <a  @click="openParticipant" class="text-right link ripple " style="display: block;"><img src="~@/assets/helpdesk.png" class="helpdesk" alt=""></a>
        </div>
        <bottom-slider></bottom-slider>
      </div>
    </div>
    <participant-list></participant-list>
  </div>
</template>
<script>
import Header from '@/components/layout/Header.vue';
import Bottomslider from '@/components/dashboard/Bottomslider.vue';
import GoldSlider from '@/components/dashboard/GoldSlider.vue';
import ParticipantList from '@/components/dashboard/ParticipantList.vue';
import { isMobile } from 'mobile-device-detect';
export default {
  data: function() {
    return {
      activedisplay: 'none',

    }
  },
   mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  computed: {
    isMobileData() {
      return isMobile ? true : false
    },
    getdashboardPlatinum() {
      return this.$store.getters.getdashboardPlatinum
    },
    showGoldList() {
      return this.$store.getters.getdashboardGold
    }
  },
   created() {
     this.$Progress.start()
     if(this.$store.getters.getdashboardSilver.length < 1){
        this.$store.dispatch('getParticipantList');
     }
  },
  components: {
    appHeader: Header,
    bottomSlider: Bottomslider,
    GoldSlider,
    participantList: ParticipantList
  },
  methods: {
    openParticipant:function(){
        this.$store.commit('showParticipant','block')
        this.activedisplay='none'
    }
  }
}

</script>
</style>
