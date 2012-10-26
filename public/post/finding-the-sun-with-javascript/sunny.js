/* Sunny
 * 
 * Created by Ozan Turgut in November 2010
 * Based on the NOAA Solar Calculator at http://www.esrl.noaa.gov/gmd/grad/solcalc/
 * Released to the Public Domain
 * 
 * Sunny is a toolkit which provides information on the position of the Sun. It's
 * basically the NOAA Solar Calculator rewritten to be more approachable/usable.
 * In fact, I have no idea what some of these things are! It all seems to work, 
 * however in comparing results to the NOAA Solar Calculator. Please don't use this
 * in anything important without first going through the functions.
 * 
 * Main functions:
 * 		sunrise(space, time): returns a Date() object of the time of the sunset
 * 				on a given date and place.
 * 		sunset(space, time): similar to sunrise().
 * 		solar_noon(space, time): returns a Date() object of the time when the 
 * 				local solar noon occurs at a given date and place.
 * 		azimuth_and_elevation(space, time): returns an object containing the 
 * 				azimuth and elevation of the sun at a given time and place.
 * 
 * Other information Sunny can provide: 
 *	    right ascention of the sun
 *		hour angle of the sunrise
 *		declination of the sun
 *		equation of time
 *		geometric mean longitude of the sun
 *		orbital eccentiricty of earth
 *		obliquity correction
 *		mean obliquity of ecliptic
 *		apparent longitude of the sun
 *		true longitude of the sun
 *		center of the sun
 *		geometric mean anomaly of the sun
 *		the julian date for a given year/month/date
 *		the julian century for a given julian date
 *
 *	Examples (These are available to test at the bottom of this script):
 *		Get the sunset for November 25, 2010 in Seattle, WA
 *			seattle_location = {latitude: 47.6, longitude:-122.32};
 *			time = {year: 2010, month:11, day: 25};
 *			sunset = Sunny.sunset(seattle_location, time);
 * 
 *		Get the solar noon for December 22, 2010 in Stockholm, Sweden
 *			stockholm_location = {latitude:59.333, longitude: 18.067}
 *			time = {year:2010, month:12, day: 22}
 *			solar_noon = Sunny.solar_noon(stockholm_location, time);
 *
 *		Get the azimuth and elevation of the sun at 1:30 PM on July 4, 1345 in Santiago, Chile
 *			santiago_location = {latitude:-34.6, longitude:-58.45}
 *			time = {year:1345, month:7, day: 4, hour:13, minute:30, second:0, zone:-3, dst:false}
 *			azimuth_and_elevation = Sunny.azimuth_and_elevation(santiago_location, time);
 */


var Sunny = {}; // If the "Sunny" namespace conflicts with your project, 
				// you can search and replace all instances of "Sunny" 
				// with anything of your choosing without ill-effects.

/* sunriseUTC
 * Returns the time of the sunrise (in minutes UT) at latitude/longitude on the given julian_date in UT
 * 
 * Parameters
 *  julian_date: Integer
 *  latitude: Integer
 *  longitude: Integer
 */
Sunny.sunriseUTC = function(julian_date, latitude, longitude){
    var time = Sunny.julian_century(julian_date);
    return 720 - (4.0 * (longitude + Sunny.radian_TO_degree(Sunny.hour_angle_of_sunrise(latitude, Sunny.declination_of_sun(time))))) - Sunny.equation_of_time(time);
};

/* sunsetUTC
 * Returns the time of the sunset (in minutes UT) at latitude/longitude on the given julian_date in UT 
 *
 * Parameters
 *  julian_date: Integer
 *  latitude: Integer
 *  longitude: Integer
 */
Sunny.sunsetUTC = function(julian_date, latitude, longitude){
    var time = Sunny.julian_century(julian_date);
    return 720 - (4.0 * (longitude - Sunny.radian_TO_degree(Sunny.hour_angle_of_sunrise(latitude, Sunny.declination_of_sun(time))))) - Sunny.equation_of_time(time);
};

