<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="chat in chats"
        :key="chat.id"
        :to="`/messages/${chat.id}`"
      >
        <v-list-item-avatar color="blue-grey lighten-3">
          <f-img :path="chat.imagePath" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ chat.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
import { mapState } from 'vuex'
export default {
  middleware: 'login',
  computed: {
    ...mapState('message', ['chats']),
  },
  async mounted() {},
}
</script>