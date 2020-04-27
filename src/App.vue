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
        v-if="activeService && currentRouteName != 'Home' && currentRouteName != 'Employees'"
        @setActiveService="setService"
      />
    </div>

    <div class="serviceDetails" :class="{ expanded: activeEmployee && currentRouteName != 'Home' }">
      <EmployeeDetails
        :employee="activeEmployee"
        v-if="activeEmployee && currentRouteName != 'Home' && currentRouteName != 'Services'"
        @setActiveEmployee="setEmployee"
      />
    </div>

    <div class="mapArea">
      <Map
        class="map"
        :markers="markers"
        :selectedMarkerId="activeService == null ? 0 : activeService.id"
      />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map";
import ServiceDetails from "./components/ServiceDetails";
//import EmployeeDetails from "./components/EmployeeDetails";
import { getService, getServices, getEmployee } from "./backendConnection/backendConHelper";
import { gsap } from "gsap";
export default {
  name: "app",
  data() {
    return {
      fullHeight: false,
      // prepareActiveService: false,
      
      //activeService: setActiveService(),
      activeService: (this.$route.name === "Services") ? getService(this.$route.params.id) : null,
      activeEmployee: (this.$route.name === "Employees") ? getEmployee(this.$route.params.id) : null,
      activeServiceId: this.$route.params,
      activeEmployeeId: this.$route.params,
      services: [],
      markers: []
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
    },
    setEmployee(employee) {
      this.activeEmployee = employee;
    },
  },
  watch: {
    $route(to) {
      (to.name === "Services") ? this.activeService = getService(to.params.id): this.activeService = undefined;
      (to.name === "Employees") ? this.activeEmployee = getEmployee(to.params.id): this.activeEmployee = undefined;
    }
  },
  components: {
    Map,
    ServiceDetails,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".infoArea", { y: -100, opacity: 0 });
    this.services = getServices();

    this.markers = this.services.map(x => {
      return { id: x.id, position: { lat: x.lat, lng: x.long } };
    });
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
  z-index: 1;
  /* TODO: better shadow */
  box-shadow: 1px 0px 20px rgba(134, 134, 134, 0.6);
}
/* #nav a.router-link-exact-active {
  
} */
</style>
