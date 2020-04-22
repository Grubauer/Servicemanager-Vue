<template>
  <div
    class="container"
    :class="{ containerActive: active }"
    v-on:click="click"
  >
    <div class="info">
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
export default {
  name: "Employee",
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: ["employee", "active"],
  methods: {
    click(e) {
      console.log(e.target.id);
      if (e.target.id == "edit") {
        this.$router.push({ path: `/employees/${this.employee.id}/e` });
      } else if (e.target.id == "delete") {
        console.log("delete");
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
