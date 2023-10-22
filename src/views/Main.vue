<template>
  <div class="main-body-container">
    <div class="grid-container-main">
      <!-- Header Component -->
      <header class="header-section">
        <Navbar></Navbar>
      </header>
      <!-- Sidebar Component -->
      <div class="sidebar-left">
        <Sidebar></Sidebar>
      </div>
      <!-- Main Editor Component -->
      <main class="main-content">
        <Editor></Editor>
      </main>
      <!-- Footer Component -->
      <footer class="footer">
        <Footer></Footer>
      </footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Editor from "@/components/Editor";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "main-component",
  components: {
    Navbar,
    Editor,
    Footer,
    Sidebar,
  },
  setup() {
    // Vuex Store instance
    const store = useStore();

    // Computed property for the current file content
    const currentFileContent = computed(() => {
      // Find the current file based on the currentFileId in the store
      const currentFile = store.state.files.find(
        (file) => file.id === store.state.currentFileId
      );
      return currentFile ? currentFile.content : "";
    });

    // Static theme for the editor component
    const currentTheme = "mbo";

    return {
      currentFileContent,
      currentTheme,
    };
  },
};
</script>

<style scoped>
/* Scoped Styles for Main Component */
body {
  margin: 0;
  overflow: hidden;
}

/* Styling for the main container */
.main-body-container {
  font-family: system-ui;
  font-weight: 400;
  color: #444746;
  background-color: #333333b0;
  height: 100vh;
}

/* Grid styles for the main container */
.grid-container-main {
  display: grid;
  grid-template-rows: 40px 1fr 20px;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "header header"
    "sidebar-left main-content"
    "footer footer";
  height: 100%;
  gap: 1px;
}

/* Styling for the header section */
.header-section {
  grid-area: header;
  background-color: #333;
  color: #fff;
}

/* Styling for the left sidebar */
.sidebar-left {
  grid-area: sidebar-left;
  height: 100%;
  overflow-y: auto;
}

/* Styling for the main content */
.main-content {
  grid-area: main-content;
  overflow-y: hidden;
}

/* Styling for the footer section */
.footer {
  grid-area: footer;
}
</style>
