<template>
    <div><div class="modal-title"  >
                <h4>Best Property Deals</h4>
                <p>Just a step away</p>
            </div>
             <form @submit.prevent="onSubmit">
               <p class="error">{{getLoginErr}}</p>
            <div class="form animate__animated animate__backInUp">
                <div class="input-wrap" :class="{invalid: $v.mobile.$error}">
                    <input 
                        type="text" 
                        id="mobile" autocomplete="off" 
                        @blur="$v.mobile.$touch()" 
                        class="input" 
                        v-model="mobile" 
                        placeholder="Enter Mobile no.">
                          <p class="error"  v-if="!$v.mobile.required && submitStatus=='ERROR'">Please  enter  Mobile Number.</p>
                <p  class="error"  v-if="!$v.mobile.minLength">Allow only 10 characters</p>
                <p  class="error"  v-if="!$v.mobile.maxLength">Allow only 10 characters</p>
                 <p  class="error"  v-if="!$v.mobile.integer">Please enter valid mobile number</p>
                        </div>
                <!--<div class="input-wrap"><input 
                                    type="password" 
                                    id="password" 
                                    @blur="$v.mobile.$touch()" 
                                    class="input" 
                                    v-model="password" 
                                    placeholder="Enter Password">
                 <p class="error"  v-if="!$v.password.required && submitStatus=='ERROR'">Please  enter password.</p>
                         <p  class="error"  v-if="!$v.password.minLength">Minimum length is 4 characters</p>
                         <p  class="error"  v-if="!$v.password.maxLength">Maximum length is 40 characters</p>
                </div>-->
                <div class="button-wrap"><button type="submit" class="button block uppercase red" >Login</button></div>
                <!--<div class="button-wrap text-center"  @click="updateStatus(4)">New user ? <a>Signup</a></div>-->
            </div>
             </form>
    </div>
</template>

<script>
 import { required, integer,numeric, minValue, minLength, maxLength} from 'vuelidate/lib/validators'
export default {
     data () {
      return {
        mobile: '',
        password: '',
        submitStatus: null
      }
    },
    validations: {
        mobile: {
        required,
        integer,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
     /* password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20),
      }*/
    },
    computed: {
        getLoginErr () {
            return this.$store.getters.getupdateErr
        }
    },
     methods:{
              updateStatus:function(status){
                this.$store.commit('changeStatus',status);
              },
             onSubmit () {
               
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    const formData = {
                        mobile: this.mobile
                    }
                    //this.$store.dispa
                    this.$store.dispatch('login', formData)
                }
                }
    },

    }
</script>
