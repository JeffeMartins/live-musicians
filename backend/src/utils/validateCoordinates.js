module.exports = function validateCoordinates(latitude, longitude) {
 const lat=Number(latitude), lon=Number(longitude);
 if(latitude === '' || longitude === '' || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat)>90 || Math.abs(lon)>180) { const error=new Error('Invalid coordinates');error.status=400;throw error; }
 return [lon,lat];
};
