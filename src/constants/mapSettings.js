import colorPalette from "@/constants/colorPalette";

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#2F2626",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#2F2626",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#FFFFFF",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const {
  COLOR_LANDSCAPE,
  COLOR_BORDERS,
  COLOR_WATER,
  COLOR_LINE,
  COLOR_POINT_FILL,
  COLOR_SELECTED_POINT,
} = colorPalette;

const COLORS = {
  BORDERS: COLOR_BORDERS,
  LANDSCAPE: COLOR_LANDSCAPE,
  LINE: COLOR_LINE,
  POINT: COLOR_SELECTED_POINT,
  POINT_FILL: COLOR_POINT_FILL,
  WATER: COLOR_WATER,
};

const POINT_MARKER_ICON_CONFIG = {
  path: "M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
  strokeOpacity: 0.7,
  strokeWeight: 4,
  strokeColor: COLORS.POINT,
  fillColor: COLORS.POINT_FILL,
  fillOpacity: 0.7,
  scale: 1,
};

const LINE_SYMBOL_CONFIG = {
  path: "M 0,-2 0,2",
  strokeOpacity: 1,
  strokeWeight: 2,
  scale: 1,
};

const LINE_PATH_CONFIG = {
  clickable: false,
  geodesic: false,
  strokeOpacity: 0,
  strokeColor: COLORS.LINE,
  icons: [
    {
      icon: LINE_SYMBOL_CONFIG,
      repeat: "10px",
    },
  ],
};

const mapSettings = {
  clickableIcons: false,
  streetViewControl: false,
  panControlOptions: false,
  gestureHandling: "cooperative",
  backgroundColor: COLORS.LANDSCAPE,
  mapTypeControl: false,
  zoomControlOptions: {
    style: "SMALL",
  },
  zoom: 10,
  minZoom: 2,
  maxZoom: 15,
  styles: mapStyle,
  //   styles: [
  //     {
  //       featureType: "landscape",
  //       stylers: [
  //         {
  //           color: COLORS.LANDSCAPE,
  //         },
  //       ],
  //     },
  //     {
  //       featureType: "water",
  //       elementType: "labels.text.fill",
  //       stylers: [
  //         {
  //           color: "#fff",
  //         },
  //       ],
  //     },
  //   ],
  //   styles: [
  //     {
  //       featureType: "landscape",
  //       stylers: [
  //         { hue: COLORS.LANDSCAPE },
  //         { saturation: 50.2 },
  //         { lightness: -34.8 },
  //         { gamma: 1 },
  //       ],
  //     },
  //     {
  //       featureType: "poi",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "road.highway",
  //       stylers: [
  //         { hue: COLORS.LANDSCAPE },
  //         { saturation: -19.8 },
  //         { lightness: -1.8 },
  //         { gamma: 1 },
  //       ],
  //     },
  //     {
  //       featureType: "road.arterial",
  //       stylers: [
  //         { hue: COLORS.LANDSCAPE },
  //         { saturation: 72.4 },
  //         { lightness: -32.6 },
  //         { gamma: 1 },
  //       ],
  //     },
  //     {
  //       featureType: "road.local",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "transit",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "administrative.province",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "administrative.locality",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "administrative.province",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "administrative.land_parcel",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "administrative.neighborhood",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "administrative.country",
  //       elementType: "geometry.stroke",
  //       stylers: [{ visibility: "on" }, { color: COLORS.BORDERS }],
  //     },
  //     {
  //       featureType: "administrative",
  //       elementType: "labels",
  //       stylers: [{ visibility: "off" }],
  //     },
  //     {
  //       featureType: "water",
  //       stylers: [
  //         { hue: COLORS.WATER },
  //         { saturation: -63.2 },
  //         { lightness: 38 },
  //         { gamma: 1 },
  //       ],
  //     },
  //   ],
};

export { mapSettings, LINE_PATH_CONFIG, POINT_MARKER_ICON_CONFIG };
