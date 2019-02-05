import Vue from 'vue';
import Vuex from 'vuex';
import _base from "./modules/_base-module";
import filter from './modules/filter';

Vue.use(Vuex);

const getters = {

};

const state = {

};

const actions = {

};

const mutations = {

};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        filter
    },
    strict: true
})

