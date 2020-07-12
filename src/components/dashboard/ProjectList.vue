<template>
  <div class="modal-wrapper" :style="{ display: getDisplayStatus }" @click.self="$store.commit('showProject','none')">
      <div class="modal bottom project" :style="{ display: getDisplayStatus }">
        <button @click="$store.commit('showProject','none')" class="close animate__animated animate__rotateIn animate__delay-1s">
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
            <p>{{userBuilderName}}</p>
          </div>
          <div class="list-wrapper projects" v-if="userUnitGetList">
            <div class="card" v-for="(list, i ) in userUnitGetList" v-bind:key="list.id">
              <div class="flex">
                <div class="col">
                  <div class="card-image openGallery ">
                    <img :src="list.projectImg" rel="preload" class="" :alt="list.companyName" :title="list.companyName">
                  </div>
                </div>
                <div class="col prop-details">
                  <div class="price flex">
                    <div class="prices">
                      <span class="rera ">Rera</span> <span class="offer">Offer</span><br>&#x20B9; <strong>{{list.unitPrice}}</strong>
                    </div>
                    <span class="verified">Verified</span>
                  </div>
                  <h2 class="prop-title">
                    {{list.bhkData}}
                  </h2>
                  <div class="builder-name"> by <span>{{list.companyName}}</span>
                  </div>
                  <div class="location-name" >{{list.projectAddress}}</div>
                  <div class="proj-units">
                        {{list.projectCurrentStatus}}
                        <span class="area-detail" title="Carpet Area">
                          {{list.unitsqft}}
                            </span> 
                    </div>
                </div>
              </div>
                  <div class="btn-wrapper">
                    <a :href="list.projectUrl" target="_blank" class="button  "> View Detail</a>
                    <button class="button orange " @click ="saveInterest(list,i)"  > I'm Interested</button>
                  </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return{
      projectModal: false
    }
  },
  /*props: ['display'],*/
  computed: {
    getDisplayStatus() {
      return this.$store.getters.getProject
    }, 
     userBuilderName() {
      return this.$store.getters.getPopUpBuilderName;
  },
    userUnitGetList() {
      return this.$store.getters.getUserUnitList;
    
  },
    
  },
  methods: {
    saveInterest: function(list) {
      event.preventDefault();

        //this doesn't work, the DOM doesn't update before the calculation has completed
        event.target.setAttribute("disabled", "disabled");

        //same thing, doesn't update immediately
        event.target.disabled = true;
       const formData = {
                            hspropertyKey: list.propertyKey,
                            hspropertyUnitId: list.propertyUnitId,
                            hspropertyBhk: list.propertyBhk
                        }
                 
       this.$store.dispatch('saveIntereststore',formData); 
    }
   
  }
}

</script>
