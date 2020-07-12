<template>
    <div>

    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
    <div id='loading' v-show='getLoadingcurrent'></div>
     </div>
</template>

<script>
  import Header from '@/components/layout/Header.vue';
  export default {
      data:function(){
            return {
                color: 'red',
                loading: false
            }
        } ,
        computed: {
            getLoadingcurrent() {
            return this.$store.getters.getLoading
            }, 
        },
        components: {
            appHeader: Header
        },
        created(){

           if(this.$route.path !='/'){
               this.$store.commit('updatemenu',true);
           }
        }
    }
</script>
<style >
  @import '~@/assets/style.css';
</style>