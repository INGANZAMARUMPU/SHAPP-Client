<template>
  <ion-app>
    <div v-if="!!active_user">
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
      var produits = JSON.parse(localStorage.getItem('produits'))
      this.$store.state.produits = produits
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
