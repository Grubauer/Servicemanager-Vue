<template>
  <div id="app">
    <div class="infoArea" :class="{ infoHome: currentRouteName == 'Home' }">
      <router-view
        class="routerView"
        @setActiveService="setService"
        :activeService="activeService"
      />
    </div>
    <div class="serviceDetails" :class="{ expanded: activeService && currentRouteName != 'Home' }">
      <ServiceDetails
        :service="activeService"
        v-if="activeService && currentRouteName != 'Home'"
        @setActiveService="setService"
      />
    </div>
    <div class="mapArea">
      <Map class="map" />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map";
import ServiceDetails from "./components/ServiceDetails";
import { getService } from "./backendConnection/backendConHelper";
import { gsap } from "gsap";
export default {
  name: "app",
  data() {
    return {
      fullHeight: false,
      // prepareActiveService: false,
      activeService: getService(this.$route.params.id),
      activeServiceId: this.$route.params
    };
  },
  methods: {
    setService(service) {
      this.activeService = service;
      //:class="{ expanded: prepareActiveService }"
      // this.prepareActiveService = true;
      // setTimeout(() => {
      //   this.activeService = service;
      // }, 500);
    }
  },
  watch: {
    $route(to) {
      this.activeService = getService(to.params.id);
    }
  },
  components: {
    Map,
    ServiceDetails
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".infoArea", { y: -100, opacity: 0 });
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.titleWrapper {
  width: calc(100% -60px);
  height: 5rem;
  background: #2f2626;
  /* box-shadow: 1px 0px 20px rgba(15, 15, 15, 0.6); */
}

.titleWrapper h2 {
  padding: 1rem 30px;
  font-size: 35px;
  margin: 0;
  color: white;
  font-weight: 400;
}
</style>

<style scoped>
#app {
  display: flex;
}

.infoArea {
  flex: 5;

  height: 100vh;
  box-shadow: 1px 0px 20px rgba(134, 134, 134, 0.6);
  z-index: 3;

  transition: flex 0.3s linear;
}

.infoHome {
  flex: 2;
}

/* .fullHeight {
  height: 100vh;
} */

.mapArea {
  flex: 7;
}

.map {
  height: 100vh;
}

.serviceDetails {
  flex: 0;
  height: 100vh;
  transition: flex 0.2s linear;
}

.expanded {
  flex: 4;
  /* TODO: better shadow */
  box-shadow: 10px 0px 20px rgba(134, 134, 134, 0.6);
}
/* #nav a.router-link-exact-active {
  
} */
</style>
