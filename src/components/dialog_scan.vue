<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <QrcodeStream @decode="startScan" @error="throwScan"/>
      <ion-col class="options">
        <ion-button fill=clear @click="save">Laisser</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script>
import { popoverController } from '@ionic/vue';
import { QrcodeStream } from 'qrcode-reader-vue3'

export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false}
  },
  components:{ QrcodeStream},
  data(){
    return {
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
      } else {
      }
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    startScan(result){
      console.log(result)
      this.$emit("scanned")
    },
    throwScan(result){
      console.log(result)
    },
  }
};
</script>
<style scoped>
.options{
  padding-bottom: 0;
}
.body{
  max-height: 80vh;
  overflow-y: hidden;
}
.content{
  height: calc(80vh - 100px);
  overflow-y: auto;
}
</style>