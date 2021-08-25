<template>
  <v-app>
    <AppDesktopMenu />
    <AppMobileMenu />
    <AppBar />
    <v-main>
      <v-divider />

      <Nuxt />
    </v-main>
    <AppBottomNav />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
