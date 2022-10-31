<template>
  <div class="logout">
    <button @click="logout">Logout</button>
  </div>
  <div class="home">
    <DashboardComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import DashboardComponent from "@/components/DashboardComponent.vue";

export default {
  name: "HomeView",
  components: {
    DashboardComponent,
  },
  setup() {
    const logout = () => {
      // remove the token and the user from cookies / localStorage
    };
    return {
      logout,
    };
  },
};
</script>