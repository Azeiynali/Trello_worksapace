<template>
  <NavBar />
  <ListBoxes />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ListBoxes from "./components/ListBoxes.vue";

export default {
  name: "App",
  components: {
    NavBar,
    ListBoxes
  },
};
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  background-size: 100vw 100vh;
  overflow-y: unset !important;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(100, 43, 115, 1) 0%,
    rgba(4, 0, 4, 1) 90%
  );
}
* {
  overflow: hidden !important;
}
</style>