/* sunrise
 * Returns a new Date() object of the sunrise (in UT) at this space and time
 * 
 * Parameters
 * 	space   .latitude: Number
 * 			.longitude: Number
 * 
 *  time    .year: Integer
 *  		.month: Positive integer
 *  		.day: Positive integer
 */
Sunny.sunrise = function(space, time){
    var julian_date = Sunny.julian_date(time.year, time.month, time.day);
    var sunrise = new Date(0);
    sunrise.setUTCFullYear(time.year, time.month-1, time.day);

    var sunriseUTC = Sunny.sunriseUTC(julian_date, space.latitude, space.longitude);
    sunriseUTC = Sunny.sunriseUTC(julian_date + sunriseUTC / 1440.0, space.latitude, space.longitude);
    if (isNaN(sunriseUTC)) {
        var day_of_year = Sunny.julian_date_TO_day_of_year(julian_date);
        
        if (((space.latitude > 66.4) && (day_of_year > 79) && (day_of_year < 267)) || ((space.latitude < -66.4) && ((day_of_year < 83) || (day_of_year > 263)))) {
            while (isNaN(sunriseUTC)) {
                julian_date--;
                sunrise.setTime(sunrise.getTime() - 86400000);
                sunriseUTC = Sunny.sunriseUTC(julian_date, space.latitude, space.longitude);
            }
        } else {
            while (isNaN(sunriseUTC)) {
                julian_date++;
                sunrise.setTime(sunrise.getTime() + 86400000);
                sunriseUTC = Sunny.sunriseUTC(julian_date, space.latitude, space.longitude);
            }
        }
    }
    
    sunrise.setTime(sunrise.getTime() + (sunriseUTC * 60000));
    return sunrise;
};

/* sunset
 * Returns a new Date() object of the sunset (in UT) at this space and time
 * 
 * Parameters
 * 	space   .latitude: Number
 * 			.longitude: Number
 * 
 *  time    .year: Integer
 *  		.month: Positive integer
 *  		.day: Positive integer
 */
Sunny.sunset = function(space, time){		
    var julian_date = Sunny.julian_date(time.year, time.month, time.day);
    var sunset = new Date(0);
	sunset.setUTCFullYear(time.year,time.month-1,time.day);
	
    var sunsetUTC = Sunny.sunsetUTC(julian_date, space.latitude, space.longitude);
    sunsetUTC = Sunny.sunsetUTC(julian_date + sunsetUTC / 1440.0, space.latitude, space.longitude);
    if (isNaN(sunsetUTC)) {
        var day_of_year = Sunny.julian_date_TO_day_of_year(julian_date);
        
        if (((space.latitude > 66.4) && (day_of_year > 79) && (day_of_year < 267)) || ((space.latitude < -66.4) && ((day_of_year < 83) || (day_of_year > 263)))) {
            while (isNaN(sunsetUTC)) {
                julian_date++;
                sunset.setTime(sunset.getTime() + 86400000);
                sunsetUTC = Sunny.sunsetUTC(julian_date, space.latitude, space.longitude);
            }
        } else {
            while (isNaN(sunsetUTC)) {
                julian_date--;
                sunset.setTime(sunset.getTime() - 86400000);
                sunsetUTC = Sunny.sunsetUTC(julian_date, space.latitude, space.longitude);
            }
        }
    }
    
    sunset.setTime(sunset.getTime() + (sunsetUTC * 60000));
    return sunset;
};

/* azimuth_and_elevation
 * Returns an object of form {azimuth: [Number], elevation: [Number]}
 * 
 * Parameters
 * 	space   .latitude: Number
 * 			.longitude: Number
 * 
 *  time    .year: Integer
 *  		.month: Positive integer
 *  		.day: Positive integer
 *  		.hour: Positive integer
 *  		.minute: Positive integer
 *  		.second: Positive integer
 *  		.zone: Integer (time difference from UTC)
 *  		.dst: Boolean (indicates daylight savings time)
 */
