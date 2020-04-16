<template>
  <div class="container">
    <button v-on:click="$emit('editClick', true)">
      <img src="../../assets/edit.svg" alt="edit" />
      <p>bearbeiten</p>
    </button>
    <button>
      <img src="../../assets/delete.svg" alt="delete" />
      <p>löschen</p>
    </button>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
.container {
  padding: 0.2rem;
  display: flex;
  justify-content: space-around;
}

button {
  display: flex;
  justify-content: space-evenly;
  background: white;
  border: 0;
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgb(216, 216, 216);
  margin: 0;
  transition: all 0.1s ease-in;
  cursor: pointer;
  outline: none;
}

button:hover {
  box-shadow: 3px 3px 12px rgb(182, 182, 182);
}

button:active {
  box-shadow: 0px 0px 0px #fff;
}

p {
  font-size: 18px;
  margin: auto 0;
}

img {
  transition: height 0.1s ease-in;
  height: 1.2rem;
  padding: 0.2rem 0.5rem;
  margin: auto 0;
}
</style>