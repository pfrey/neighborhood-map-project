class Helper {
  static baseURL(){
    return "https://api.foursquare.com/v2"
  }
  static auth(){
    const keys = {
      client_id: "ORMEUFMFTJIPPYRESL0CA30M1X0QNGU1NRZ03NKD311S4QDH",
      client_secret: "RN4OH1PHIAZAMH52FHZ5I4LGA5VULXXGQ304C00ALCZXCKNK",
      v: "20181003"
    };

    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(urlParams) {
    if(!urlParams) {
      return ""
    }
    return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(
      `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
        urlParams
      )}`,
      requestData
    )
      .then(Helper.checkStatus)
      .then(response => response.json())
      .catch(error => {
        alert(
          'An error occurred fetching Foursquare: ' +
            error.response
        );
      });
  }
  // https://medium.com/@yoniweisbrod/interacting-with-apis-using-react-native-fetch-9733f28566bb
  static checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error = response;
      throw error;
    }
  }
}


export default class FoursquareAPI {
  static search(urlParams) {
    return Helper.simpleFetch("/venues/search", "GET", urlParams);
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
}