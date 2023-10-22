<template>
  <footer class="footer">
    {{ currentDate }}
  </footer>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Footer-component",
  setup() {
    const currentDate = ref("");

    // Function to get the current date in the required format
    const getCurrentDate = () => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const today = new Date();
      return today.toLocaleDateString("en-US", options);
    };

    // Update the currentDate value with the current date
    currentDate.value = getCurrentDate();

    return {
      currentDate,
    };
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #212121f0;
  padding-right: 10px;
  font-size: 12px;
  color: #f4f4f4aa;
  height: 100%;
}
</style>
