<template>
  <v-app>
    <AppDesktopMenu />
    <AppMobileMenu />
    <AppBar />
    <v-main>
      <v-divider />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
