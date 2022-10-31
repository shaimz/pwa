<template>
  <div class="profile">
    <div class="profile-header">
      <span>First Name</span>
      <span>{{user.firstName}}</span>
      <span>Last Name</span>
      <span>{{user.lastName}}</span>
      <!-- the rest of the info -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "../store/map-state";
export default {
  setup() {
    const { fetchUser } = mapActions();
    const { user } = mapState(); // or const user = localStorage.getItem('user') as it's set by the time user logs in
    fetchUser();
    return {
      fetchUser,
      user,
    };
  },
};
</script>