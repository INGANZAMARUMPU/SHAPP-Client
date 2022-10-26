<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPP</ion-title>
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
            <ion-item button  routerLink="/events">
              <ion-label>Evenements</ion-label>
              <ion-icon :src="getIcon('listOutline')"/>
            </ion-item>
            <ion-item button  routerLink="/credit">
              <ion-label>Achat Credits</ion-label>
              <ion-icon :src="getIcon('cashOutline')"/>
            </ion-item>
            <ion-item button routerLink="/password">
              <ion-label>Mot de passe</ion-label>
              <ion-icon :src="getIcon('pencil')"/>
            </ion-item>
            <ion-item button @click="logOut">
              <ion-label>Deconnexion</ion-label>
              <ion-icon :src="getIcon('powerOutline')"/>
            </ion-item>
            <ion-item button routerLink="/about">
              <ion-label>À propos de SHAPP</ion-label>
              <ion-icon :src="getIcon('helpCircleOutline')"/>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-header>
    <ion-content>
      <CreditBar/>
      <div class="img">
        <img width="240" src="/home.jpeg">
      </div>
      <h3>Bienvenue chez SHAPP !</h3>
      <p class="infos">
Avec SHAPP vous pouvez créer vos
propres invitations et les partager via
whatsapp, facebook, gmail, . . . sans
encourir beaucoup de frais et sans
avoir à vous déplacer !
      </p>
      <ion-button expand="full" routerLink="/events">
        C'est maintenant ou jamais !
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import CreditBar from "../components/credit_bar"
export default {
  components:{
    CreditBar
  },
  data(){
    return {
    }
  },
  methods:{
  },
}
</script>
<style scoped>
ion-content>p, ion-content>ion-button{
  margin: 20px 20px 0 20px;
}
.infos{
  font-size: 1em;
  text-align: center;
  line-height: 1.5em;
}
.img{
  height: 200px;
  overflow-y: hidden;
  position: relative;
  margin: 40px auto;
}
img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
