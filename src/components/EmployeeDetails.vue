<template>
  <div>
    <div class="titleWrapper">
        
      <h2 class="serviceName">{{ employee.name }}</h2>
      <DeleteIcon
        class="closeIcon"
        :lightStyle="true"
        v-on:click.native="$router.push({ path: `/employees/0/v` })"
      />
    </div>

    <div class="content"  v-if="!editMode">
      <div  :key="service.id" v-for="service in services.filter(x => x.employee === this.employee)"  >
        <div @click="serviceClicked(service.id)">
          <p >{{service.name}}</p>
        </div>
        </div>
       
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
import DoneButton from "./tools/DoneButton";
import {editEmployee, getServices } from "../backendConnection/backendConHelper";
import { gsap } from "gsap";

export default {
  name: "EmployeeDetails",
  props: ["employee"],
  components: {
    DeleteIcon,
    DoneButton
  },
  data() {
    return {
      editMode: false,
      newName: this.employee.name,
      services: getServices(),
    };
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".content", { opacity: 0 }, "+=0.2");
    tl.from(".employeeName", { opacity: 0 }, "-=0.5");
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
        id: this.service.id,
        name: this.newName,
      }).then(() => {
        //TODO: Emit to parent
      });
      this.$router.push({ path: `/employees/${this.employee.id}/v` });
    },

    serviceClicked(id){
     this.$router.push({ path: `/services/${id}/v` });
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
</style>
