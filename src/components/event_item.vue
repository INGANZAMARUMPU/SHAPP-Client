<template>
  <div @click="openEvent(item)">
  <ion-col
    class="parent ion-activatable ripple-parent">
    <div class="image">
      <img :src="item.logoImage" alt="">
    </div>
    <div class="item">
      <div class="title"><b>{{ item.nomEvenement }}</b></div>
      <div class="small">
        {{ " Le" }} {{ formatedDate(item.dateEvenement) }} à {{ item.heureEvenement }}
      </div>
      <div class="small">
        {{ item.adresseEvenement }}
      </div>
    </div>
    <ion-button v-if="!isExpired(item)" size="small"
      @click.stop="emitScan">
      <ion-icon color="light" slot="icon-only" :src="getIcon('qrCode')"/>
    </ion-button>
    <ion-button v-else size="small">
      <ion-icon color="light" slot="icon-only" :src="getIcon('barChart')"/>
    </ion-button>
    <ion-ripple-effect></ion-ripple-effect>
  </ion-col>
  </div>
</template>

<script >

export default {
  props: {
    item:{type:Object, required:true}
  },
  computed:{
    nb_places(){
      return this.item.places.reduce((acc, x) =>{
        return acc += x.nombre
      }, 0)
    }
  },
  methods: {
    emitScan(){
      this.$emit("scan", this.item)
    }
  },
};
</script>
<style scoped>
*{
  color: #666;
}
.parent{
  display: flex;
  margin: 0;
  align-items: center;
  padding: 10px;
}
.item{
  flex-grow: 1;
  margin-left: 10px;
}
.image{
  position: relative;
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ccc;
}
ion-button{
  --padding-right:0;
  --padding-left:0;
  width: 35px;
  height: 35px;
}
img{
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.small{
  font-size: .7em;
}
.title{
  font-size: .9em;
}
</style>