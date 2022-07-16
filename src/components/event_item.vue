<template>
  <ion-col :data-id='item.id' class="parent ion-no-padding" button>
    <div class="image">
      <img :src="item.image_base64" alt="">
    </div>
    <div class="item">
      <div><b>{{ item.nom }}</b></div>
      <div>{{ " Le" }} {{ date(item.date) }}</div>
      <div>{{ item.address }}</div>
      <div class="tel">{{ item.tel_1 }} / {{ item.tel_2 }}</div>
      <div>{{ item.email }}</div>
    </div>
    <div text-center button class="options">
      <ion-button size="small" expand="full" fill="clear" @click="$emit('print')">
        <ion-icon color="dark" slot="icon-only" :src="getIcon('print')"/>
      </ion-button>
      <ion-button size="small" expand="full" fill="clear" @click.stop="deleteCommande">
        <ion-icon color="danger" slot="icon-only" :src="getIcon('close')"/>
      </ion-button>
    </div>
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
  },
  methods: {
    deleteCommande(){}
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