<template>
  <ion-page>
    <ion-content>
      <div class="parent">
        <div class="img">
          <img width="160" src="/logo.png">
        </div>
        <div class="infos">
          SHAPPU est une application mobile conçue pour faciliter la création d'événements pour mariages, soutenances, conférences, ... à moindre coût. Plus besoin de se déplacer pour distribuer des invitations, juste un clic de partage via email, whatsapp, facebook,... Avec SHAPPU, je gère mes événements où que je sois. Pour plus d'informations, visitez
          <a href="https://shappu.com" target="_blank">shappu.com</a>
          ou contactez-nous par :
        </div>
        <div class="options">
          <div class="option">
            <div>
              <ion-icon :src="getIcon('call')"></ion-icon>
            </div>
            <label>Téléphone : <a href="tel:243993696171">+243 993 696 171</a></label>
          </div>
          <div class="option">
            <div>
              <ion-icon :src="getIcon('logoWhatsapp')"></ion-icon>
            </div>
            <label>Whatsapp : <a href="https://wa.me/16892674454" target="_top">+1 689 267 4454</a></label>
          </div>
          <div class="option">
            <div>
              <ion-icon :src="getIcon('at')"></ion-icon>
            </div>
            <label>E-mail : <a href="mailto:info@shappu.com" target>info@shappu.com</a></label>
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