Sunny.azimuth_and_elevation = function(space, time){
	var time_difference = time.hour * 60 + time.minute + time.second / 60.0 - time.zone * 60;
	if(time.dst) time_difference -= 60;
	
	var julian_century = Sunny.julian_century(Sunny.julian_date(time.year, time.month, time.day) + time_difference / 1440.0);

	
    var eqTime = Sunny.equation_of_time(julian_century);
    var theta = Sunny.declination_of_sun(julian_century);
    
    var trueSolarTime = eqTime + 4.0 * space.longitude + time_difference;
    while (trueSolarTime > 1440){trueSolarTime -= 1440}
    
    var hourAngle = trueSolarTime / 4.0 - 180.0;
    if (hourAngle < -180){hourAngle += 360.0;}
    
    var haRad = Sunny.degree_TO_radian(hourAngle);
    var csz = Math.sin(Sunny.degree_TO_radian(space.latitude)) * Math.sin(Sunny.degree_TO_radian(theta)) + Math.cos(Sunny.degree_TO_radian(space.latitude)) * Math.cos(Sunny.degree_TO_radian(theta)) * Math.cos(haRad);
    if (csz > 1.0){csz = 1.0;}
    else if (csz < -1.0){csz = -1.0;}
    
    var zenith = Sunny.radian_TO_degree(Math.acos(csz));
    var azDenom = (Math.cos(Sunny.degree_TO_radian(space.latitude)) * Math.sin(Sunny.degree_TO_radian(zenith)));
    if (Math.abs(azDenom) > 0.001) {
        azRad = ((Math.sin(Sunny.degree_TO_radian(space.latitude)) * Math.cos(Sunny.degree_TO_radian(zenith))) - Math.sin(Sunny.degree_TO_radian(theta))) / azDenom;
        if (Math.abs(azRad) > 1.0) {
            if (azRad < 0){azRad = -1.0;}
            else{azRad = 1.0;}
        }
        
        var azimuth = 180.0 - Sunny.radian_TO_degree(Math.acos(azRad));
        if (hourAngle > 0.0){azimuth = -azimuth;}
    } else {
        if (space.latitude > 0.0){azimuth = 180.0;}
        else{azimuth = 0.0;}
    }
	
    if (azimuth < 0.0){azimuth += 360.0;}
    
    var exoatmElevation = 90.0 - zenith;
    
    // Atmospheric refraction correction
    
    if (exoatmElevation > 85.0){
        var refractionCorrection = 0.0;
    } else {
        var te = Math.tan(Sunny.degree_TO_radian(exoatmElevation));
        if (exoatmElevation > 5.0) {
            var refractionCorrection = 58.1 / te - 0.07 / (te * te * te) + 0.000086 / (te * te * te * te * te);
        } else if (exoatmElevation > -0.575) {
            var refractionCorrection = 1735.0 + exoatmElevation * (-518.2 + exoatmElevation * (103.4 + exoatmElevation * (-12.79 + exoatmElevation * 0.711)));
        } else {
            var refractionCorrection = -20.774 / te;
        }
		
        refractionCorrection = refractionCorrection / 3600.0;
    }
    
    var solarZen = zenith - refractionCorrection;
	
	return {'azimuth': azimuth, 'elevation': (90 - solarZen)};
};

/* solar_noon
 * Returns a Date() object of the solar noon (in UT) at a given space and time
 * 
 * Parameters
 * 	space   .latitude: Number
 * 			.longitude: Number
 * 
 *  time    .year: Integer
 *  		.month: Positive integer
 *  		.day: Positive integer
 */
Sunny.solar_noon = function(space, time){
    var solar_noon = new Date(0);
    solar_noon.setUTCFullYear(time.year, time.month-1, time.day);

	var julian_date = Sunny.julian_date(time.year, time.month, time.day);
	var julian_century = Sunny.julian_century(julian_date - space.longitude / 360);
    var equation_of_time = Sunny.equation_of_time(julian_century);
    var solar_noon_offset = 720.0 - (space.longitude * 4) - equation_of_time; // in minutes
    julian_century = Sunny.julian_century(julian_date + solar_noon_offset / 1440.0);
    equation_of_time = Sunny.equation_of_time(julian_century);
	var local_solar_noon = 720 - (space.longitude * 4) - equation_of_time; 

	solar_noon.setTime(solar_noon.getTime() + (local_solar_noon * 60000));
	return solar_noon;
};

