<template>
  <router-view id="app"/>
</template>

<script>
export default { name: 'app' }
</script>

<style lang="scss">
@import './sass/app';
@media only screen and (max-width: 799px) {
  .subtitle {
    max-width: 60vw;
    width: 60vw;
  }
  .details {
    max-width: 60vw;
    width: 60vw;
  }
}

@media only screen and (min-width: 800px) {
  .subtitle .details {
    max-width: 30vw;
    width: 40vw;
  }
}

</style>
