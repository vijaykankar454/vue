<template>
    <div><div class="modal-title" >
                <h4>Set Account Details</h4>
                <p>Just complete last step</p>
            </div>
            <form @submit.prevent="onRegister">
               <p class="error">{{getLoginErr}}</p>
            <div class="form animate__animated animate__backInUp" >
                <div class="input-wrap"> <input 
                        type="text" 
                        id="full_name" 
                        @blur="$v.full_name.$touch()" 
                        class="input"  autocomplete="off" 
                        v-model="full_name" min="0" 
                        placeholder="Enter Full Name">
                 <p class="error"  v-if="!$v.full_name.required && submitStatus=='ERROR'">Please  enter Full Name.</p>
               
                </div>


                 <div class="input-wrap"> <input 
                        type="email" autocomplete="off" 
                        id="email" 
                        @blur="$v.email.$touch()" 
                        class="input" 
                        v-model="email" 
                        placeholder="Enter Email.">
                <p  class="error"  v-if="!$v.email.email">Please provide a valid email address.</p>
                <p  class="error"  v-if="!$v.email.required && submitStatus=='ERROR'">This field must not be empty.</p>
                </div>


              
                <div class="input-wrap"><input 
                                    type="password" 
                                    id="password"  
                                    @blur="$v.mobile.$touch()" 
                                    class="input" 
                                    v-model="password" 
                                    placeholder="Enter Password">
                 <p class="error"  v-if="!$v.password.required && submitStatus=='ERROR'">Please  enter password.</p>
                         <p  class="error"  v-if="!$v.password.minLength">Minimum length is 4 characters</p>
                         <p  class="error"  v-if="!$v.password.maxLength">Maximum length is 40 characters</p></div>
                <div class="button-wrap"><button  type="submit"  class="button block uppercase red">Register</button></div>
                <div class="button-wrap text-center" @click="updateStatus(1)">Existing user ? <a>Login</a></div>
            </div>
            </form>
    </div>
</template>

<script>
 import { required, email,numeric, integer,minValue, minLength, maxLength} from 'vuelidate/lib/validators'
export default {
     data () {
      return {
        email: '',
        full_name: '',
        password: '',
        submitStatus: null
      }
    },
    validations: {
    email: {
        required,
        email
      },
      full_name: {
        required
      },
      password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20),
      }
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
               onRegister () {
               
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    const formData = {
                        full_name: this.full_name,
                        password: this.password,
                        email_id: this.email,
                        login_by:'',
                        request_from:'registration'
                    }
                    this.$store.dispatch('signup', formData)
                  }
                }
        },

    }
</script>

