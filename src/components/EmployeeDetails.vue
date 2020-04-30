<template>
  <div>
    <div class="titleWrapper">
      <h2 class="serviceName">
        {{
        this.employee.name.trim().includes(" ")
        ? this.employee.name.split(" ")[0]
        : this.employee.name
        }}
      </h2>
      <DeleteIcon
        class="closeIcon"
        :lightStyle="true"
        v-on:click.native="$router.push({ path: `/employees/0/v` })"
      />
    </div>

    <div class="content" v-if="!editMode && services">
      <h1>{{ employee.name }}</h1>
      <h1>Services:</h1>
      <div
        :key="service.id"
        v-for="service in services.filter(
          (x) => x.employee.id == this.employee.id
        )"
      >
        <div @click="serviceClicked(service.id)" class="serviceWrapper">
          <p>{{ service.name }}</p>
        </div>
      </div>

      <ToolButtonsHorizontal
        class="buttons"
        @editClick="$router.push({ path: `/employees/${employee.id}/e` })"
        @deleteClick="onDelete"
      />
    </div>

    <div class="editArea" v-if="editMode">
      <p class="label">Name</p>
      <input placeholder="Name" v-model="newName" />
      <DoneButton @clickBtn="onDoneEditing" class="doneButton" />
    </div>
  </div>
</template>

<script>
import DeleteIcon from "./icons/DeleteIcon";
import ToolButtonsHorizontal from "./tools/ToolButtonsHorizontal";
import DoneButton from "./tools/DoneButton";
import {
  editEmployee,
  getServices
} from "../backendConnection/backendConHelper";
import { gsap } from "gsap";

export default {
  name: "EmployeeDetails",
  props: ["employee"],
  components: {
    DeleteIcon,
    DoneButton,
    ToolButtonsHorizontal
  },
  data() {
    return {
      editMode: false,
      newName: this.employee.name,
      services: null
    };
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".content", { opacity: 0 }, "+=0.2");
    tl.from(".employeeName", { opacity: 0 }, "-=0.5");
    getServices().then(services => (this.services = services));
  },
  watch: {
    $route(to) {
      if (to.params.edit == "e") {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    }
  },
  methods: {
    onDoneEditing: function() {
      editEmployee(this.employee.id, {
        name: this.newName,
        address: this.employee.address
      }).then(employee => {
        this.$emit("editGivenEmployee", employee);
      });
      this.$router.push({ path: `/employees/${this.employee.id}/v` });
    },

    serviceClicked: function(id) {
      this.$router.push({ path: `/services/${id}/v` });
    },

    onDelete: function() {
      //deleteEmployee(this.employee.id);
      this.$emit("deleteGivenEmployee", this.employee);
    }
  }
};
</script>

<style scoped>
.titleWrapper {
  display: flex;
  justify-content: space-between;
}

.employeeWrapper {
  display: flex;
  padding: 0.3rem 0.7rem;
  box-shadow: 3px 3px 20px rgb(228, 228, 228);
  border: 0;
  border-radius: 10px;
}

.empName {
  padding: 0 0.5rem;
  margin: auto 0;
  font-size: 21px;
}

.content {
  padding: 1rem 2rem;
}

.editArea {
  padding: 1rem 2rem;
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

h1 {
  margin: 0.2rem 0;
  font-size: 30px;
  font-weight: normal;
}

.serviceWrapper {
  background-color: white;
  transition: background-color 0.2s ease-in;
  border: 0;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 1px 1px 10px rgb(223, 223, 223);
  cursor: pointer;
  margin: 0.5rem 0;
}

.serviceWrapper:hover {
  background-color: rgb(240, 240, 240);
}

.serviceWrapper p {
  margin: 0;
  font-size: 25px;
}
</style>
