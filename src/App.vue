<template>
  <div id="app">
    <div class="infoArea" :class="{ infoHome: currentRouteName == 'Home' }">
      <router-view
        class="routerView"
        @setActiveService="setService"
        :activeService="activeService"
        @addService="addService"
        :services="services"
        @deleteGivenEmployee="removeEmployee"
        :employees="employees"
        @deleteService="deleteGivenService"
      />
    </div>
    <div class="serviceDetails" :class="{ expanded: activeService && currentRouteName != 'Home' }">
      <ServiceDetails
        :service="activeService"
        v-if="
          activeService &&
            currentRouteName != 'Home' &&
            currentRouteName != 'Employees'
        "
        @setActiveService="setService"
        @editService="editService"
        @deleteService="deleteGivenService"
      />
    </div>

    <div class="serviceDetails" :class="{ expanded: activeEmployee && currentRouteName != 'Home' }">
      <EmployeeDetails
        :employee="activeEmployee"
        v-if="
          activeEmployee &&
            currentRouteName != 'Home' &&
            currentRouteName != 'Services'
        "
        @setActiveEmployee="setEmployee"
        @editGivenEmployee="editGivenEmployee"
        @deleteGivenEmployee="removeEmployee"
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
import EmployeeDetails from "./components/EmployeeDetails";
import {
  getService,
  getServices,
  getEmployee,
  deleteService,
  deleteEmployee,
  getEmployees
} from "./backendConnection/backendConHelper";
import { gsap } from "gsap";
export default {
  name: "app",
  data() {
    return {
      fullHeight: false,
      // prepareActiveService: false,

      //activeService: setActiveService(),
      activeService:
        this.$route.name === "Services"
          ? getService(this.$route.params.id).then(
              service => (this.service = service)
            )
          : null,
      activeEmployee:
        this.$route.name === "Employees"
          ? getEmployee(this.$route.params.id).then(
              employee => (this.activeEmployee = employee)
            )
          : null,
      activeServiceId: this.$route.params,
      activeEmployeeId: this.$route.params,
      services: [],
      employees: [],
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
    addService(service) {
      this.services.push(service);
      console.log(this.services);
    },
    editService(service) {
      var serviceToEditIndex = this.services.indexOf(
        this.services.find(x => service.id === x.id)
      );

      var copyArr = [...this.services];

      copyArr[serviceToEditIndex] = service;
      this.services = copyArr;
      this.activeService = this.services.find(
        x => x.id === this.activeService.id
      );
      console.log(service, serviceToEditIndex, this.services);
    },

    deleteGivenService(serviceToDelete) {
      console.log("delete");
      deleteService(serviceToDelete.id).then(deletedService => {
        this.services = this.services.filter(x => x.id != deletedService.id);
      });
    },

    removeEmployee(employeeToDelete) {
      console.log("removeEmployee");
      deleteEmployee(employeeToDelete.id).then(deletedEmployee => {
        this.employees = this.employees.filter(x => x.id !== deletedEmployee.id);
        console.log(deletedEmployee);
      });
    },

    setEmployee(employee) {
      this.activeEmployee = employee;
    },
    editGivenEmployee(employee) {
      var employeeToEditIndex = this.employees.indexOf(
        this.employees.find(x => employee.id === x.id)
      );

      var copyArr = [...this.employees];

      copyArr[employeeToEditIndex] = employee;
      this.employees = copyArr;
      this.activeEmployee = this.employees.find(
        x => x.id === this.activeEmployee.id
      );
      console.log(employee, employeeToEditIndex, this.employees);
    }
  },

  watch: {
    $route(to) {
      console.log(to.name);
      to.name === "Services"
        ? getService(to.params.id).then(
            service => (this.activeService = service)
          )
        : (this.activeService = null);
      to.name === "Employees"
        ? getEmployee(to.params.id).then(
            employee => (this.activeEmployee = employee)
          )
        : (this.activeEmployee = null);
    }
  },
  components: {
    Map,
    ServiceDetails,
    EmployeeDetails
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".infoArea", { y: -100, opacity: 0 });
    getServices().then(services => {
      this.services = services;
      this.markers = this.services.map(x => {
        return {
          id: x.id,
          label: x.name,
          position: { lat: x.lat, lng: x.long },
          title: x.name
        };
      });
    });
    getEmployees().then(employees => {
      this.employees = employees;
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
