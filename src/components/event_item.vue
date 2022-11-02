<template>
  <ion-col
    button :routerLink="`/tickets/${item.nomEvenement}`"
    class="parent ion-activatable ripple-parent">
    <div class="image">
      <img :src="'https://weka-pesa.com/shapp_images/logo_image/'+item.logoImage" alt="">
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
    <ion-button size="small"
      expand="full" fill="clear"
      class="ion-no-padding"
      @click.stop="emitScan">
      <ion-icon color="dark" slot="icon-only" :src="getIcon('qrCode')"/>
    </ion-button>
    <ion-ripple-effect></ion-ripple-effect>
  </ion-col>
</template>

<script >

export default {
  props: {
    item:{type:Object, required:true}
  },
  watch:{
    item(new_val){
      console.log(new_val)
    }
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
    },
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
ion-button{
  margin: 0;
  padding: 0;
}
.item{
  flex-grow: 1;
  margin-left: 10px;
}
.image{
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ccc;
}
img{
  min-height: 100%;
}
.small{
  font-size: .7em;
}
.title{
  font-size: .9em;
}
</style>