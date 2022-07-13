<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>SHAPP</ion-title>
      </ion-toolbar>
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
}
</script>