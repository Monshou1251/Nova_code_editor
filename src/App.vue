<template>
  <router-view />
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/store/localstorage.js";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const initialized = ref(false);

    onMounted(() => {
      const storedFiles = getFromLocalStorage("files");
      if (storedFiles) {
        store.commit("setFiles", storedFiles);
      }
      initialized.value = true;
    });

    watch(
      () => {
        return store.state.files;
      },
      (newFiles) => {
        if (initialized.value) {
          saveToLocalStorage("files", newFiles);
        }
      },
      { deep: true }
    );

    return {
      initialized,
    };
  },
};
</script>

<style>
#app {
}
body {
  margin: 0;
}
</style>
