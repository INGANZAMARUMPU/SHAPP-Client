<template>
  <ion-page>
    <ion-content>
      <div class="parent">
        <div class="img">
          <img width="160" src="/logo.png">
        </div>
        <div class="infos">
          SHAPP est une application Android conçue pour faciliter la création d'événements pour mariages, soutenances, conférences, ... à moindre coût. Plus besoin de se déplacer pour distribuer des invitations, juste un clic de partage via email, whatsapp, facebook,... Avec Shapp, je gère mes événements où que je sois. Pour plus d'informations, visitez
          <a href="https://shapp.dewiya.online" target="_blank">shapp.dewiya.online</a>
          ou contactez-nous par :
        </div>
        <div class="options">
          <div class="option">
            <div></div>
            <label>Téléphone : <a href="tel:243992135981">+243 854 565 495</a></label>
          </div>
          <div class="option">
            <div></div>
            <label>Téléphone : <a href="tel:25776956035">+257 76 95 60 35</a></label>
          </div>
          <div class="option">
            <div></div>
            <label>E-mail : <a href="mailto:info@jkm-tech.com">info-shapp@dewiya.online</a></label>
          </div>
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
.parent{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.infos{
  font-weight: 500;
  color: #444;
  font-size: 1.2em;
  text-align: center;
  line-height: 1.5em;
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
  margin-top: 20px;
}
</style>
