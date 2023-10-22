<template>
  <div class="sidebar-left">
    <div class="panel">
      <button class="panel-buttons add" @click="addFile">
        <svg-icon class="panel-icon" type="mdi" :path="mdiPlusBoxOutline" />
      </button>
      <button class="panel-buttons delete" @click="deleteFile">
        <svg-icon class="panel-icon" type="mdi" :path="mdiDeleteOutline" />
      </button>
    </div>
    <ul class="file-list">
      <li
        v-for="file in files"
        :key="file.id"
        @click="selectFile(file.id)"
        @dblclick="editFileName(file.id)"
        :class="{ selected: isSelected(file.id) }"
      >
        <!-- Display file name or input field for editing -->
        <span v-if="editing !== file.id">{{ file.name }}</span>
        <input
          v-else
          type="text"
          :value="editedFileName"
          @input="updateFileName($event.target.value)"
          @blur="finishEditing"
          @keydown.enter="finishEditing"
          @keydown.esc="cancelEditing"
          autofocus
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlusBoxOutline, mdiDeleteOutline } from "@mdi/js";

export default {
  name: "SidebarComponent",
  components: {
    SvgIcon,
  },
  setup() {
    const store = useStore();
    // Get the files from the store
    const files = store.state.files;
    // Initialize selectedFile, editing, and editedFileName as refs
    const selectedFile = ref(null);
    const editing = ref(null);
    const editedFileName = ref("");

    // Select a file
    const selectFile = (fileId) => {
      console.log("Selected File ID:", fileId);
      store.dispatch("changeFile", fileId);
      selectedFile.value = fileId;
    };

    // Add a new file
    const addFile = () => {
      const currentFileCount = files.length;
      let newFileIndex = currentFileCount + 1;

      while (files.find((file) => file.id === newFileIndex)) {
        newFileIndex++;
      }

      const newFileName = `filename${newFileIndex}`;
      const newFileContent = `// Default content for ${newFileName}`;
      store.commit("addFile", {
        id: newFileIndex,
        name: newFileName,
        content: newFileContent,
      });
    };

    // Delete a file
    const deleteFile = () => {
      if (selectedFile.value) {
        store.commit("deleteFile", selectedFile.value);
        selectedFile.value = null;
      }
    };

    // Check if a file is selected
    const isSelected = (fileId) => {
      return selectedFile.value === fileId;
    };

    // Edit the file name
    const editFileName = (fileId) => {
      editing.value = fileId;
      editedFileName.value =
        files.find((file) => file.id === fileId)?.name || "";
    };

    // Update the file name
    const updateFileName = (newFileName) => {
      editedFileName.value = newFileName;
    };

    // Finish editing the file name
    const finishEditing = () => {
      if (editing.value && editedFileName.value.trim()) {
        store.commit("updateFileName", {
          fileId: editing.value,
          newFileName: editedFileName.value,
        });
        editing.value = null;
      }
    };

    // Listen for the Escape key to cancel editing
    onBeforeMount(() => {
      document.addEventListener("keydown", onEscapeKey);
    });

    // Remove the listener when the component is unmounted
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", onEscapeKey);
    });

    const onEscapeKey = (event) => {
      if (event.key === "Escape") {
        cancelEditing();
      }
    };

    // Cancel editing the file name
    const cancelEditing = () => {
      editing.value = null;
    };

    return {
      selectFile,
      onEscapeKey,
      addFile,
      deleteFile,
      isSelected,
      files,
      mdiPlusBoxOutline,
      mdiDeleteOutline,
      editFileName,
      updateFileName,
      finishEditing,
      cancelEditing,
      editing,
      editedFileName,
    };
  },
};
</script>

<style scoped>
.sidebar-left {
  background-color: #2c2c2cca;
  color: white;
  position: relative;
}

.panel {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #212121;
  height: 40px;
  padding-left: 5px;
  position: fixed;
  left: 0;
  width: 245px;
}

.panel-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 1px;
  padding: 0;
  color: white;
  background-color: #575555;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 5px;
  border: none;
}

.panel-buttons.add:hover {
  background-color: #e9992a;
}

.panel-buttons.delete:hover {
  background-color: #b63232;
}

.panel-icon {
  width: 22px;
  height: 22px;
  fill: white;
}

.file-list {
  list-style-type: none;
  padding-top: 40px;
  padding-left: 0;
  margin: 0;
}

.file-list li {
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s;
  height: 20px;
  display: flex;
  align-items: center;
}

.file-list input {
  font-size: 14px;
  outline: 1px;
}

.file-list li:hover {
  background-color: #8d8d8d30;
}

.selected {
  background-color: #555 !important;
}
</style>
