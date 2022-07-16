<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Tickets</ion-title>
        <ion-buttons slot="secondary">
          <ion-button @click="showSearch">
            <ion-icon slot="icon-only" :icon="getIcon('search')"/>
          </ion-button>
          <ion-button id="menu-toggler">
            <ion-icon slot="icon-only"
              :ios="getIcon('ellipsisHorizontal')"
              :md="getIcon('ellipsisVertical')"/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-popover trigger="menu-toggler" dismiss-on-select="true" show-backdrop="false">
        <ion-content>
          <ion-list lines="none">
            <ion-item button @click="logOut">
              <ion-label>Deconnexion</ion-label>
              <ion-icon :src="getIcon('powerOutline')"/>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-header>
    <ion-content class="ion-padding">
      <h3>{{ evenemt.nom }}</h3>
      <ion-col v-for="place in evenemt.places">
        <ion-item-divider color="light">{{ place.nom.toUpperCase() }}</ion-item-divider>
        <div class="qrs">
          <div class="item" v-for="i in place.nombre">
            <div class="qr">
              
            </div>
            <div class="descr">
              place {{ i+1 }}
            </div>
          </div>
        </div>
      </ion-col>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  components:{ },
  data(){
    return {
      evenemt:{}
    }
  },
  methods:{
    showSearch(){},
  },
  mounted(){
    let nom = this.$route.params.nom
    this.evenemt = this.$store.state.evenemts[nom]
  }
}
</script>
<style>
h3{
  text-align: center;
}
.qrs{
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  justify-content: space-between;
}
.qr{
  margin-top: 10px;
  width: 120px;
  height: 120px;
  background-color: #ddd;
}
.descr{
  text-align: center;
}
</style>