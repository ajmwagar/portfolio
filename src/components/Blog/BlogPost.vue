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
        <vue-disqus v-if="commentsReady" shortname="vue-blog-demo"
          :key="post" :identifier="post" :url="`https://vue-blog-demo.netlify.com/read/${post}`"/>
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
  resource: 'BlogPost',
  components: { VueDisqus, },
  props: { post: String },

  data() {
    return {
      title: '',
      author: '',
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

p {
  padding-top: 4vh;
  padding-bottom: 4vh;
}

h1 {
  font-weight: bold;
  font-size: 2vw;
}
h2 {
  font-weight: bold;
  font-size: 1.75vw;
}
h3 {
  font-weight: bold;
  font-size: 1.5vw;
}

/*blockquote {
/*  background: #f9f9f9;
/*  border-left: 10px solid #ccc;
/*  margin: 1.5em 10px;
/*  padding: 0.5em 10px;
/*  quotes: "\201C""\201D""\2018""\2019";
/*}
/*blockquote:before {
/*  color: #ccc;
/*  content: open-quote;
/*  font-size: 4em;
/*  line-height: 0.1em;
/*  margin-right: 0.25em;
/*  vertical-align: -0.4em;
/*}
/*blockquote p {
/*  display: inline;
/*} */
    pre {
        font-family: "Courier 10 Pitch", Courier, monospace;
        font-size: 95%;
        line-height: 140%;
        white-space: pre;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
    }       
    
    code {
        font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
        font-size: 95%;
        line-height: 140%;
        white-space: pre;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        background: #faf8f0;
    }
    
    code p {
        display: block;
        padding: 0.5em 1em;
        border: 1px solid #bebab0;
    }
</style>
