<template>
   <div >
        <button class="close animate__animated animate__rotateIn">
          
            <svg  @click="hidemodal" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 344.971 344.971" style="enable-background:new 0 0 344.971 344.971;" xml:space="preserve">
                <path d="M342.622,330.438L183.814,172.494L341.79,13.646c3.117-3.133,3.105-8.199-0.028-11.316
c-3.133-3.117-8.199-3.105-11.316,0.028l0,0L172.502,161.182L13.67,3.206C10.537,0.089,5.471,0.101,2.354,3.234
s-3.105,8.199,0.028,11.316l0,0L161.19,172.494L3.23,331.326c-3.117,3.133-3.105,8.199,0.028,11.316
c3.133,3.117,8.199,3.105,11.316-0.028l157.928-158.808l158.8,157.976c3.133,3.117,8.199,3.105,11.316-0.028
c3.117-3.133,3.105-8.199-0.028-11.316l0,0L342.622,330.438z" />
            </svg></button>
        <div class="modal-inner">
            <app-stepa v-if="getstep ==0"></app-stepa>
            <app-stepb v-if="getstep ==1"></app-stepb>
             <app-stepc  v-if="getstep==2"></app-stepc>
            <app-stepd  v-if="getstep ==4"></app-stepd>
            
        </div>

    </div>

</template>
<script>
    import Step1 from '@/components/Auth/step1.vue';
    import Step2 from '@/components/Auth/step2.vue';
    import Step3 from '@/components/Auth/step3.vue';
    import Step4 from '@/components/Auth/step4.vue';
    export default {
    computed: {
      getstep () {
        return this.$store.getters.signupSigninStep
      }
    },
      methods:{
              hidemodal:function(){
                this.$emit('modalstatus',false); 
                this.$store.commit('updateErr','') 
              },
        },
        components: {
            appStepa: Step1,
            appStepb: Step2,
            appStepc: Step3,
            appStepd: Step4,
        }
    }
</script>
