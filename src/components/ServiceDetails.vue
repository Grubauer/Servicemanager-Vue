<template>
  <div>
    <div class="titleWrapper">
      <h2 class="serviceName">{{ service.name }}</h2>
      <DeleteIcon
        class="closeIcon"
        :lightStyle="true"
        v-on:click.native="$router.push({path: `/services/0`})"
      />
    </div>
    <div class="content">
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
        <EmpIcon :content="'TS'" />

        <p class="empName">{{service.employee.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import EmpIcon from "./icons/EmpIcon";
import DeleteIcon from "./icons/DeleteIcon";
import { gsap } from "gsap";

export default {
  name: "ServiceDetails",
  props: ["service"],
  components: {
    EmpIcon,
    DeleteIcon
  },
  data() {
    return {
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
      ]
    };
  },
  mounted() {
    const tl = gsap.timeline();
    tl.from(".content", { opacity: 0 }, "+=0.2");
    tl.from(".serviceName", { opacity: 0 }, "-=0.5");
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
</style>
