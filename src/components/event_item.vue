<template>
  <ion-col
    button :routerLink="`/tickets/${item.nom}`"
    class="parent ion-no-padding ion-activatable ripple-parent">
    <div class="image">
      <img :src="item.image_base64" alt="">
    </div>
    <div class="item">
      <div><b>{{ item.nom }}</b></div>
      <div>{{ nb_places }} places, {{ " Le" }} {{ date(item.date) }}</div>
      <div>{{ item.address }}</div>
      <div class="tel">{{ item.tel_1 }} / {{ item.tel_2 }}</div>
      <div>{{ item.email }}</div>
    </div>
    <div text-center button class="options">
      <ion-button size="small" expand="full" fill="clear"
        @click.stop="emitScan">
        <ion-icon color="dark" slot="icon-only" :src="getIcon('qrCode')"/>
      </ion-button>
    </div>
    <ion-ripple-effect/>
  </ion-col>
</template>

<script >
import { alertController } from '@ionic/vue';

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
  margin: 0 10px 5px 10px;
}
.ion-no-padding{
  margin: 0;
}
ion-button{
  margin: 0;
  padding: 0;
}
.item{
  flex-grow: 1;
  margin-left: 10px;
}
.options{
  align-self: center;
}
.image{
  align-self: center;
  width: 80px;
  min-width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
img{
  min-height: 100%;
}
.tel{
  font-size: .7em;
  font-weight: 700;
}
</style>