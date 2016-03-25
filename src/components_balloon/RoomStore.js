let key = 'room';

if ( !localStorage.getItem( key ) ){
  let tmp = new Array();
  localStorage.setItem( key,  JSON.stringify(tmp) );
}

export default {
  fetch() {
    return JSON.parse( localStorage.getItem( key ) );
  },
  save( newValue ) {
    localStorage.setItem( key,JSON.stringify(newValue) )
  }
}