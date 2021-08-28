<template>
  <v-app>
    <v-main style="background: #f5f5f5; height: auto" class="pa-0 fill-height">
      <v-container
        :class="{ 'pa-0': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs }"
      >
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
