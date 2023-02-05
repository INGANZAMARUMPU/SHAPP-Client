import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  IonApp, IonPage, IonicVue, IonRouterOutlet, IonIcon, IonTabs, IonLabel,
  IonInput, IonItem, IonButton, IonButtons, IonCol, IonContent, IonTabButton,
  IonTabBar, IonTitle, IonToolbar, IonHeader, IonMenuButton, IonFabButton,
  IonList, IonMenu, IonToggle, IonFooter, IonItemDivider, IonPopover, IonBadge,
  IonSelectOption, IonSelect, IonText, IonDatetime, toastController, IonSearchbar,
  IonSpinner, alertController, IonRippleEffect, IonTextarea 
} from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css'
import * as allIcons from "ionicons/icons";
import { App as CapacitorApp } from '@capacitor/app';

window.axios = axios;
const app = createApp(App).use(IonicVue).use(router).use(store);

app.component("IonRouterOutlet", IonRouterOutlet)
app.component("IonApp", IonApp)
app.component("IonPage", IonPage)
app.component("IonTabs", IonTabs)
app.component("IonLabel", IonLabel)
app.component("IonInput", IonInput)
app.component("IonItem", IonItem)
app.component("IonSearchbar", IonSearchbar)
app.component("IonButton", IonButton)
app.component("IonButtons", IonButtons)
app.component("IonCol", IonCol)
app.component("IonIcon", IonIcon)
app.component("IonContent", IonContent)
app.component("IonTabButton", IonTabButton)
app.component("IonTabBar", IonTabBar)
app.component("IonTitle", IonTitle)
app.component("IonToolbar", IonToolbar)
app.component("IonHeader", IonHeader)
app.component("IonMenuButton", IonMenuButton)
app.component("IonFabButton", IonFabButton)
app.component("IonList", IonList)
app.component("IonMenu", IonMenu)
app.component("IonToggle", IonToggle)
app.component("IonFooter", IonFooter)
app.component("IonItemDivider", IonItemDivider)
app.component("IonPopover", IonPopover)
app.component("IonBadge", IonBadge)
app.component("IonSelectOption", IonSelectOption)
app.component("IonSelect", IonSelect)
app.component("IonText", IonText)
app.component("IonDatetime", IonDatetime)
app.component("IonSpinner", IonSpinner)
app.component("IonTextarea", IonTextarea)
app.component("IonRippleEffect", IonRippleEffect)

app.mixin({
  methods: {
    getIcon(name) {
      return allIcons[name];
    },
    money(x) {
      let cash = parseFloat(x).toFixed(0)
      if(!x) return "0";
      return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    isNumeric(x) {
      let str = x.toString();
      if (str.match(/^[0-9]+$/)) return true;
      return false;
    },
    logOut(x) {
      alertController.create({
        header: 'Attention!',
        message: 'Voulez-vous vraiment vous déconnecter ?',
        buttons: [
          {
            text: 'laisser',
            role: 'cancel'
          },
          {
            text: 'OUI',
            handler: () => {
              this.$store.state.user = null
              localStorage.removeItem('user')
              localStorage.removeItem("unvalidated_user")
              this.$router.push("/")
            },
          },
        ],
      }).then(res => {
        res.present();
      });
    },
    money(x) {
      let cash = parseFloat(x).toFixed(0)
      if(!x) return "0";
      return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    formatedDate(x) {
      if(!x) return "-"
      let date = new Date(x);
      return new Intl.DateTimeFormat(
        'en-GB',
        { dateStyle: 'short' }
      ).format(date)
    },
    formatedTime(x) {
      if(!x) return "-"
      let date = new Date(x);
      return new Intl.DateTimeFormat(
        'en-GB',
        { timeStyle: 'short' }
      ).format(date)
    },
    makeToast(title, message, duration=5000){
      toastController.create({
        header: title,
        message: this.cleanString(message).slice(0, 240),
        icon: this.getIcon('informationCircleOutline'),
        duration:duration,
        buttons: [
          {
            text: 'OK',
            handler: () => {}
          }
        ]
      }).then(toast => {
        toast.present();
      });
    },
    errorOrRefresh(error, callback){
      if(!!error.response){
        if(error.request.status == 403){
          this.$store.state.refreshing_token = true
          let refresh = this.user.refresh_token
          if(!refresh){
            this.$store.state.user = null;
            return
          }
          let headers = {
            headers:{
              "Authorization":"Bearer "+refresh
            }
          }
          axios.get(this.url+"/token/refresh", headers)
          .then((response) => {
            this.$store.state.user.access_token = response.data.access_token
            if(typeof callback == "function") callback()
          }).catch((error) => {
            this.$store.state.user = null;
            console.error(error)
            this.makeToast(this.cleanString(error.response.data))
          }).finally(() => {
            this.$store.state.refreshing_token = false
          })
        } else {
          this.makeToast(this.cleanString(error.response.data))
        }
      }
    },
    cleanString(str){
      if (!str) return "";
      if(typeof(str)=='object'){
        let string = ""
        for( let [clef, valeur] of Object.entries(str)){
          if(typeof(valeur)=='object'){
            let child = ""
            for( let [key, value] of Object.entries(valeur)){
              child += `- ${key}: ${value}. `
            }
            valeur = child;
          }
          string+=`${clef}: ${valeur}. `
        }
        return string;
      };
      str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
    },
    isExpired(item){
      let date = new Date(item.dateEvenement)
      date.setDate(date.getDate()+1)
      date.setHours(6, 0, 0, 0)
      return new Date() > date
    },
    openEvent(item){
      if(this.isExpired(item)){
        this.makeToast("Wait", "fetching attendencies...")
        this.fetchAffectations(item, () => {
          this.$router.push(`/attendencies/${item.nomEvenement}`)
        })
      } else {
        this.makeToast("Wait", "updating affectations...")
        this.fetchAffectations(item, () => {
          this.$router.push(`/tickets/${item.nomEvenement}`)
        })
      }
    },
    fetchAffectations(event, callback){
      let affectations = {}
      axios.get(this.url+`/invitation/${event.id}`, this.headers)
      .then((response) => {
        let key
        for(let item of response.data){
          key = `${event.id}_${item.place.id}_${item.idInvitation}`
          affectations[key] = item
        }
        event["affectations"] = affectations
        this.$store.state.evenemts[event.nomEvenement] = event
        localStorage['evenemts'] = JSON.stringify(this.$store.state.evenemts)
        if(!!callback){
          callback()
        }
      }).catch((error) => {
        console.error(error)
        this.errorOrRefresh(error, () => this.fetchAffectations(event, callback))
      })
    },
  },
  computed:{
    headers(){
      return {
        headers:{
          "Authorization":"Bearer "+this.$store.state.user.access_token
        }
      }
    },
    user(){
      return this.$store.state.user
    },
    force_json(){
      return {
        headers:{
          "ContentType":"application/json"
        }
      }
    },
    url(){
      return this.$store.state.url
    }
  }
})
CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if((!canGoBack) || (window.history.state.back == null)){
    CapacitorApp.exitApp();
  } else {
    window.open(window.history.state.back, "_self")
  }
});
app.mount('#app');