Sunny.julian_date_TO_day_of_year = function(julian_date){
    var z = Math.floor(julian_date + 0.5);
    var f = (julian_date + 0.5) - z;
    if (z < 2299161) {
        var A = z;
    } else {
        alpha = Math.floor((z - 1867216.25) / 36524.25);
        var A = z + 1 + alpha - Math.floor(alpha / 4);
    }
    var B = A + 1524;
    var C = Math.floor((B - 122.1) / 365.25);
    var D = Math.floor(365.25 * C);
    var E = Math.floor((B - D) / 30.6001);
    var day = B - D - Math.floor(30.6001 * E) + f;
    var month = (E < 14) ? E - 1 : E - 13;
    var year = (month > 2) ? C - 4716 : C - 4715;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        k = 1;
    } else {
        k = 2;
    }
    
    return Math.floor((275 * month) / 9) - k * Math.floor((month + 9) / 12) + day - 30;
};

Sunny.right_ascention_of_sun = function(julian_century){
    var obliquity_correction = Sunny.obliquity_correction(julian_century);
    var apparent_longitude_of_sun = Sunny.apparent_longitude_of_sun(julian_century);
    var tananum = (Math.cos(Sunny.degree_TO_radian(obliquity_correction)) * Math.sin(Sunny.degree_TO_radian(apparent_longitude_of_sun)));
    var tanadenom = (Math.cos(Sunny.degree_TO_radian(apparent_longitude_of_sun)));
    return Sunny.radian_TO_degree(Math.atan2(tananum, tanadenom));
};	

Sunny.hour_angle_of_sunrise = function(latitude, declination_of_sun){
    var latRad = Sunny.degree_TO_radian(latitude);
    var sdRad = Sunny.degree_TO_radian(declination_of_sun);
    var HAarg = (Math.cos(Sunny.degree_TO_radian(90.833)) / (Math.cos(latRad) * Math.cos(sdRad)) - Math.tan(latRad) * Math.tan(sdRad));
    return Math.acos(HAarg); // in radians (for sunset, use -HA)
};

Sunny.declination_of_sun = function(julian_century){
    var obliquity_correction = Sunny.obliquity_correction(julian_century);
    var apparent_longitude_of_sun = Sunny.apparent_longitude_of_sun(julian_century);
    
    var sint = Math.sin(Sunny.degree_TO_radian(obliquity_correction)) * Math.sin(Sunny.degree_TO_radian(apparent_longitude_of_sun));
    return Sunny.radian_TO_degree(Math.asin(sint));
};

Sunny.equation_of_time = function(julian_century){
    var epsilon = Sunny.obliquity_correction(julian_century);
    var l0 = Sunny.geometric_mean_longitude_of_sun(julian_century);
    var e = Sunny.orbital_eccentricity_of_earth(julian_century);
    var m = Sunny.geometric_mean_anomaly_of_sun(julian_century);
    
    var y = Math.tan(Sunny.degree_TO_radian(epsilon) / 2.0);
    y *= y;
    
    var sin2l0 = Math.sin(2.0 * Sunny.degree_TO_radian(l0));
    var sinm = Math.sin(Sunny.degree_TO_radian(m));
    var cos2l0 = Math.cos(2.0 * Sunny.degree_TO_radian(l0));
    var sin4l0 = Math.sin(4.0 * Sunny.degree_TO_radian(l0));
    var sin2m = Math.sin(2.0 * Sunny.degree_TO_radian(m));
    
    var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
    return Sunny.radian_TO_degree(Etime) * 4.0; // in minutes of time
};

Sunny.geometric_mean_longitude_of_sun = function(julian_century){
    var L0 = 280.46646 + julian_century * (36000.76983 + julian_century * (0.0003032));
    while (L0 > 360.0){L0 -= 360.0;}
    while (L0 < 0.0){L0 += 360.0;}
    return L0; // in degrees
};

