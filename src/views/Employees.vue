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
      <h2>Employees</h2>
      <div></div>
    </div>
    <div class="serviceContainer">
      <div class="addWrapper" :class="{ addWrapperExtended: addMode }">
        <p class="addActionText" v-on:click="onClickAddingMode" v-if="!addMode">
          <b>+</b> Employee hinzufügen
        </p>
        <div class="addArea" v-if="addMode">
          <div class="dataContainer">
            <div class="dataSide">
              <p class="label">Name</p>
              <input placeholder="Name" v-model="newName" />
              <p class="label">Adresse</p>
              <input placeholder="Adresse" v-model="newAddress" />
              <p class="error">{{ error }}</p>
            </div>
          </div>

          <DoneButton @clickBtn="onDoneAdding" class="doneButton" />
        </div>
      </div>

      <div :key="employee.id" v-for="employee in employees">
        <Employee
          :employee="employee"
          :active="activeEmployee != null && employee.id === activeEmployee.id"
          @deleteGivenEmployee="deleteGivenEmployee"
        />
      </div>
    </div>
    <div class="backWrapper"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { gsap } from "gsap";
import {
  getEmployees,
  postEmployee
} from "../backendConnection/backendConHelper";
import Employee from "../components/Employee";
import DoneButton from "../components/tools/DoneButton";

export default {
  name: "Employees",
  props: ["activeEmployee", "employees"],
  components: {
    Employee,
    DoneButton
  },
  data() {
    return {
      addMode: false,
      newName: "",
      newAddress: "",
      error: ""
    };
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".titleWrapper h2", { opacity: 0, duration: 0.5 });
    getEmployees().then(employees => (this.employees = employees));
  },

  methods: {
    onClickAddingMode: function() {
      this.addMode = true;
    },

    deleteGivenEmployee: function(employeeToDelete) {
      console.log("deleteGivenEmployee");
      this.$emit("deleteGivenEmployee", employeeToDelete);
    },

    onDoneAdding: function() {
      //TODO:
      if (this.newName.length < 5) {
        this.error = "Der Name muss min. 5 Zeichen lang sein!";
      } else if (this.newName == "") {
        this.error = "Der Name ist leer!";
      } else if (this.newAddress == "") {
        this.error = "Die Adresse ist leer!";
      } else {
        this.addMode = false;
        var newEmployee = {
          name: this.newName,
          address: this.newAddress
        };

        postEmployee(newEmployee).then(employee => {
          this.employees.push(newEmployee);
          console.log(employee);
          this.$emit("addEmployee", employee);
        });
      }
    }
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

.addActionText {
  font-size: 20px;
  margin: auto;
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

.label {
  margin: 0;
  font-weight: bold;
}
</style>
