<template>
  <div>
    <ion-col v-if="user" class="credit ion-no-padding">
      Vous avez {{ money(user.quantite_credit) }} crédits
      <ion-spinner v-if="is_fetching" name="crescent"/>
      <ion-button v-else size="small" fill="clear"
        @click="fetchCredits">
        <ion-icon :src="getIcon('refresh')"/>
      </ion-button>
    </ion-col>
  </div>
</template>

<script>
export default {
  data(){
    return {
      is_fetching:false
    }
  },
  methods: {
    fetchCredits(){
      this.is_fetching = true
      axios.get(this.url+"/credit/profile", this.headers)
      .then((response) => {
        this.user.quantite_credit = response.data.quantite_credit
      }).catch((error) => {
        this.errorOrRefresh(error, this.fetchCredits)
      }).finally(() => {
        this.is_fetching = false
      })
    }
  },
};
</script>
<style scoped>
ion-button, ion-spinner{
  position: absolute;
  height: 15px;
  width: 40px;
  padding: 0;
  color: blue;
}
ion-button{
  top: -3px;
  right: -5px;
}
ion-spinner{
  top: 0;
  right: 0;
}
</style>