<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>SHAPP</ion-title>
        <ion-buttons slot="secondary">
          <ion-button @click="showSearch">
            <ion-icon slot="icon-only" :icon="getIcon('search')"/>
          </ion-button>
          <ion-button id="menu-toggler">
            <ion-icon slot="icon-only"
              :ios="getIcon('ellipsisHorizontal')"
              :md="getIcon('ellipsisVertical')"/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-popover trigger="menu-toggler" dismiss-on-select="true" show-backdrop="false">
        <ion-content>
          <ion-list lines="none">
            <ion-item button @click="logOut">
              <ion-label>Deconnexion</ion-label>
              <ion-icon :src="getIcon('powerOutline')"/>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>SHAPP</h1>
      <ion-fab-button class="todo-fab" @click="addTodo">
        <ion-icon :src="getIcon('add')"></ion-icon>
      </ion-fab-button>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data(){
    return {}
  },
  methods:{
    showSearch(){},
    addTodo(){

    }
  }
}
</script>