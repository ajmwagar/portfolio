<template>
  <transition appear name="v--mask">
    <footer v-once class="blog__footer">
      <a class="signature" href="/" target="_blank">
        Copyright 2018 Avery Wagar
      </a>
    </footer>
  </transition>
</template>

<script>
export default { name: 'blog-footer' }
</script>
