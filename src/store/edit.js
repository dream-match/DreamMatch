export const state = () => (
    {
        saveData: {},
        saving: false
    }
)

export const mutations = { setSaving: (state, v) => (state.saveData = v) }

export const actions = { save({ commit }, data) { } }