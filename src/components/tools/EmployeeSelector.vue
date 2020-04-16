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
    <div
      v-for="employee in filteredEmps"
      v-bind:key="employee.id"
      class="empContainer"
      :class="{selected: activeEmp.id === employee.id}"
      @click="selectEmployee(employee)"
    >
      <EmpIcon
        :content="getTag(employee.name)"
        class="empIcon"
        :light="activeEmp.id === employee.id ? true : false"
      />
      <p class="empName">{{employee.name}}</p>
    </div>
  </div>
</template>

<script>
import { getEmployees } from "../../backendConnection/backendConHelper";
import { getEmpTag, sortEmployees } from "../../helper/helper";
import EmpIcon from "../icons/EmpIcon";
export default {
  components: {
    EmpIcon
  },
  props: ["activeEmp"],
  data() {
    return {
      searchText: "",

      employees: (this.employees = sortEmployees(
        getEmployees(),
        this.activeEmp.id
      ))
    };
  },
  methods: {
    getTag: name => {
      return getEmpTag(name);
      //   return getEmpTag(this.employee.name);
    },
    selectEmployee: function(employee) {
      this.activeEmp = employee;
      this.$emit("selectionChanged", this.activeEmp);
    }
  },
  computed: {
    filteredEmps: function() {
      // this.searchText = text;
      // console.log(this.searchText);

      if (this.searchText == "") {
        return getEmployees();
      } else {
        return getEmployees().filter(x =>
          x.name.toUpperCase().includes(this.searchText.toUpperCase())
        );
      }
    }
  }
};
</script>

<style scoped>
.container {
  box-shadow: 1px 1px 10px rgb(223, 223, 223);
  border: 0;
  border-radius: 15px;
  padding: 0.5rem;
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
</style>