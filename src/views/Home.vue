<template>
  <div>
    <div class="titleWrapper">
      <h2>management.</h2>
    </div>
    <div id="nav">
      <div class="aWrapper">
        <router-link to="/services/0/v">Services</router-link>
      </div>
      <div class="aWrapper">
        <router-link to="/employees/0/v">Mitarbeiter</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { gsap } from "gsap";
export default {
  name: "Home",
  mounted() {
    // const tl = gsap.timeline();
    // tl.from(".aWrapper", { opacity: 0 }, "+=0.1");
    // tl.from(".aWrapper", { x: -100, stagger: 0.1, duration: 0.2 }, "-=0.5");
  },
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  color: #2f2626;
  font-size: 30px;
  text-decoration: none;
  transition: margin 0.1s ease-in;
}

#nav a:hover {
  text-shadow: 0px 1px 20px rgb(167, 167, 167);
  margin: 0 0 0 0.5rem;
}

.aWrapper {
}
</style>
