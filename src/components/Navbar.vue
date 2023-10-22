<template>
  <div class="flex-container">
    <div class="flex-item-logo">
      <!-- Logo image -->
      <img class="logo" src="@/assets/logo.png" alt="logo" />
    </div>
    <div class="flex-item item-2">
      <!-- Home and About links -->
      <div class="home">Home</div>
      <div class="home">About</div>

      <!-- Signup button -->
      <div>
        <router-link to="/" exact>
          <button class="header_button">
            <span class="signup-text">Signup</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav-bar",
  setup() {
    return {};
  },
};
</script>

<style scoped>
/* Styles for the navbar component */
.flex-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 15px;
  height: 100%;
  font-family: system-ui;
  font-weight: 500;
  color: #f9f7f3;
  background-color: #2c2c2c;
  font-size: 14px;
}

.flex-item {
  display: flex;
  flex-direction: row;
}

.logo {
  display: flex;
  align-items: center;
  width: 150px;
  height: auto;
  opacity: 1;
}

.item-2 {
  padding-left: 15px;
  gap: 15px;
  cursor: pointer;
}

.nav-links {
  color: rgb(0, 0, 0);
}

.home {
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s, transform 0.3s;
}

.home:hover {
  transform: translateY(-2px);
}

.nav-links:hover {
  color: rgba(0, 136, 169, 0.7);
}

.header_button {
  height: 27px;
  font-weight: 600;
  color: #f9f7f3;
  width: 70px;
  margin-bottom: 0;
  background-color: #dd3434;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  border-radius: 5px;
  font-size: 14px;
}

.signup-text {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.header_button:hover {
  background-color: #b63232;
}
</style>
