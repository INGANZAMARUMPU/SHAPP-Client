<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPP</ion-title>
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-no-padding">
      <h3>Dépenser moins !</h3>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  data(){
    return {
    }
  },
  methods:{
    create(){
    }
  }
}
</script>
<style scoped>
</style>