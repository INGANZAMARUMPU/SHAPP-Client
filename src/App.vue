<template>
  <ion-app>
    <ion-router-outlet :key="$route.fullPath"/>
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
      if(!!evenemts){
        this.$store.state.evenemts = evenemts
      } else {
        this.$store.state.evenemts = {}
      }
    }
  },
  watch:{
    "$store.state.user"(new_val){
      if(!new_val){
        this.$router.push("/login")
      }
    },
    '$route'(to, from){
      if(to.path != "/profile" && to.path != "/login"){
        if(!this.$store.state.user){
          console.log('BACK TO LOGIN')
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
    } else {
      this.loadData()
    }
  },
};
</script>
<style src="./style.css">
</style>
