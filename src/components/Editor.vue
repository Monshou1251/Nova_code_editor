<template>
  <!-- Codemirror Editor Component -->
  <Codemirror
    v-model:value="currentFileContent"
    :options="cmOptions"
    placeholder="test placeholder"
  />
</template>

<script>
import Codemirror from "codemirror-editor-vue3";
import "codemirror/addon/display/placeholder.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/display/placeholder.js";
import "codemirror/theme/mbo.css";
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "EditorComponent",
  components: { Codemirror },
  setup() {
    // Vuex Store instance
    const store = useStore();

    // Default content for the editor
    const defaultContent = "// Default content";

    // Computed property for the current file
    const currentFile = computed(() =>
      store.state.files.find((file) => file.id === store.state.currentFileId)
    );

    // Ref for the current file content
    const currentFileContent = ref(
      currentFile.value?.content || defaultContent
    );

    // Watcher for currentFileContent changes
    watch(currentFileContent, (newVal) => {
      const fileToUpdate = store.state.files.find(
        (file) => file.id === store.state.currentFileId
      );
      if (fileToUpdate) {
        fileToUpdate.content = newVal;
      }
      localStorage.setItem("files", JSON.stringify(store.state.files));
    });

    // Watcher for currentFile changes
    watch(currentFile, (newVal) => {
      currentFileContent.value = newVal?.content || defaultContent;
    });

    // Options for Codemirror component
    const cmOptions = {
      mode: "text/javascript",
      theme: "mbo",
    };

    return {
      currentFileContent,
      cmOptions,
    };
  },
};
</script>

<style>
/* Custom styles for the scroll bar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>