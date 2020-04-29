<script>
import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";
import router from "../router/index";
export default {
  props: {
    google: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
    marker: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    const { Marker } = this.google.maps;

    var m = new Marker({
      position: this.marker.position,
      marker: this.marker,

      title: this.marker.title,
      map: this.map,
      icon: POINT_MARKER_ICON_CONFIG,
    });

    m.addListener("click", function() {
      router.push({ path: `/services/${this.marker.id}/v` });
    });

    var infowindow = new this.google.maps.InfoWindow({
      content: this.marker.label,
    });

    m.addListener("mouseover", function() {
      infowindow.open(this.map, m);
    });

    // assuming you also want to hide the infowindow when user mouses-out
    m.addListener("mouseout", function() {
      infowindow.close();
    });

    m;
  },
};
</script>
