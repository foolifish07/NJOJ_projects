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
let list = new Array();
for(let i=0;i<12;i++){
  list.push( comzyh );
  list.push( comzyh1 );
  list.push( comzyh2 );
}

let users = [
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1',
]

let problemlist = ['A','B','C','D','E'];


// fetch data
function fetch_data(){
  list = new Array(), problemlist = new Array();
  $.ajax({ 
    type: "get", 
    url: "/balloon/data/", 
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
          sentTime: item[4],
        }
        list.push( tmp );
      }
    },
  });
  return {
    list: list, problemlist: problemlist,
  }
  
}

// keep list descending and get firstblood
(function(){
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
}())

export default {
  fetchProblems: function() {
    return fetch_data().problemlist;
  },
  fetchBalloons: function() {
    return fetch_data().list;
  },
  fetchUsers: function(){
    return users;
  },

  send_balloon: function(player, label, sender ){
    let send_time = null; 
    alert( player );
    alert( label );
    $.ajax({
      url: '/balloon/data',
      type: 'post',
      async: false,
      data: {
        user: player, 
        label: label,
      },
      success: function( data ){
        send_time = data.send_time
      },
    })
    return send_time;
  },
}