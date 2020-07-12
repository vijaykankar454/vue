<template>
    <div><div class="modal-title" > 
                <h4>Enter OTP</h4>
                <p>sent to your mobile</p>

            </div><p class="error">{{getLoginErr}}</p>
            <div class="form animate__animated animate__backInUp" >
               
                 <vue-otp-field  :onFill="onFill" /></vue-otp-field><br>
                <div class="button-wrap" ><button @click="onOtpSubmit" class="button block uppercase red">Submit</button></div>
                <div class="button-wrap flex" style="justify-content: space-around;"><div>{{getrecentmobile}} <a   @click="updateStatus(1)">Edit</a><br> mobile no.</div><div>Didn't receive OTP ? <a @click="onRecentOTP">Resend</a></div></div>
            </div>
    </div>
</template>

<script>
    import VueOTPField from '@/components/VueOTPField.vue'
     export default {
        data () {
            return {
                showButton: false,
                OTP :'',
                getOTPErr :''
            }
        },
        computed: {
            getrecentmobile () {
                return this.$store.getters.recentmobile
            },
            getLoginErr () {
                return this.$store.getters.getupdateErr
            }
        },
        methods:{
                updateStatus:function(status){
                    this.$store.commit('updateErr','') 
                    this.$store.commit('changeStatus',status);
                },
              
                onFill (val) {
                    if(val.isFieldsComplete){ this.showButton = true; this.OTP =val.values }else{ this.showButton = false ;this.OTP =val.values}
                },
                onOtpSubmit(){
                    if(this.showButton){
                        this.getOTPErr  =''
                         const formData = {
                            mobile: this.$store.getters.recentmobile,
                            otp:this.OTP
                        }
                        this.$store.dispatch('verifyOTP', formData)
                    }else{
                        this.$store.commit('updateErr','Please fill all fields.')
                    }
                },
                onRecentOTP () {
               
                if (!this.$store.getters.recentmobile) {
                    this.$store.commit('updateErr','Mobile number not exist.')
                } else {
                    const formData = {
                        mobile: this.$store.getters.recentmobile
                    }
                    //this.$store.dispa
                    this.$store.dispatch('login', formData)
                }
                }
            
            },
            components: {
                'vue-otp-field':VueOTPField
            },
    }
</script>
