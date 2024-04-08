const ModalSearch = () => {
  const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

  const fetchPlaces = async searchQuery => {
    if (searchQuery.length < 3) return; // Don't search for too short strings
    //later add an error msg

    try {
      const response = await axios.get(googlePlacesApiUrl, {
        params: {
          input: searchQuery,
          types: 'establishment', // Search for places that are businesses.
          location: '32.7767,-96.7970', // Central coordinates for Dallas
          radius: 50000, // Define the search radius in meters
          key: 'AIzaSyCvOCWqc-IOvr5C7FZo7IO8oIvSz5aR6Hk',
        },
      });

      if (response.data && response.data.predictions) {
        setResults(response.data.predictions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const placeDetails = data.result;
        const coordinates = placeDetails.geometry.location;
        console.log('Coordinates:', coordinates);
        setCoords(coordinates);
        // Use these coordinates to place a marker on the map
      } else {
        console.error('Place Details request failed:', data.status);
      }
    })
    .catch(error => console.error('Error:', error));
};

export default ModalSearch;
