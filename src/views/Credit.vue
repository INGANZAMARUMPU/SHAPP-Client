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
      <div class="center">
        Un crédit équivaut à une invitation et il a un prix adapté à vos moyens
      </div>
      <div class="ion-padding">
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Choisir moyen de paiement (Liste) (*)</ion-label>
          <ion-select
            multiple="false"
            :value="code_agent"
            @IonChange="code_agent=$event.target.value"
            cancel-text="laisser" ok-text="Choisir">
            <ion-select-option value="531123">
              Ecocash
            </ion-select-option>
            <ion-select-option value="12138">
              Lumicash
            </ion-select-option>
            <ion-select-option value="68824">
              Enoti
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div class="label">
          {{ code_agent }}
        </div>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Saisir le nombre des credits ex.500 (*)</ion-label>
          <ion-input type=number
            placeholder="Saisir le nombre des credits ex.500 (*)"
            :value="credit"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <div class="label">
          {{ "5 555 486" }}
        </div>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez No de transaction apres retrait (*)</ion-label>
          <ion-input type=text
            placeholder="Tapez No de transaction apres retrait (*)"
            :value="num_transaction"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-button expand="full" @click="changePassword" style="margin-top: 40px;">
          <ion-spinner v-if="loging_in"
            name="crescent" color="light" style="margin: 0 10px;"/>
          Acheter
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  data(){
    return {
      code_agent:"-",
      credit:"",
      num_transaction:""
    }
  },
  methods:{
    changePassword(){
    }
  }
}
</script>
<style scoped>
.ion-padding{
  padding: 20px;
}
.ion-padding>*{
  margin-bottom: 10px;
}
.label{
  background-color: white;
  border-radius: 30px;
  height: 60px;
  padding: 25px;
  text-align: center;
  font-weight: 700;
}
</style>