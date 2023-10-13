<template>
  <ion-page>
    <ion-content>
      <h3>Bienvenue à bord !</h3>
      <div class="center">Nous vous aidons à accomplir vos tâches sans vous déplacer</div>
      <ion-col>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez votre Nom (*)</ion-label>
          <ion-input type="text"
            placeholder="Tapez votre Nom (*)"
            :value="nom"
            @IonChange="nom=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez votre Prénom (*)</ion-label>
          <ion-input type="text"
            placeholder="Tapez votre Prénom (*)"
            :value="prenom"
            @IonChange="prenom=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Choisir votre pays ex. RDC (*)</ion-label>
          <ion-select
            multiple="false"
            :value="codePays"
            @IonChange="codePays=$event.target.value"
            cancel-text="laisser" ok-text="Choisir">
            <ion-select-option value="+250">
              Rwanda
            </ion-select-option>
            <ion-select-option value="+243">
              RDC
            </ion-select-option>
            <ion-select-option value="+257">
              Burundi
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div class="greff" v-if="!!codePays">
          <label class="greffon">
            {{ codePays }}
          </label>
          <ion-item class="round ion-no-padding">
            <ion-label position="floating">Numéro de téléphone (*)</ion-label>
            <ion-input type="text"
              placeholder="Numéro de téléphone (*)"
              :value="telephone"
              @IonChange="telephone=$event.target.value"
              clearInput/>
          </ion-item>
        </div>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez votre adresse mail</ion-label>
          <ion-input type="adresseMail"
            placeholder="Tapez votre adresse mail"
            :value="adresseMail"
            @IonChange="adresseMail=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez Nom d’utilisateur (*)</ion-label>
          <ion-input type="text"
            placeholder="Tapez Nom d’utilisateur (*)"
            :value="username"
            @IonChange="username=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez Mot de passe (*)</ion-label>
          <ion-input type=password
            placeholder="Tapez Mot de passe (*)"
            :value="password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-button color="primary" expand="full" @click="save">
          S'inscrire
        </ion-button>
        <div class="center">
          Vous avez déjà un compte ?
          <ion-button
            size="small"  fill="clear"
            routerLink="/login"
            class="ion-no-padding link">
            S'identifier
          </ion-button>
        </div>
        <div class="center" style="margin-top: 30px;">
          <a class="url" href="https://shappu.com" target="_blank">
            Visitez : https://shappu.com
          </a>
        </div>
      </ion-col>
    </ion-content>
    <DialogConfirm
      :active = "confirm_shown"
      :item = "unvalidated_user"
      @close = "close"/>
  </ion-page>
</template>

<script>
import DialogConfirm from '../components/dialog_confirm'

export default {
  components:{
    DialogConfirm,
  },
  data(){
    return {
      nom: "",
      prenom: "",
      telephone: "",
      adresseMail: "",
      username: "",
      password: "",
      codePays:"",
      unvalidated_user:null,
      confirm_shown: false
    }
  },
  methods:{
    close(){
      this.$router.push("/login")
    },
    save(){
      this.makeToast("Success", "Votre compte sera bientôt valider après paiement")
      this.unvalidated_user = {      
        nom: this.nom,
        prenom: this.prenom,
        telephone: this.telephone,
        adresseMail: this.adresseMail,
        username: this.username,
        password: this.password,
        codePays: this.codePays
      }
      localStorage["unvalidated_user"] = JSON.stringify(this.unvalidated_user)
      this.confirm_shown = true
    }
  },
  mounted(){
    let str_unvalidated_user = localStorage["unvalidated_user"]
    try {
      this.unvalidated_user = JSON.parse(str_unvalidated_user)
    } catch(e) {
      console.log("not unvalidated_user found")
      return
    }
    if(!!this.unvalidated_user && !!this.unvalidated_user.telephone){
      this.nom = this.unvalidated_user.nom
      this.prenom = this.unvalidated_user.prenom
      this.telephone = this.unvalidated_user.telephone
      this.adresseMail = this.unvalidated_user.adresseMail
      this.username = this.unvalidated_user.username
      this.password = this.unvalidated_user.password
      this.pays = this.unvalidated_user.pays

      // this.confirm_shown = true
    } else {
      localStorage.removeItem("unvalidated_user")
      this.confirm_shown = false
    }
  }
}
</script>
<style scoped>
ion-button{
  margin: 10px;
}
ion-label label{
  font-weight: 650;
}
.descr{
  white-space: wrap!important;
}
h3{
  text-align: center;
  font-weight: 700;
}
.ion-no-padding{
  margin: 10px;
}
input, select{
  padding: 5 10px!important;
}
.greff{
  position: relative;
}
.greff .greffon{
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 40px;
}
.greff ion-item::part(native) {
  margin-left: 40px;
}
</style>
