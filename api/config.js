export const URL = {
  ico: 'https://api.ico-check.com/'
}

export const HELPERS = {

  makeParams(params) {
    let append = '?';
    let index = 0;
    for (var key of Object.keys(params)) {
      const item = params[key];
      if (item !== '') {
        if (index > 0) {
          append += '&'
        }
        append += key + '=' + item
      }
      index++;
    }
    return append
  }

}