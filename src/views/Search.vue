<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPP</ion-title>
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/events">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h3>Les evenements !</h3>
      <div class="body">
        <input
          v-model="keyword"
          class="field" type="search"
          placeholder="Zone de cherche" autofocus>
        <div class="founds">
          <ion-col
            v-for="found in founds"
            class="found button ion-no-padding ion-activatable ripple-parent">
            <ion-icon :src="getIcon('beerOutline')"></ion-icon>
            <div>
              <strong>{{ found.nomEvenement }}</strong><br>
              <small>{{ found.adresseEvenement }} {{ found.dateEvenement }}</small>
            </div>
            <ion-ripple-effect/>
          </ion-col>
        </div>
      </div>
      <ion-fab-button class="todo-fab" routerLink="event/">
        <ion-icon :src="getIcon('add')"></ion-icon>
      </ion-fab-button>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  data(){
    return {
      founds: Object.values(this.$store.state.evenemts).slice(0,5),
      keyword: ""
    }
  },
  watch:{
    keyword(new_val){
      this.founds = Object.values(this.$store.state.evenemts).filter(x => {
        return (x.nomEvenement+x.adresseEvenement).includes(new_val)
      })
    }
  },
  methods: {
  }
};
</script>
<style scoped>
h3{
  text-align: left;
  margin-left: 10px;
  padding-bottom: 0;
}
.body{
  margin: 10px;
  padding: 10px 15px;
  box-shadow: 1px 1px 8px;
  border-radius: 20px;
  height: calc(100% - 160px);
  overflow-y: auto;
}
.field{
  margin: 10px;
  padding: 10px 20px;
  border: 0;
  background-color: #bbb;
  border-radius: 20px;
  width: calc(100% - 20px);
}
.found ion-icon{
  font-size: 2em;
  margin-right: 5px;
}
.found{
  padding: 10px 5px;
  display: flex;
  align-items: center;
}
.founds{
  height: calc(100% - 65px);
  overflow-y: auto;
}
</style>