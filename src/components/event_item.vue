<template>
  <ion-col
    button :routerLink="`/tickets/${item.nom}`"
    class="parent ion-activatable ripple-parent">
    <div class="image">
      <img :src="item.image_base64" alt="">
    </div>
    <div class="item">
      <div class="title"><b>{{ item.nom }}</b></div>
      <div class="small">
        {{ nb_places }} places, {{ " Le" }} {{ formatedDate(item.date) }}
      </div>
      <div class="small">
        {{ item.address }}
      </div>
    </div>
    <ion-button size="small" expand="full" fill="clear"
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