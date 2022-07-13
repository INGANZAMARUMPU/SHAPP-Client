<template>
  <ion-app>
    <div v-if="!!$store.state.user">
      <keep-alive>
        <ion-router-outlet/>
      </keep-alive>
    </div>
    <LoginForm v-else/>
  </ion-app>
</template>
<script>
import { useIonRouter, menuController } from '@ionic/vue';
import LoginForm from "./components/login_form"

export default {
  components: { LoginForm },
  data(){
    return {
    }
  },
  watch:{
    "$store.state.user":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem('user', JSON.stringify(new_val));
        } else {
          localStorage.removeItem('user')
        }
      }
    }
  },
  methods:{
    loadData(){
      let user = this.$store.state.user;
      var evenemts = JSON.parse(localStorage.getItem('evenemts'))
      this.$store.state.evenemts = evenemts
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.loadData()
    }
  },
};
</script>
<style src="./style.css">
</style>