Sunny.orbital_eccentricity_of_earth = function(julian_century){
    return 0.016708634 - julian_century * (0.000042037 + 0.0000001267 * julian_century); // unitless
};

Sunny.obliquity_correction = function(julian_century){
    var e0 = Sunny.mean_obliquity_of_ecliptic(julian_century);
    var omega = 125.04 - 1934.136 * julian_century;
    var e = e0 + 0.00256 * Math.cos(Sunny.degree_TO_radian(omega));
    return e; // in degrees		
};

Sunny.mean_obliquity_of_ecliptic = function(julian_century){
    var seconds = 21.448 - julian_century * (46.8150 + julian_century * (0.00059 - julian_century * (0.001813)));
    var e0 = 23.0 + (26.0 + (seconds / 60.0)) / 60.0;
    return e0; // in degrees		
};

Sunny.apparent_longitude_of_sun = function(julian_century){
    var o = Sunny.true_longitude_of_sun(julian_century);
    var omega = 125.04 - 1934.136 * julian_century;
    var lambda = o - 0.00569 - 0.00478 * Math.sin(Sunny.degree_TO_radian(omega));
    return lambda; // in degrees
};

Sunny.true_longitude_of_sun = function(julian_century){
    return Sunny.geometric_mean_longitude_of_sun(julian_century) + Sunny.center_of_sun(julian_century); // in degrees		
};

Sunny.center_of_sun = function(julian_century){
    var m = Sunny.geometric_mean_anomaly_of_sun(julian_century);
    var mrad = Sunny.degree_TO_radian(m);
    var sinm = Math.sin(mrad);
    var sin2m = Math.sin(mrad + mrad);
    var sin3m = Math.sin(mrad + mrad + mrad);
    var C = sinm * (1.914602 - julian_century * (0.004817 + 0.000014 * julian_century)) + sin2m * (0.019993 - 0.000101 * julian_century) + sin3m * 0.000289;
    return C; // in degrees
};

Sunny.geometric_mean_anomaly_of_sun = function(julian_century){
    return 357.52911 + julian_century * (35999.05029 - 0.0001537 * julian_century); // in degrees
};	

Sunny.julian_date = function(year, month, date){
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    
    var A = Math.floor(year / 100);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + date + (2 - A + Math.floor(A / 4)) - 1524.5;
};

Sunny.julian_century = function(julian_date){
    return (julian_date - 2451545.0) / 36525.0;
};

Sunny.radian_TO_degree = function(radians){
    return (180.0 * radians / Math.PI);
};
Sunny.degree_TO_radian = function(degrees){
    return (Math.PI * degrees / 180.0);
};


/*
 * EXAMPLES
 */
/* DELETE THIS LINE TO ENABLE EXAMPLE OUTPUT
//Get the sunset for November 25, 2010 in Seattle, WA
seattle_location = {latitude: 47.6, longitude:-122.32};
time = {year: 2010, month:11, day: 25};
sunset = Sunny.sunset(seattle_location, time);
alert("Sunset (UTC) for November 25, 2010 in Seattle, WA (UTC): " + sunset.toUTCString());
//Get the solar noon for December 22, 2010 in Stockholm, Sweden
stockholm_location = {latitude:59.333, longitude: 18.067};
time = {year:2010, month:12, day: 22};
solar_noon = Sunny.solar_noon(stockholm_location, time);
alert("Solar noon (UTC) for December 22, 2010 in Stockholm, Sweden: " + solar_noon.toUTCString());
//Get the azimuth and elevation of the sun at 1:30 PM on July 4, 1345 in Santiago, Chile
santiago_location = {latitude:-34.6, longitude:-58.45};
time = {year:1345, month:7, day: 4, hour:13, minute:30, second:0, zone:-3, dst:false}
azimuth_and_elevation = Sunny.azimuth_and_elevation(santiago_location, time);
alert("Azimuth and elevation of the sun at 1:30 PM on July 4, 1345 in Santiago, Chile: Azimuth = " + azimuth_and_elevation.azimuth + ", Elevation = " + azimuth_and_elevation.elevation);
/*/