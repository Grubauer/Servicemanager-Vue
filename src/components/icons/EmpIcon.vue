<template>
  <div class="wrapper" :class="{lightWrapper: light}">
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: ["content", "light"]
};
</script>

<style scoped>
.wrapper {
  border: 0;
  border-radius: 200px;
  background: #2f2626;
  text-align: center;
  height: 2.5rem;
  width: 2.5rem;
  position: relative;
}

.lightWrapper {
  background: white;
}

.lightWrapper p {
  color: #2f2626;
}

p {
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  font-size: 19px;
  transform: translate(-50%, -50%);
  margin: 0;
}
</style>
