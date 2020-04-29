<template>
  <div class="container">
    <div class="searchWrapper">
      <img src="../../assets/search.svg" alt="search" class="searchIcon" />
      <input
        type="text"
        name="search"
        placeholder="Suche..."
        v-model="searchText"
        class="searchInput"
      />
    </div>
    <div v-if="employees != null">
      <div
        v-for="employee in filteredEmps"
        v-bind:key="employee.id"
        :class="{
          selected: activeEmp != null ? activeEmp.id === employee.id : false,
        }"
        @click="selectEmployee(employee)"
        class="empContainer"
      >
        <EmpIcon
          :content="getTag(employee.name)"
          class="empIcon"
          :light="
            activeEmp == null
              ? false
              : activeEmp.id === employee.id
              ? true
              : false
          "
        />
        <p class="empName">{{ employee.name }}</p>
      </div>
    </div>
    <div v-else class="loadingWrapper">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script>
import { getEmployees } from "../../backendConnection/backendConHelper";
import { getEmpTag, sortEmployees } from "../../helper/helper";
import EmpIcon from "../icons/EmpIcon";
import LoadingSpinner from "./LoadingSpinner";

export default {
  components: {
    EmpIcon,
    LoadingSpinner,
  },
  props: ["activeEmp"],
  data() {
    return {
      searchText: "",
      employees: null,
    };
  },
  methods: {
    getTag: (name) => {
      return getEmpTag(name);
      //   return getEmpTag(this.employee.name);
    },
    selectEmployee: function(employee) {
      this.activeEmp = employee;
      this.$emit("selectionChanged", this.activeEmp);
    },
  },
  computed: {
    filteredEmps: function() {
      // this.searchText = text;
      // console.log(this.searchText);
      if (this.employees != null) {
        if (this.searchText == "") {
          return this.employees;
        } else {
          return this.employees.filter((x) =>
            x.name.toUpperCase().includes(this.searchText.toUpperCase())
          );
        }
      }
      return null;
    },
  },
  mounted() {
    getEmployees().then((emps) => {
      console.log(emps);
      this.employees =
        this.activeEmp == null ? emps : sortEmployees(emps, this.activeEmp.id);
    });
  },
};
</script>

<style scoped>
.container {
  box-shadow: 1px 1px 10px rgb(223, 223, 223);
  border: 0;
  border-radius: 15px;
  padding: 0.5rem;
  height: 13rem;
  overflow-x: scroll;
}

.empContainer {
  display: flex;
  margin: 0.5rem 0rem;
  padding: 0.4rem;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  box-shadow: 1px 1px 10px rgb(223, 223, 223);
}

.empContainer:active {
  box-shadow: 1px 1px 10px rgb(255, 255, 255);
}

.selected {
  background: #2f2626;
}

.selected .empName {
  color: white;
}

.empName {
  margin: auto 0.4rem;
}

.empIcon {
  height: 2.5rem;
  width: 2.5rem;
  margin: auto 0;
}

.searchWrapper {
  display: flex;
}

.searchInput {
  outline: none;
  border: 0;
  margin: auto 0.4rem;
  font-size: 20px;
}

.loadingWrapper {
  width: 100%;
  height: 100%;
  margin-top: 15%;
  text-align: center;
}
</style>
