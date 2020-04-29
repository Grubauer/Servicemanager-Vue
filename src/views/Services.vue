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
          <g
            id="Gruppe_18"
            data-name="Gruppe 18"
            transform="translate(-21.681 -20.681)"
          >
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
    <div class="serviceContainer">
      <div class="addWrapper" :class="{ addWrapperExtended: addMode }">
        <p class="addActionText" v-on:click="onClickAddingMode" v-if="!addMode">
          <b>+</b> Service hinzufügen
        </p>
        <div class="addArea" v-if="addMode">
          <div class="dataContainer">
            <div class="dataSide">
              <p class="label">Name</p>
              <input placeholder="Name" v-model="newName" />

              <p class="label">Datum</p>
              <div class="datePicker">
                <DatePicker v-model="newDate" />
              </div>
              <p class="label">Adresse</p>
              <input placeholder="Adresse" v-model="newAddress" />
              <p class="error">{{ error }}</p>
            </div>
            <div class="empSide">
              <p class="label">Mitarbeiter</p>
              <EmployeeSelector
                :activeEmp="newEmployee"
                @selectionChanged="(selection) => (newEmployee = selection)"
              />
            </div>
          </div>

          <DoneButton @clickBtn="onDoneAdding" class="doneButton" />
        </div>
      </div>
      <div v-if="services.length > 0">
        <div :key="service.id" v-for="service in services">
          <Service
            :service="service"
            :active="activeService != null && service.id === activeService.id"
            @deleteService="(service) => $emit('deleteService', service)"
          />
        </div>
      </div>
      <div class="loadingIconWrapper" v-else>
        <LoadingSpinner />
      </div>
      <div class="backWrapper"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { gsap } from "gsap";
import {
  getServices,
  postService,
} from "../backendConnection/backendConHelper";
import Service from "../components/Service";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import EmployeeSelector from "../components/tools/EmployeeSelector";
import DoneButton from "../components/tools/DoneButton";
import LoadingSpinner from "../components/tools/LoadingSpinner";

export default {
  name: "Services",
  props: ["activeService", "services"],
  components: {
    Service,
    DatePicker,
    EmployeeSelector,
    DoneButton,
    LoadingSpinner,
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".titleWrapper h2", { opacity: 0, duration: 0.5 });

    getServices().then((services) => (this.services = services));
  },
  data() {
    return {
      addMode: false,
      newName: "",
      newDate: new Date(),
      newAddress: "",
      newEmployee: null,
      error: "",
    };
  },
  methods: {
    onClickAddingMode: function() {
      this.addMode = true;
    },
    onDoneAdding: function() {
      //TODO:
      if (this.newName.length < 5) {
        this.error = "Der Name muss min. 5 Zeichen lang sein!";
      } else if (this.newName == "") {
        this.error = "Der Name ist leer!";
      } else if (this.newAddress == "") {
        this.error = "Die Adresse ist leer!";
      } else if (this.newEmployee == null) {
        this.error = "Bitte wählen sie einen Employee aus!";
      } else {
        this.addMode = false;
        var newService = {
          name: this.newName,
          employee: this.newEmployee,
          date: this.newDate,
          address: this.newAddress,
        };

        postService(newService).then((service) => {
          console.log(service);
          this.$emit("addService", service);
        });
      }
    },
  },
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

.addWrapper {
  background: white;
  border: 0;
  border-radius: 13px;
  box-shadow: 0px 2px 10px rgb(194, 194, 194);
  width: 15rem;

  text-align: center;
  margin: 0.6rem auto;
  transition: all 0.2s ease-in-out;
  transition-property: height, width;
  cursor: pointer;
}

.addWrapperExtended {
  width: 90%;

  padding: 0.6rem 3%;
  text-align: left;
}

.addActionText {
  font-size: 20px;
  margin: auto;
}

.addArea {
  padding: 1rem 2rem;
}

p {
  margin: 0;
}
.closeIcon {
  height: 2rem;
  margin: auto 1rem;
}

.label {
  font-weight: bold;
}

.info {
  font-size: 23px;
}

.buttons {
  margin: 1rem 0;
}

input {
  color: #2f2626;
  font-size: 16px;
  padding: 0.6rem;
  transition: border 0.1s ease-in;
  outline: 0;
  border-radius: 5px;
  border: 1px rgb(216, 216, 216) solid;
  width: 85%;
  min-width: 5rem;
  max-width: 16rem;
}

.datePicker {
  width: 83%;
  min-width: 4.7rem;
  max-width: 15.7rem;
}

input:focus {
  box-shadow: 0px 0px 10px rgb(230, 230, 230);
}

.doneButton {
  margin: 0.5rem 0 0 auto;
}

.dataContainer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.dataSide {
  flex: 2;
  min-width: 12rem;
}

.empSide {
}

.loadingIconWrapper {
  width: 100%;
  height: 100%;
  margin-top: 20vh;
  text-align: center;
}
.serviceContainer {
  height: calc(100vh - 5rem);
  overflow-x: scroll;
}

.error {
  color: red;
}
</style>
