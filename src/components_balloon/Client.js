let list = [
  {
    submission: 1111,
    username: 'Comzyh1',
    userid: 11111,
    label: 'B',
    isFirstBlood: false,
    isSent: false,
    sentTime: null,
  },
  {
    submission: 1111,
    username: 'Comzyh2',
    userid: 11111,
    label: 'B',
    isFirstBlood: true,
    isSent: true,
    sentTime: new Date(),
  },
]

let users = [
  'comzyh', 'hdd', 'yangz', 'Comzyh2'
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
    return true;
  },
}