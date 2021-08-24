<template>
  <v-btn
    fab
    large
    right
    fixed
    darl
    color="primary"
    :to="`/post/edit`"
    class="plusBtn"
  >
    <v-icon> mdi-plus </v-icon>
  </v-btn>
</template>
<style scoped>
.plusBtn {
  bottom: 80px;
}
</style>