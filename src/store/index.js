// store/index.js
import { createStore } from "vuex";
import default_content from "@/store/default_content.js";

export default createStore({
  state: {
    // Set the initial state with the default content and the currentFileId as 1
    files: default_content,
    currentFileId: 1,
  },

  mutations: {
    // Set the current file based on the payload
    setCurrentFile(state, payload) {
      state.currentFileId = payload;
    },

    // Update the content of a specific file based on the file name and new content
    updateFileContent(state, { fileName, newContent }) {
      const fileToUpdate = state.files.find((file) => file.id === fileName);
      if (fileToUpdate) {
        fileToUpdate.content = newContent;
      }
    },

    // Add a new file to the files array based on the provided id, name, and content
    addFile(state, { id, name, content }) {
      state.files.push({ id, name, content });
    },

    // Delete a file based on the provided fileId
    deleteFile(state, fileId) {
      const index = state.files.findIndex((file) => file.id === fileId);
      if (index !== -1) {
        state.files.splice(index, 1);
        if (state.currentFileId === fileId) {
          if (state.files.length > 0) {
            state.currentFileId = state.files[0].id; // Set the currentFileId to the first file's id if available
          } else {
            state.currentFileId = null; // Set the currentFileId to null if there are no files left
          }
        }
      }
    },

    // Set the files in the state to the provided files array
    setFiles(state, files) {
      state.files = files;
    },

    // Update the name of a specific file based on the provided payload
    updateFileName(state, payload) {
      const { fileId, newFileName } = payload;
      const fileToUpdate = state.files.find((file) => file.id === fileId);
      if (fileToUpdate) {
        fileToUpdate.name = newFileName;
      }
    },
  },

  actions: {
    // Change the current file based on the provided payload
    changeFile({ commit }, payload) {
      commit("setCurrentFile", payload);
    },
  },

  modules: {},
});
