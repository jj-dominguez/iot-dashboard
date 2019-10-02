/** ***** camelCase *****
* Returns camelCased version of a string
*/
const camelCase = string => {
    if (!string) {
      return
    }
    return string.match(/[a-z]+/gi)
      .map((word, i) => {
        if (i === 0) {
          return word.toLowerCase()
        } else {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        }
      }).join('')
}

/** ***** calculateDewPoint *****
* NOTE: dew point calc (using the Magnus-Tetens formula (Sonntag90))
// Ts = (b * α(T,RH)) / (a - α(T,RH))
// where Ts is dew point(c), T is temp(c), RH is relative humidity, a and b are coefficients, and
// α(T,RH) is = `ln(RH/100) + a*T/(b+T)`
*/
const calculateDewPoint = (tempF, relativeHumidity) => {
    // coefficient constants
    const a = 17.62;
    const b = 243.12;

    const tempC = ((tempF - 32) * 5) / 9;
    const alphaTempHumidity = Math.log(relativeHumidity / 100) + ( a * tempC) / (b + tempC);
    const dewPointC = ((b * alphaTempHumidity) / (a - alphaTempHumidity));
    const dewPointF = ((dewPointC * 9) / 5) + 32;

    return dewPointF;
}


export {
    camelCase,
    calculateDewPoint
}
