export const customMapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#333333' }], // Darker text everywhere
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{ color: '#e0e0e0' }],
  },
  // --- LANDSCAPE & BUILDINGS FIXED ---
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#eef0f2' }], // Darker background so white roads/buildings pop
  },
  {
    featureType: 'landscape.man_made', // Restores house footprints and building blocks
    elementType: 'geometry',
    stylers: [{ color: '#e0e4e8' }, { visibility: 'on' }],
  },
  // --- SELECTIVE LANDMARKS RECONSTRUCTED ---
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }], // Keeps general commercial clutter hidden
  },
  {
    featureType: 'poi.park', // Parks are excellent visual landmarks
    elementType: 'geometry',
    stylers: [{ color: '#d0ebd4' }, { visibility: 'on' }],
  },
  {
    featureType: 'poi.government', // Government/Public buildings help navigation
    elementType: 'geometry',
    stylers: [{ color: '#d8e2ed' }, { visibility: 'on' }],
  },
  {
    featureType: 'poi.medical', // Hospitals are massive visual anchors
    elementType: 'geometry',
    stylers: [{ color: '#fbe9e7' }, { visibility: 'on' }],
  },
  {
    featureType: 'poi.place_of_worship', // Churches, temples, mosques help drivers visually orient
    elementType: 'all',
    stylers: [{ visibility: 'on' }],
  },
  // --- HIGHLEGIBILITY ROADS ---
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }], // Crisp white roads on greyish background
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#1a1a1a' }], // Near-black road names
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ffffff' }, { weight: 4 }], // Thicker white background text border
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#fbc02d' }, { visibility: 'simplified' }], // Darker yellow for contrast
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3e2723' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ffffff' }, { weight: 3 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'simplified' }], // Keeps train stations/subways but cleanly
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#b3d1ff' }], // Blue water instead of grey for better physical realism
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#1c3d5a' }],
  },
];
