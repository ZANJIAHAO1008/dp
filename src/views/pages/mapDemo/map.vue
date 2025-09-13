<template>
  <div ref="rootmap" class="no-margin"></div>
</template>

<script>
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'proj4leaflet';
import CoMap from 'chinaoly-map';
export default {
  data() {
    return {
      mapObj: null, // 地图对象
    };
  },
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      const options = {
        container: this.$refs.rootmap,
        center: [120.209947, 30.245853],
        maxZoom: 18,
        zoom: 10,
      };
      new CoMap(options, 'leaflet').initMap().then(mapObj => {
        this.mapObj = mapObj;
      });
    },
  },
};
</script>
