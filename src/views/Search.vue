<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPP</ion-title>
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h3>Les evenements !</h3>
      <div class="body">
        <input class="field" type="text" placeholder="Zone de cherche" autofocus>
        <div class="founds">
          <ion-col
            v-for="found in founds"
            class="found button ion-no-padding ion-activatable ripple-parent">
            <div class="option"></div>
            <label>{{ found }}</label>
            <ion-ripple-effect/>
          </ion-col>
        </div>
      </div>
      <ion-fab-button class="todo-fab" routerLink="event/">
        <ion-icon :src="getIcon('add')"></ion-icon>
      </ion-fab-button>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  data(){
    return {
      founds:[
        "Mariage Jonathan NKURUNZINZA",
        "Mariage Jeremie KABONDO",
        "Fete de soutenance .............",
        "Fete de soutenance .............",
        "Fete de soutenance .............",      ]
    }
  },
  methods: {
  }
};
</script>
<style scoped>
h3{
  text-align: left;
  margin-left: 10px;
  padding-bottom: 0;
}
.body{
  margin: 10px;
  padding: 10px 15px;
  box-shadow: 1px 1px 8px;
  border-radius: 20px;
  height: calc(100% - 160px);
  overflow-y: auto;
}
.field{
  margin: 10px;
  padding: 10px 20px;
  border: 0;
  background-color: #bbb;
  border-radius: 20px;
  width: calc(100% - 20px);
}
.option{
  margin-right: 10px;
  width: 15px;
  height: 15px;
  border: 2px solid black;
}
.found{
  padding: 10px 5px;
  display: flex;
  align-items: center;
}
.founds{
  height: calc(100% - 65px);
  overflow-y: auto;
}
</style>