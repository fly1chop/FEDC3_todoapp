export const parse = (querystring) => {
  // '?name=jane&age=28'
  // split by '&'
  // make into key=value object
  // return object

    return querystring.split('&').reduce((acc, keyAndValue) => {
      const [key, value] = keyAndValue.split('=');

      if(key && value){
        acc[key] = value
      }
      return acc
    },{})
}