export function getTimeFromTimestamp(ts) {
  const hours = Math.trunc(ts / (60 * 60)); // get only the integer
  const minutes = Math.trunc((ts - hours * 60 * 60) / 60);
  const seconds = (ts - hours * 60 * 60) % 60;
  return {hours, minutes, seconds};
}

// function to calculate distance between two geolocation points
export function getDistanceBetweenPoints(point1, point2) {
  const {latitude: lat1, longitude: lon1} = point1;
  const {latitude: lat2, longitude: lon2} = point2;
  const R = 6371000; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in metres
}
