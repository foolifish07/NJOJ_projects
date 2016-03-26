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
  'comzyh', 'hdd', 'yangz', 'Comzyh2', 'Comzyh1'
]

let problemlist = ['A','B','C','D','E'];

export default {
  fetchProblems: function() {
    return problemlist;
  },
  fetchBalloons: function() {
    return list;
  },
  fetchUsers: function(){
    return users;
  },
  send_balloon: function(who, submission){
    return { status: true, time: new Date() };
  },
}