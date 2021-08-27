<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  ::-webkit-scrollbar {
    width: 8px;
    background-color: white;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 25%);
    border-radius: 10px;
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 25%);
    background-color: rgba(215, 215, 215, 1);
  }
</style>
