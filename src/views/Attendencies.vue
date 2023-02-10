<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/events">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Présences</ion-title>
        <ion-buttons slot="secondary">
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
      <h3>{{ evenemt.nomEvenement }}</h3>
      <div class="line" v-for="person in evenemt.affectations">
        <div>
          {{ getFullName(person) }}
        </div>
        <div>
          <ion-icon color=danger :icon="getIcon('closeCircle')" v-if="person.etat==0"/>
          <ion-icon color=success :icon="getIcon('checkmarkCircle')" v-else/>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data(){
    return {
      evenemt:{},
    }
  },
  methods:{
    getFullName(person){
      if(person){
        return `${person.nomInvite} ${person.prenomInvite}`
      }
      return ""
    },
  },
  mounted(){
    let nom = this.$route.params.nom
    this.evenemt = this.$store.state.evenemts[nom]
  }
}
</script>
<style scoped>
h3{
  text-align: center;
  margin: 0!important;
  padding-bottom: 0;
}
.line{
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  padding: 5px 5px 5px 10px;
  margin: 5px 0;
  align-items: center;
}
</style>