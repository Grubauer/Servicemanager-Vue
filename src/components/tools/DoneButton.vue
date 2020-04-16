<template>
  <button v-on:click="$emit('clickBtn', true)">
    <img src="../../assets/done.svg" alt="done" />
    <p>fertig</p>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
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