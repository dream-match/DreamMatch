<template>
  <v-card max-width="750" outlined>
    <v-list-item>
      <v-list-item-content>
        <div class="text-h6 mb-1">
          {{ data.meta.title }}
        </div>
        <div>
          {{ data.meta.description }}
        </div>
      </v-list-item-content>

      <v-list-item-avatar v-if="data.meta.image" tile size="80" color="grey">
        <f-img :path="data.meta.image.url" />
      </v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-btn outlined rounded text :href="data.link"> Visit </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: { data: { type: Object, required: true } },
}
</script>