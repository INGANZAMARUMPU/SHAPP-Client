<template>
  <ion-page>
    <ion-content>
      <div class="img">
        <img width="160" src="/logo.png">
      </div>
      <div class="infos">
        SHAPP est une application Android conçue pour faciliter la création d'événements pour mariages, soutenances, conférences, ... à moindre coût. Plus besoin de se déplacer pour distribuer des invitations, juste un clic de partage via email, whatsapp, facebook,... Avec Shapp, je gère mes événements où que je sois. Pour plus d'informations, visitez
        <a href="https://shapp.jkmtech.com" target="_blank">https://shapp.jkmtech.com</a>
        ou contactez-nous par :
      </div>
      <div class="options">
        <div class="option">
          <div></div>
          <label>E-mail : <a href="mailto:info@jkm-tech.com">info@jkm-tech.com</a></label>
        </div>
        <div class="option">
          <div></div>
          <label>Téléphone : <a href="tel:243992135981">+243 99 21 35 981</a></label>
        </div>
        <div class="option">
          <div></div>
          <label>Téléphone : <a href="tel:25776956035">+257 76 95 60 35</a></label>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  components:{
  },
  data(){
    return {
    }
  },
  methods:{
  },
  mounted(){
  }
}
</script>
<style scoped>
ion-content>*{
  margin: 20px;
}
.infos{
  font-weight: 550;
  font-size: 1.2em;
  text-align: center;
  line-height: 1.5em;
}
.img{
  height: 100px;
  overflow-y: hidden;
  position: relative;
}
img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.option{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.option div{
  width: 20px;
  height: 20px;
  border: 2px solid black;
  display: inline-block;
  margin-right: 10px;
  background-color: var(--secondary-color);
}
.options{
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-60%);
}
</style>
