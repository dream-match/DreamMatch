<template>
  <v-navigation-drawer v-if="$vuetify.breakpoint.xs" v-model="drawer" app>
    <v-list nav dense>
      <v-subheader class="font-weight-black text-h6 black--text">
        Menu
        <v-spacer />
        <v-btn
          class="mx-2"
          fab
          depressed
          small
          color="white"
          @click="drawer = !drawer"
        >
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-subheader>

      <v-list dense>
        <v-list-item link>
          <v-list-item-avatar color="blue-grey lighten-3">
            <f-img
              :path="userData.uploadedPhotoPath || userData.photoURL"
              @click="drawer = !drawer"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1 font-weight-black">
              {{ userData.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium">
              {{ userData.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Files</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Shared with me</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Starred</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    drawer: {
      get() {
        return this.openMainMenu
      },
      set(v) {
        return this.setMainMenu(v)
      },
    },
    ...mapState(['userData', 'openMainMenu']),
  },
  methods: { ...mapMutations(['setMainMenu']) },
}
</script>