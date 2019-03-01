<template>
  <transition name="post">
    <article v-if="allReady" class="post">
      <header class="post__header">
        <h2 class="post__title">{{ title }}</h2>

        <h3 class="post__meta">by <router-link class="post__author"
          :to="`/by/${kebabify(author)}`">{{ author }}</router-link>
          <span class="post__sep"></span>
          <time>{{ prettyDate(published) }}</time>
        </h3>

        <blockquote class="post__subtitle">{{ description }}</blockquote>
      </header>

      <section class="post__body rte" v-html="previewText"></section>

      <footer class="post__footer">
        <a class="link" v-if="link != ''" v-bind:href="link" rel="noopener noreferrer" target="_blank" title="View project"><svg width="20" height="20" aria-hidden="true" viewbox="0 0 30 30"><path fill="currentColor" d="M30,0 C30,0 29.354506,12.2531625 20.6026198,19.0899633 L20.5160138,23.7932813 L14.3525243,30 L14.3433542,25.3603039 L12.0388213,23.2865562 C10.3708929,28.461413 1.58049257,28.461413 1.58049257,28.461413 C1.58049257,28.461413 1.58049257,20.4245919 6.97899703,18.0562603 L4.92776095,15.7599381 L-2.84217094e-14,15.7599381 L6.34300378,9.58554178 L10.9107026,9.48284658 C18.0590545,0.839264606 30,0 30,0 Z M20.53125,12.7055308 C22.2916576,12.7055308 23.71875,11.2728816 23.71875,9.5056193 C23.71875,7.73835703 22.2916576,6.30570788 20.53125,6.30570788 C18.7708424,6.30570788 17.34375,7.73835703 17.34375,9.5056193 C17.34375,11.2728816 18.7708424,12.7055308 20.53125,12.7055308 Z"></path></svg></a>

        <a class="github" v-if="github != ''" v-bind:href="github" rel="noopener noreferrer" target="_blank" title="View source"><svg width="20" height="20" aria-hidden="true" viewbox="0 0 30 30"><path fill="currentColor" d="M15,0 C6.7125,0 0,6.88228492 0,15.3794076 C0,22.1847955 4.29375,27.9328491 10.25625,29.9706206 C11.00625,30.1051905 11.2875,29.6438082 11.2875,29.2400988 C11.2875,28.8748379 11.26875,27.6637095 11.26875,26.3756841 C7.5,27.0869817 6.525,25.4336954 6.225,24.5686037 C6.05625,24.1264457 5.325,22.7615233 4.6875,22.3962624 C4.1625,22.1078985 3.4125,21.3966009 4.66875,21.3773766 C5.85,21.3581524 6.69375,22.4923837 6.975,22.9537659 C8.325,25.2799013 10.48125,24.6262765 11.34375,24.222567 C11.475,23.2229055 11.86875,22.5500565 12.3,22.1655713 C8.9625,21.7810861 5.475,20.4546122 5.475,14.5719887 C5.475,12.8994782 6.05625,11.5153315 7.0125,10.4387729 C6.8625,10.0542877 6.3375,8.47789846 7.1625,6.36322991 C7.1625,6.36322991 8.41875,5.95952046 11.2875,7.9396192 C12.4875,7.59358252 13.7625,7.42056419 15.0375,7.42056419 C16.3125,7.42056419 17.5875,7.59358252 18.7875,7.9396192 C21.65625,5.9402962 22.9125,6.36322991 22.9125,6.36322991 C23.7375,8.47789846 23.2125,10.0542877 23.0625,10.4387729 C24.01875,11.5153315 24.6,12.8802539 24.6,14.5719887 C24.6,20.4738364 21.09375,21.7810861 17.75625,22.1655713 C18.3,22.6461778 18.76875,23.5689422 18.76875,25.0107617 C18.76875,27.0677575 18.75,28.7210438 18.75,29.2400988 C18.75,29.6438082 19.03125,30.1244147 19.78125,29.9706206 C25.8870866,27.8572138 29.9983525,21.9867936 30,15.3794076 C30,6.88228492 23.2875,3.41491449e-15 15,0 Z"></path></svg></a>
      </footer>
    </article>
  </transition>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus'
import { kebabify, prettyDate } from '../../helpers'
import marked from 'marked'

export default {
  name: 'blog-post',
  resource: 'Project',
  components: { VueDisqus, },
  props: { post: String },

  data() {
    return {
      title: '',
      author: '',
      link: '',
      github: '',
      content: '',
      published: '',
      description: '',
      commentsReady: false,
      ready: false
    }
  },

  computed: {
    allReady() {
      return this.ready && this.post;
    },
 previewText() {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });
  return marked(this.content)
 }
  },

  watch: {
    post(to, from) {
      if (to === from || !this.post) return;

      this.commentsReady = false
      this.$getResource('post', to)
        .then(this.showComments)
        .then(() => {
          this.ready = true;
        });
    }
  },

  methods: {
    kebabify,
    prettyDate,
    showComments() {
      // This is injected by prerender-spa-plugin on build time, we don't prerender disqus comments.
      if (window.__PRERENDER_INJECTED &&
          window.__PRERENDER_INJECTED.prerendered) {
        return;
      }

      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    }
  },

  mounted() {
    if (!this.post) {
      this.ready = true;
      return;
    }

    this.$getResource('post', this.post)
      .then(this.showComments)
      .then(() => {
        this.ready = true;
      });
  }
}
</script>

<style>
@media only screen and (min-width: 800px) {
  svg{
    height: 5vh;
    width: 5vh;

  }
}
@media only screen and (max-width: 799px) {
  svg{
    height: 10vw;
    width: 10vw;

  }
}

a :hover {
  color: #41B883;
}

</style>
