<template>
  <div>
    <nav class="navbar">
      <div class="logo animate__animated animate__bounceIn">
        <img src="https://cloudimage.homeonline.com//public/uploads/virtualexpo/govirtual-logo.png" alt="logo">
      </div>
      <div class="menu-desktop uppercase" v-if="getUserNameHeader">
        <a @click="openParticipant('Click_On_Information_Desk')">Information Desk</a>
        <a @click="openParticipant( 'Click_On_Exhibitors')">Exhibitors</a>
        <a @click="onLogout" v-if="getUserNameHeader"> Logout</a>
        <a href="https://www.homeonline.com/mobile/post-your-requirements" target="_blank" >Help</a>
      </div>
      <a target="_blank" href='https://www.homeonline.com/mobile/post-your-requirements'><!--<div class="help" v-on:click="reqModal = true">-->
        <div class="help" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path id="helpouter" d="M510 463.7L474.8 361.4c16.9-34.2 25.8-72.3 25.9-110.6 0.1-66-25.4-128.4-71.9-175.7C382.4 27.7 320.4 1.1 254.4 0c-34.6-0.6-68.1 5.8-99.8 18.9 -30.5 12.6-57.9 30.9-81.3 54.4 -23.5 23.5-41.8 50.8-54.4 81.3 -13.1 31.6-19.5 65.2-18.9 99.8 1 66 27.7 127.9 75 174.4 47.2 46.4 109.5 71.9 175.3 71.9 0.1 0 0.3 0 0.4 0 38.3-0.1 76.4-9 110.6-25.9l102.3 35.1c3.9 1.4 8 2 12 2 9.5 0 18.7-3.7 25.7-10.7C511.2 491.4 514.6 476.9 510 463.7zM479.8 479.8c-1 1-3.2 2.5-6.3 1.5l-108.4-37.2c-1.6-0.5-3.3-0.8-4.9-0.8 -2.4 0-4.9 0.6-7.1 1.8 -31.3 16.6-66.7 25.4-102.4 25.4 -119.5 0.2-218.4-96.9-220.3-216.4C29.4 193.8 52.3 137.3 94.8 94.8c42.5-42.5 99-65.4 159.2-64.4 119.5 1.9 216.6 100.7 216.4 220.3 -0.1 35.6-8.8 71-25.4 102.4 -2 3.7-2.3 8.1-0.9 12l37.2 108.4C482.4 476.7 480.8 478.8 479.8 479.8z"  />
          <path d="M247.9 362.7c-7.9 0-15.5 7-15.2 15.2 0.4 8.2 6.7 15.2 15.2 15.2 7.9 0 15.5-7 15.2-15.2C262.7 369.7 256.4 362.7 247.9 362.7z" />
          <path d="M247.9 127.7c-41.6 0-75.5 33.9-75.5 75.5 0 8.4 6.8 15.2 15.2 15.2s15.2-6.8 15.2-15.2c0-24.9 20.3-45.2 45.2-45.2s45.2 20.3 45.2 45.2 -20.3 45.2-45.2 45.2c-8.4 0-15.2 6.8-15.2 15.2v61.9c0 8.4 6.8 15.2 15.2 15.2 8.4 0 15.2-6.8 15.2-15.2v-48.3c34.4-7 60.3-37.5 60.3-74C323.4 161.6 289.5 127.7 247.9 127.7z" /></svg>
      </div></a>
      <div class="user flex animate__animated animate__fadeIn " v-if="getUserNameHeader">
        <div>Welcome <span class="name red-text">{{getUserNameHeaderTop}}</span></div>
        <a href="#!" class="logout" @click="onLogout" title="Sign Out"> <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.2 471.2">
              <path d="M227.6 444.2h-122.9c-33.4 0-60.5-27.2-60.5-60.5V87.5c0-33.4 27.2-60.5 60.5-60.5h124.9c7.5 0 13.5-6 13.5-13.5s-6-13.5-13.5-13.5h-124.9c-48.3 0-87.5 39.3-87.5 87.5v296.2c0 48.3 39.3 87.5 87.5 87.5h122.9c7.5 0 13.5-6 13.5-13.5S235 444.2 227.6 444.2z" />
              <path d="M450 226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1 0 -5.3 5.3-5.3 13.8 0 19.1l62.8 62.8h-273.9c-7.5 0-13.5 6-13.5 13.5s6 13.5 13.5 13.5h273.9l-62.8 62.8c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4l85.8-85.8C455.3 239.9 455.3 231.3 450 226.1z" /></svg></span>
        </a>
      </div>
      <div class="user " v-else>
        <button class="button ripple red animate__animated animate__fadeIn animate__delay-1s" @click="showModaldata">Get Started</button>
      </div>
      <div class="menu-toggle " @click="chnageDisplay"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M501.3 96H10.7C4.8 96 0 100.8 0 106.7s4.8 10.7 10.7 10.7h490.7c5.9 0 10.7-4.8 10.7-10.7S507.2 96 501.3 96z" />
          <path d="M501.3 245.3H10.7C4.8 245.3 0 250.1 0 256s4.8 10.7 10.7 10.7h490.7c5.9 0 10.7-4.8 10.7-10.7S507.2 245.3 501.3 245.3z" />
          <path d="M501.3 394.7H10.7C4.8 394.7 0 399.4 0 405.3 0 411.2 4.8 416 10.7 416h490.7c5.9 0 10.7-4.8 10.7-10.7C512 399.4 507.2 394.7 501.3 394.7z" /></svg>
      </div>
      <div v-if="getUserNameHeader" class="menu animate__animated animate__fadeInUp animate__faster" :style="{ display: activedisplay}">
        <ul>
          <li><a @click="openParticipant('Click_On_Information_Desk')">Information Desk</a></li>
          <li><a @click="openParticipant( 'Click_On_Exhibitors')">Exhibitors</a></li>
          <li v-if="getUserNameHeader"> <a @click="onLogout"> Logout</a></li>
        </ul>
      </div>
    </nav>
    <div class="modal-wrapper" v-show="reqModal" v-on:click.self="reqModal = false">
      <div class="modal " v-if="reqModal">
        <button v-on:click="reqModal = false" class="close animate__animated animate__rotateIn animate__delay-1s">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 344.971 344.971" style="enable-background:new 0 0 344.971 344.971;" xml:space="preserve">
            <path d="M342.622,330.438L183.814,172.494L341.79,13.646c3.117-3.133,3.105-8.199-0.028-11.316
