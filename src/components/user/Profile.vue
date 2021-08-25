<template>
  <v-card class="mx-auto" tile flat>
    <div>
      <f-img :path="userData.headerImg" height="200px" class="bg-gray-200" />
      <div class="p-4">
        <div class="relative flex w-full">
          <div class="flex flex-1">
            <div style="margin-top: -6rem">
              <div
                style="height: 9rem; width: 9rem"
                class="md rounded-full relative avatar"
              >
                <f-img
                  class="md rounded-full relative border-2 border-white"
                  :path="userData.uploadedPhotoPath || userData.photoURL"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col text-right">
            <div><v-btn outlined>Edit Profile</v-btn></div>
          </div>
        </div>

        <div class="space-y-1 justify-center w-full mt-3 ml-3">
          <div>
            <h2 class="text-xl leading-6 font-bold">{{ userData.name }}</h2>
            <p class="text-sm leading-5 font-medium text-gray-600">
              @{{ userData.uid }}
            </p>
          </div>

          <p class="mt-3 leading-tight mb-2">
          <pre class="items-start">{{ userData.prof }}</pre>
          </p>
          <div
            class="
              pt-3
              flex
              justify-start
              items-start
              w-full
              divide-x divide-gray-800 divide-solid
            "
          >
            <div class="text-center pr-3">
              <span class="font-bold">520</span
              ><span class="text-gray-600"> Following</span>
            </div>
            <div class="text-center px-3">
              <span class="font-bolde">23,4m </span
              ><span class="text-gray-600"> Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: { userData: { type: Object, required: true } },
}
</script>