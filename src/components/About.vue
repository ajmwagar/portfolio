<template>
  <div class="about">
  <div class="header">
    <a href="/blog">Blog</a>
    <a href="/work">Work</a>
  </div>
  <div class="title">
    <h1>Avery<br>Wagar</h1>
  </div>
  <div class="subteext">
    <p>{{msg}}</p>
  </div>
    <p class="details">
      I am a student at Ballard High School (BHS; class of 2021) in Seattle, Washington, studying computer science and digital filmmaking and exploring the intersection of both through virtual reality and immersive/360 video.
      <br><br>
      I am the founder and president of BVR Club, BHS’s virtual reality club and was the first ninth-grader to enroll in AP computer science at BHS. I created AstroVR (formerly StarVR), a virtual reality astronomy simulator that won best overall engineering project at the 2017-18 Seattle Public Schools eighth grade district science and engineering fair. I am also the co-founder and lead developer of Outrigger, an email productivity application promoting inbox life balance, and a student representative on the Information Technology Advisory Committee for Seattle Public Schools. 
      <br><br>
      I have participated in numerous hackathons across various technologies and taught software development to underrepresented high school students. When not in front of a computer programming or editing film, or immersed in VR, I enjoy film production, photography, cycling, drinking coffee, gathering around a campfire, and long walks with the family dog.
  <blog-footer/>

</p>

  
  </div>
</template>

<script>
import BlogFooter from './Footer'

export default {
  name: 'About',
  data () {
    return {
      msg: 'VR developer since 2016. Experience in Unity, C#, Java, JavaScript, Python, Rust.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,700');

a {
  color: black;
  font-size: 5vh;
}
html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-family: 'Fira Sans';
  font-size: 22vh;
}

.details {
  margin-top: 8vh;
  font-size: 3vh;
  word-wrap: break-word;
  max-width: 30ww;
  width: 40vw;
  line-height: 4vh;
  margin-bottom: 15vh;

}
.subteext {
  font-size: 4vh;
  word-wrap: break-word;
  max-width: 30ww;
  width: 30vw;
}
.about {
  flex: 1;
  margin-left: 10vw;
  font-size: 10vh;

}
.title {
  margin-top: 22vh;
  margin-bottom: 5vh;
}

h1, h2 {
  font-weight: bold;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
