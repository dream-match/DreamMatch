export const state = () => ({
    userData: { userUid: "", userName: "" },
    logined: false,
    registerStep: 1,

})

export const mutations = {
    setRegisterStep(state, step) {
        state.registerStep = step
    }
}

export const actions = {

}



