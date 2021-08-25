export default function ({ redirect, store }) {
  if (!store.state.userData.uid) {
    return redirect('/login')
  }
}
