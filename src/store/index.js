import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    jobRoles: [],
    companies: [],
    user: {}
  },
  getters: {
    getJobRoles(state) {
      return state.jobRoles
    }
  },
  mutations: {
    setJobRoles(state, data) {
      state.jobRoles = data
    },
    setCompanies(state, data) {
      state.companies = data
    },
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
    async fetchJobRoles({ commit }) {
      let params = { page: 1, itemsPerPage: 100 }
      let response = await axios.get('https://api-uat.usedge.fr/api/job_roles', params)
      if (response.status !== 200) return
      let jobRoles = response.data["hydra:member"]
      commit("setJobRoles", jobRoles)
    },
    async searchCompanies({ commit }, name) {
      let params = { page: 1, itemsPerPage: 100, name }
      let response = await axios.get('https://api-uat.usedge.fr/api/companies', params)
      if (response.status !== 200) return
      let companies = response.data["hydra:member"]
      commit("setCompanies", companies)
    },
    async validateUser({ commit }, data) {
      let params = {
        emailVerificationToken: data["uuid"],
      }
      let response = await axios.get(`https://api-uat.usedge.fr/api/users/${data["uuid"]}/verify`, params)
      if (response.status !== 200) return
    },
    async createUser({ commit }, data) {
      let body = {
        "email": data.email,
        "password": data.password,
        "firstName": data.firstName || "",
        "lastName": data.lastName || "",
        "countryCode": data.country,
        "jobRole": data.jobRole["name"] || "",
        "membership": {
          "company": {
            "name": data.company["name"],
            "size": data.companySize
          },
          "permission": ""
        }
      }
      let response = await axios.post('https://api-uat.usedge.fr/api/users/register', body) // the api endpoint has an error at the core
      if (response.status !== 200) return;
      let user = response.data
      dispatch('validateUser', user)
      commit('setUser', user)
      localStorage.setItem('user', user)
      return user
    }

  },
  modules: {},
});
