export default async ({ store }) => {
  await store.dispatch('getUserData')
  await store.dispatch('message/getChats')
}
