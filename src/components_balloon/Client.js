let list = new Array();
let problemlist = new Array();
let users = new Array();

// test data 
(function(){
  let comzyh1 = {
    submission: 1111,
    username: 'Comzyh1',
    userid: 11111,
    label: 'B',
    isFirstBlood: false,
    isSent: false,
    sentTime: null,
  };
  let comzyh2 = {
      submission: 22222,
      username: 'Comzyh2',
      userid: 11111,
      label: 'A',
      isFirstBlood: true,
      isSent: true,
      sentTime: new Date(),
    };
  let comzyh = {
      submission: 0,
      username: 'Comzyh1',
      userid: 11111,
      label: 'C',
      isFirstBlood: false,
      isSent: false,
      sentTime: null,
    }  
  for(let i=0;i<12;i++){
    list.push( comzyh );
    list.push( comzyh1 );
    list.push( comzyh2 );
  }
  problemlist = ['A','B'];
  users = [
    'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
    'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
    'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
    'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
    'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
    'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
    'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
    'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
  ]
}())


// fetch data
function fetchData(){
  list = new Array(), problemlist = new Array();
  $.ajax({ 
    type: "get", 
    url: "data/", 
    cache:false, 
    async:false, // tong bu
    dataType: "json",
    success: function( data ){ 
      // problemlist
      problemlist = data.labels;
      // list
      list = new Array();
      for(let i in data.data){
        let item = data.data[i];
        let tmp = {
          submission: item[0],
          username: item[1],
          userid: item[1],
          label: item[2],
          isFirstBlood: false,
          isSent: item[4]!=null,
          sentTime: new Date( Date.parse(item[4])  ),
        }
        list.push( tmp );
      }
    },
  });

  getFirstBlood( list );

  return {
    list: list, problemlist: problemlist,
  }
  
}

// keep list descending and get firstblood
let getFirstBlood = function( list ){
  list.sort(function(ele1, ele2){
    return ele2.submission - ele1.submission;
  });

  let firstBlood = new Object();
  for(let i=65;i<90;i++){
    let c = String.fromCharCode(i);
    firstBlood[c] = null;
  }
  for(let i in list){
    let c = list[i].label;
    firstBlood[ c ] = list[i].submission;
  }
  for(let i in list){
    let c = list[i].label;
    list[i].isFirstBlood = ( firstBlood[ c ]===list[i].submission );
  }
}

export default {
  fetchData , 
  fetchProblems: function() {
    return fetchData().problemlist;
  },
  fetchBalloons: function() {
    return fetchData().list;
  },
  fetchUsers: function(){
    return users;
  },

  send_balloon: function(player, label, sender ){
    let sent_time = null; 

    $.ajax({
      url: 'data/',
      type: 'post',
      async: false,
      data: {
        user: player, 
        label: label,
      },
      success: function( data ){
        if ( data!=null && data.sent_time!=null )
          sent_time = new Date( Date.parse(data.sent_time) );
      },
    })
    return sent_time;
  },
}