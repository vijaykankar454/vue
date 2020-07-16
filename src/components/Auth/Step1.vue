<template>
    <div>
        <div class="modal-title" >
                <h4>Lets get started</h4>
                <p>Get best property deals</p>
            </div>
            <div class="form animate__animated animate__backInUp" >
                <div class="button-wrap"><a class="button block red" @click="updateStatus(1)">Sign Up / Sign In</a></div>
                <!--<div class="button-wrap"><a class="button block white" @click="updateStatus(4)">New user ? Signup</a></div>-->
        </div>
    </div>
</template>

<script>
export default {
     methods:{
              updateStatus:function(status){
                this.$ga.event({
                eventCategory:localStorage.getItem('virtual_key').replace('-', '_'),
                eventAction: 'Click_On_Sign_In_Sign_Up',
                eventLabel: 'Virtual_Expo_Home'
                }) 
                this.$store.commit('changeStatus',status);
              },
        },

    }
</script>
