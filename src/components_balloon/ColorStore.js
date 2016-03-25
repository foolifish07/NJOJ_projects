
let key = 'color';

if ( !localStorage.getItem( key ) ){
  let tmp = new Object();
    // A - Z
  for(let i=65;i<=90;i++){
    let h = tmp[ String.fromCharCode(i) ];
    tmp[ String.fromCharCode(i) ] = '#000000';
  }
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