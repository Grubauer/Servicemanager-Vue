<template>
  <div
    class="container"
    :class="{ containerActive: active }"
    v-on:click="click"
  >
    <div class="info">
      <div class="empIcon">
        <EmpIcon :content="empTag" />
      </div>

      <p class="name">{{ employee.name }}</p>
    </div>
    <div class="tools">
      <div class="firstRow">
        <EditIcon class="icon" v-on:click="click" id="edit" />
        <DeleteIcon class="icon" v-on:click="click" id="delete" />
      </div>
    </div>
  </div>
</template>

<script>
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import EmpIcon from "./icons/EmpIcon";
import { getEmpTag } from "../helper/helper";
import { deleteEmployee } from '../backendConnection/backendConHelper';
export default {
  name: "Employee",
  components: {
    EditIcon,
    DeleteIcon,
    EmpIcon,
  },
  props: ["employee", "active"],
  data() {
    return {
      empTag: getEmpTag(this.employee.name),
    };
  },
  methods: {
    click(e) {
      console.log(e.target.id);
      if (e.target.id == "edit") {
        this.$router.push({ path: `/employees/${this.employee.id}/e` });
      } else if (e.target.id == "delete") {
        deleteEmployee(this.employee.id);
        this.$emit("deleteEmployee", this.employee);
        console.log(e.target.id);
      } else {
        this.$router.push({ path: `/employees/${this.employee.id}/v` });
      }

      //   $router.push({ path: `/services/${service.id}/e` });
    },
  },
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
  display: flex;
  margin: auto 0;
}

.empTag {
  margin: auto 0;
}

.tools {
}

.name {
  font-size: 28px;
  padding: 0.1rem 0.5rem;
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
.empIcon {
  margin: auto 0;
}
</style>
