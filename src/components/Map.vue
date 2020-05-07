<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    apiKey="insert API Key"
    @passObjects="
      (objects) => {
        google = objects.google;
        map = objects.map;
      }
    "
  >
    // insert your google maps api key to render styled map
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
      <GoogleMapLine
        v-for="line in lines"
        :key="line.id"
        :path.sync="line.path"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from "./GoogleMapLoader";
import GoogleMapMarker from "./GoogleMapMarker";
import GoogleMapLine from "./GoogleMapLine";
//AIzaSyBXW0vmgTqLH2PJNfTjq6RFZHzuaN4i66o
import { mapSettings } from "@/constants/mapSettings";

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapLine,
  },

  data() {
    return {
      // markers: [
      //   {
      //     id: "a",
      //     position: { lat: 32, lng: 14 }
      //   },
      //   {
      //     id: "b",
      //     position: { lat: 32, lng: 15 }
      //   }
      // ],
      lines: [],
      google: null,
      map: null,
    };
  },
  props: ["markers", "selectedMarkerId"],
  watch: {
    selectedMarkerId: function(newVal) {
      if (this.map != null && this.markers != null) {
        this.map.setCenter(this.markers.find((x) => x.id == newVal).position);
        this.map.setZoom(18);
      }
    },
  },
  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter,
      };
    },

    mapCenter() {
      if (this.markers == null || this.markers.length == 0) {
        return { lat: 43, lng: 14 };
      } else if (this.selectedMarkerId != 0) {
        return this.markers.find((x) => x.id == this.selectedMarkerId).position;
      } else {
        return this.markers[0].position;
      }
    },
  },
};
</script>
