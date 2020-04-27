<template>
  <div>
    <div class="titleWrapper">
      <h2 class="serviceName">{{ service.name }}</h2>
      <DeleteIcon
        class="closeIcon"
        :lightStyle="true"
        v-on:click.native="$router.push({ path: `/services/0/v` })"
      />
    </div>

    <div class="content" v-if="!editMode">
      <p class="label">Datum</p>
      <p class="info">
        {{
        `${weekDays[service.date.getDay()]}, ${service.date.getDate()}. ${
        months[service.date.getMonth()]
        } ${service.date.getFullYear()}`
        }}
      </p>
      <p class="label">Adresse</p>
      <p class="info">{{ service.address }}</p>
      <p class="label">Mitarbeiter</p>
      <div class="employeeWrapper">
        <EmpIcon :content="empTag" />

        <p class="empName">{{ service.employee.name }}</p>
      </div>
      <ToolButtonsHorizontal
        class="buttons"
        @editClick="$router.push({ path: `/services/${service.id}/e` })"
      />
    </div>

    <div class="editArea" v-if="editMode">
      <p class="label">Name</p>
      <input placeholder="Name" v-model="newName" />

      <p class="label">Datum</p>
      <div class="datePicker">
        <DatePicker v-model="newDate" />
      </div>
      <p class="label">Adresse</p>
      <input placeholder="Adresse" v-model="newAddress" />
      <p class="label">Mitarbeiter</p>
      <EmployeeSelector
        :activeEmp="newEmployee"
        @selectionChanged="(selection) => (newEmployee = selection)"
      />
      <DoneButton @clickBtn="onDoneEditing" class="doneButton" />
    </div>
  </div>
</template>

<script>
import EmpIcon from "./icons/EmpIcon";
import DeleteIcon from "./icons/DeleteIcon";
import ToolButtonsHorizontal from "./tools/ToolButtonsHorizontal";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import EmployeeSelector from "./tools/EmployeeSelector";
import DoneButton from "./tools/DoneButton";
import { editService } from "../backendConnection/backendConHelper";
import { gsap } from "gsap";
import { getEmpTag } from "../helper/helper";

export default {
  name: "ServiceDetails",
  props: ["service"],
  components: {
    EmpIcon,
    DeleteIcon,
    ToolButtonsHorizontal,
    DatePicker,
    EmployeeSelector,
    DoneButton
  },
  data() {
    return {
      empTag: getEmpTag(this.service.employee.name),
      weekDays: [
        "Sonntag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
        "Montag"
      ],
      months: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ],
      editMode: false,
      newName: this.service.name,
      newDate: this.service.date,
      newEmployee: this.service.employee,
      newAddress: this.service.address
    };
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".content", { opacity: 0 }, "+=0.2");
    tl.from(".serviceName", { opacity: 0 }, "-=0.5");
  },
  watch: {
    $route(to) {
      if (to.params.edit == "e") {
        // gsap.to(".content", { opacity: 0, duration: 0.2 });
        // setTimeout(() => {
        this.editMode = true;
        // gsap.to(".editArea", { opacity: 100, duration: 0.3 });
        // }, 1000);
      } else {
        this.editMode = false;
        this.empTag = getEmpTag(this.service.employee.name);
      }

      (this.newName = this.service.name),
        (this.newDate = this.service.date),
        (this.newEmployee = this.service.employee),
        (this.newAddress = this.service.address);
    }
  },
  methods: {
    onDoneEditing: function() {
      editService(this.service.id, {
        id: this.service.id,
        name: this.newName,
        employee: this.newEmployee,
        address: this.newAddress,
        date: this.newDate
      }).then(service => {
        this.$emit("editService", service);
      });
      this.$router.push({ path: `/services/${this.service.id}/v` });
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
