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
            <ion-select-option v-for="agent in agents" :value="agent.codeAgent">
              {{ agent.ssid }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div class="label">
          <div v-if="selected_agent">
            <div class="agent">{{ selected_agent.nomAgent }}</div>
            <div>{{ code_agent }}</div>
          </div>
          <div v-else>
            <div class="agent disabled">Agent</div>
            <div class="disabled">-</div>
          </div>
        </div>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Saisir le nombre des credits ex.500 (*)</ion-label>
          <ion-input type=number
            placeholder="Saisir le nombre des credits ex.500 (*)"
            :value="credits"
            @IonChange="credits=$event.target.value" clearInput/>
        </ion-item>
        <div class="label">
          {{ money(agentGet("prix") * credits) }} {{ agentGet('devise') }}
        </div>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez No. de transaction apres retrait (*)</ion-label>
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
      credits:0,
      num_transaction:"",
      agents:[],
      selected_agent: null
    }
  },
  watch:{
    code_agent(new_val){
      this.selected_agent = this.agents.find(x => x.codeAgent == new_val)
    }
  },
  methods:{
    changePassword(){
    },
    agentGet(field){
      return !!this.selected_agent?this.selected_agent.tarifCredit[field]:null
    },
    fetchMobiles(){
      axios.get(this.url+"/mobilesAll")
      .then((response) => {
        this.agents = response.data.filter(x => {
          return x.tarifCredit.codePays == this.user.code_pays
        })
      }).catch((error) => {
        console.error(error);
      })
    }
  },
  mounted(){
    this.fetchMobiles()
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
  padding: 15px;
  text-align: center;
  font-weight: 700;
}
.disabled{
  color: gray;
}
.agent{
  font-size: .8em;
  font-weight: 500;
}
</style>