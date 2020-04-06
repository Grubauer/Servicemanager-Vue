<template>
  <div>
    <div class="titleWrapper">
      <router-link to="/">
        <svg
          class="backIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="24.753"
          height="38.016"
          viewBox="0 0 24.753 38.016"
        >
          <g id="Gruppe_18" data-name="Gruppe 18" transform="translate(-21.681 -20.681)">
            <line
              class="backIconStroke"
              id="Linie_3"
              data-name="Linie 3"
              x1="19.116"
              y2="16.189"
              transform="translate(24.5 23.5)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-width="4"
            />
            <line
              class="backIconStroke"
              id="Linie_4"
              data-name="Linie 4"
              x2="19.116"
              y2="16.189"
              transform="translate(24.5 39.689)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-width="4"
            />
          </g>
        </svg>
      </router-link>
      <h2>Services</h2>
      <div></div>
    </div>
    <div class="serviceContainer" :key="service.id" v-for="service in services">
      <Service
        :service="service"
        v-on:click.native="$router.push({path: `/services/${service.id}`})"
        :active="activeService != null && service.id === activeService.id"
      />
    </div>
    <div class="backWrapper"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { gsap } from "gsap";
import { getServices } from "../backendConnection/backendConHelper";
import Service from "../components/Service";

export default {
  name: "Services",
  props: ["activeService"],
  components: {
    Service
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".titleWrapper h2", { opacity: 0, duration: 0.5 });
  },
  data() {
    return {
      services: getServices()
    };
  },
  methods: {
    // onClickService() {
    // },
  }
};
</script>

<style scoped>
.titleWrapper {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 0 1rem;
}

.titleWrapper a {
  margin: auto 0;
}

.titleWrapper .backIcon {
  height: 2.5rem;
  transition: all 0.1s ease-in;
  margin: auto 0;
  display: block;
}

.titleWrapper .backIcon .backIconStroke {
  transition: stroke 0.1s ease-in;
}

.titleWrapper .backIcon:hover .backIconStroke {
  stroke: rgb(165, 165, 165);
}
</style>
