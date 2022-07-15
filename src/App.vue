<template>
  <ion-app>
    <keep-alive>
      <ion-router-outlet/>
    </keep-alive>
  </ion-app>
</template>
<script>
import { useIonRouter, menuController } from '@ionic/vue';

export default {
  data(){
    return {
    }
  },
  methods:{
    loadData(){
      var evenemts = JSON.parse(localStorage.getItem('evenemts'))
      this.$store.state.evenemts = evenemts
    }
  },
  watch:{
    "$store.state.user"(new_val){
      if(!new_val){
        if(this.$route.path != "profile"){
          this.$router.push("/login")
        }
      }
    },
    '$route' (to, from){
      if(to.path != "/profile" || to.path != "/login"){
        if(!this.$store.state.user){
          this.$router.push("/login")
        }
      }
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    this.$store.state.user = user
    if(!user){
      this.$router.push("/login")
    }
  },
};
</script>
<style src="./style.css">
</style>
