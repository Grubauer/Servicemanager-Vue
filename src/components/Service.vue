<template>
  <div class="container" :class="{containerActive: active}">
    <div class="info">
      <p class="name">{{ service.name }}</p>
      <p class="empName">{{ service.employee.name }}</p>
      <p class="date">
        {{
        `${weekDays[service.date.getDay()]}, ${service.date.getDate()}. ${
        months[service.date.getMonth()]
        } ${service.date.getFullYear()}`
        }}
      </p>
    </div>
    <div class="tools">
      <div class="firstRow">
        <EditIcon class="icon" />
        <DeleteIcon class="icon" />
      </div>
      <p class="showOnMap">Auf Karte ansehen</p>
    </div>
  </div>
</template>

<script>
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
export default {
  name: "Service",
  components: {
    EditIcon,
    DeleteIcon
  },
  props: ["service", "active"],
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
  methods: {}
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 1rem auto;
  padding: 0.6rem 3%;
  border: 0;
  border-radius: 13px;
  box-shadow: 0px 2px 10px rgb(194, 194, 194);
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.1s ease-in;
}

.container:hover {
  background-color: rgb(240, 240, 240);
  box-shadow: 0px 4px 15px rgb(194, 194, 194);
}

.containerActive {
  background-color: rgb(223, 223, 223);
  box-shadow: 0px 4px 15px rgb(194, 194, 194);
}

p {
  margin: 0;
}
.info {
}

.tools {
}

.name {
  font-size: 35px;
}

.firstRow {
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
}

.icon {
  height: 2.3rem;
  margin: 0 0 0 1rem;
}

.showOnMap {
}
</style>
