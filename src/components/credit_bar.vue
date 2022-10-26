<template>
  <div>
    <div class="credit">
      vous avez {{ money(user.quantite_credit) }} credits
      <ion-button>
        <ion-icon :src="getIcon('refresh')"/>
      </ion-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    generateQRs(){
    }
  },
};
</script>
<style scoped>
</style>