c-3.133-3.117-8.199-3.105-11.316,0.028l0,0L172.502,161.182L13.67,3.206C10.537,0.089,5.471,0.101,2.354,3.234
s-3.105,8.199,0.028,11.316l0,0L161.19,172.494L3.23,331.326c-3.117,3.133-3.105,8.199,0.028,11.316
c3.133,3.117,8.199,3.105,11.316-0.028l157.928-158.808l158.8,157.976c3.133,3.117,8.199,3.105,11.316-0.028
c3.117-3.133,3.105-8.199-0.028-11.316l0,0L342.622,330.438z" />
          </svg></button>
        <div class="modal-inner">
          <div class="modal-title">
            <h4>Help</h4>
            <p>Let us know your requirements.</p>
            <form>
              post your requirement form here.
            </form>
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
      activedisplay: 'none',
      reqModal: false
    }
  },
  computed: {
    getUserNameHeader() {
      return localStorage.getItem('virtual_mobile');
    },
     getUserNameHeaderTop() {
      return localStorage.getItem('virtual_username');
    },
  },
  methods: {
    showModaldata: function() {
      this.$ga.event({
        eventCategory:localStorage.getItem('virtual_key').replace('-', '_'),
        eventAction: 'Click_On_Get_Started',
        eventLabel: 'Virtual_Expo_Home'
      })
      this.$emit('modalstatusheader', true);
      this.$store.commit('changeStatus', 0)
    },
    chnageDisplay() {
      if (this.activedisplay == 'block') {
        this.activedisplay = 'none';
      } else {
        this.activedisplay = 'block';
      }
    },
    onLogout() {
      this.$store.dispatch('logout')
    },
    openParticipant: function(tabType) {
      this.$ga.event({
        eventCategory:localStorage.getItem('virtual_key').replace('-', '_'),
        eventAction: tabType,
        eventLabel: 'Virtual_Expo_Dashboard'
        })     
      this.$store.commit('showParticipant', 'block')
      this.activedisplay = 'none'
    },
  },

}

</script>
<style scoped>
</style>
