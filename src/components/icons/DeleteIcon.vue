<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.657 34.657">
      <g
        id="Gruppe_14"
        data-name="Gruppe 14"
        transform="translate(-432.672 -161.672)"
      >
        <line
          id="Linie_1"
          :class="{ light: lightStyle }"
          data-name="Linie 1"
          x1="29"
          y2="29"
          transform="translate(435.5 164.5)"
          fill="none"
          stroke="#2f2626"
          stroke-linecap="round"
          stroke-width="4"
        />
        <line
          id="Linie_2"
          :class="{ light: lightStyle }"
          data-name="Linie 2"
          x1="29"
          y1="29"
          transform="translate(435.5 164.5)"
          fill="none"
          stroke="#2f2626"
          stroke-linecap="round"
          stroke-width="4"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: ["lightStyle"],
};
</script>

<style scoped>
svg {
  cursor: pointer;
  height: 100%;
}
svg g line {
  transition: stroke 0.1s ease-in;
}
svg:hover g line {
  stroke: rgb(165, 165, 165);
}

.light {
  stroke: white;
}
</style>
