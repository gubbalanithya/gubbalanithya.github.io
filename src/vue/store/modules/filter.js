import _base from './_base-module';


const options = {
    gender: [
        'All', 'M', 'F'
    ],
    ethnicity: [
        'All', 'CAUCASN', 'ASIAN', 'HISPANIC LATINO AMER', 'AMER-IND', 'AFRO-AM', 'HAW/PAC'
    ],
    jobSecuring: [
        'All', '3rd year', '4th year', '5th year', 'No job'
    ]
};

const state = {
    options: options,
    gender: options.gender[0],
    ethnicity: options.ethnicity[0],
    jobSecuring: options.jobSecuring[0],
    tuitionPaid: false,
    pursueGradDegree: false,
    gpaRange: [0, 4]
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    update(state, filter) {
        for (let key in filter) {
            state[key] = filter[key];
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}