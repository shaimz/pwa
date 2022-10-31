<template>
  <p class="tip">Click on button in image container</p>
  <div class="cont" :class="{'s--signup': isRegister}">
    <div class="form sign-in">
      <h2>Welcome back,</h2>
      <label>
        <span>Email</span>
        <input type="email" />
      </label>
      <label>
        <span>Password</span>
        <input type="password" />
      </label>
      <p class="forgot-pass">Forgot password?</p>
      <button type="button" class="submit">Sign In</button>
      <button type="button" class="fb-btn">
        Connect with <span>facebook</span>
      </button>
    </div>
    <div class="sub-cont">
      <div class="img">
        <div class="img__text m--up">
          <h2>New here?</h2>
          <p>Sign up and discover great amount of new opportunities!</p>
        </div>
        <div class="img__text m--in">
          <h2>One of us?</h2>
          <p>If you already has an account, just sign in. We've missed you!</p>
        </div>
        <div class="img__btn" @click="setIsRegister">
          <span class="m--up">Sign Up</span>
          <span class="m--in">Sign In</span>
        </div>
      </div>
      <div class="form sign-up">
        <div class="first-step" v-if="!step">
          <label>
            <span>First Name</span>
            <input type="text" v-model="form.firstName"/>
          </label>
          <label>
            <span>Last Name</span>
            <input type="text" v-model="form.lastName"/>
          </label>
          <label>
            <span>Email</span>
            <input type="email" v-model="form.email"/>
          </label>
          <label>
            <span>Country</span>
            <select style="width:100%" v-model="form.country">
              <option v-for="country in countries" :value="country" aria-autocomplete>{{country}}</option>
            </select>
          </label>
          <label>
            <span :class="{'error': error.password}">Password*</span>
            <input type="password" v-model="form.password" required/>
          </label>
          <label>
            <span :class="{'error': error.confirmPassword}">Confirm Password*</span>
            <input type="password" v-model="form.confirmPassword" required/>
          </label>
          <button type="button" class="submit" @click="setStep">Next</button>
        </div>
        <div class="second-step" v-else>
          <label>
            <span>Role</span>
            <v-select
              v-model="form.jobRole"
              label="name"
              :options="jobRoles"
              @reduce="job => job['@id']"
            ></v-select>
          </label>
          <label>
            <span :class="{'error': error.company}">Company Name*</span>
            <v-select
              v-model="form.company"
              label="name"
              taggable
              :options="companies"
              :create-option="company => ({ '@id': new Date(), name: company})"
              @reduce="company => company['@id']"
            ></v-select>
          </label>
          <label>
            <span :class="{'error': error.companySize}">Company Size*</span>
            <v-select
              :options="['0-10', '11-50']"
              v-model="form.companySize"
            ></v-select>
          </label>
          <button type="button" class="submit" @click="register">Signup</button>
        </div>
      </div>
    </div>
  </div>

  <a
    href="https://dribbble.com/shots/3306190-Login-Registration-form"
    target="_blank"
    class="icon-link"
  >
    <img
      src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Dribbble-icon.png"
    />
  </a>
  <a
    href="https://twitter.com/NikolayTalanov"
    target="_blank"
    class="icon-link icon-link--twitter"
  >
    <img
      src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png"
    />
  </a>
</template>

<script>
import { ref, reactive } from "vue";
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from "../store/map-state";

export default {
  setup() {
    const defaultForm = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: null,
      company: "",
      companySize: null,
      jobRole: null,
    };
    let form = reactive({ ...defaultForm });
    let error = ref({});
    const setError = (properties) => {
      let errors = {};
      properties.forEach((property) => {
        if (form[property] === undefined) return;
        if (form[property] === "") errors[property] = true;
        if (["password", "confirmPassword"].includes(property)) {
          if (form["password"] !== form["confirmPassword"]) {
            errors["password"] = true;
            errors["confirmPassword"] = true;
          }
        }
        if (form[property] != "") delete error.value[property];
      });

      error.value = { ...error.value, ...errors };
    };

    const step = ref(0);
    const setStep = () => {
      setError(["password", "confirmPassword"], "Password incorrect");
      if (Object.keys(error.value).length) return;
      step.value = 1;
    };
    const isRegister = ref(false);
    const setIsRegister = () => {
      isRegister.value = !isRegister.value;
    };
    const register = async () => {
      let user = await createUser(form);
      if (user["@type"] == "hydra:Error") return;
      setIsRegister();
      setStep();
      form = { ...form, ...defaultForm };
    };

    const { fetchJobRoles, searchCompanies, createUser } = mapActions();
    fetchJobRoles();
    searchCompanies();
    const { jobRoles, companies } = mapState();

    const countries = ["RO", "MD"];

    return {
      jobRoles,
      setIsRegister,
      isRegister,
      register,
      form,
      step,
      setStep,
      countries,
      error,
      companies,
    };
  },
};
</script>

<style scoped>
.error {
  border: 1px solid red;
}
</style>