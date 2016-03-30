<template>

<div class="container" style="margin-top: 80px">

  <!--table class="table table-condensed text-center ">
    <thead>
      <tr style="font-weight: bold">
        <td v-for="item in problemlist" track-by="$index" >
          {{  item }}
        </td>  
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="item in problemlist"track-by="$index">
          <div class="form-group">
            <input type="color" v-model="color[item]">
          </div>
        </td> 
      </tr>
      <tr> 
        <td v-for="item in problemlist" track-by="$index">
          {{ color[item] }}
        </td> 
      </tr>
    </tbody>
  </table>
  <button class="btn btn-primary center-block" 
    v-on:click="saveColor()"> 
    Save color scheme and store in local
  </button-->

  <ul class="nav nav-tabs">
    <li role="presentation" v-bind:class="{'active':currentView==='Main'}">
      <a href="#" v-on:click="selectView('Main')"> All </a></li>
    <li role="presentation" v-bind:class="{'active':currentView==='All2Sent'}">
      <a href="#" v-on:click="selectView('All2Sent')"> All to send </a></li>
    <li role="presentation" v-bind:class="{'active':currentView==='HasSent'}">
      <a href="#" v-on:click="selectView('HasSent')"> All have sent </a></li>
    <li role="presentation" v-bind:class="{'active':currentView==='MyRoom'}">
      <a href="#" v-on:click="selectView('MyRoom')"> MyRoom </a></li>
  </ul>

  <!--Sub components -->
  <div style="margin-top: 30px">
    <!-- main -->
    <div v-if="currentView=='Main'">
      <balloon-table :title="'Main'"
                :list="list" 
                :color="color"
                :page-num="10" ></balloon-table>
    </div>

    <!-- All2Sent -->
    <div v-if="currentView=='All2Sent'">
      <balloon-table 
                :title="'All2Sent'"
                :list="tosentList" 
                :color="color" 
                :page-num="5" ></balloon-table>
    </div>

    <!-- HasSent -->
    <div v-if="currentView=='HasSent'">
      <balloon-table :title="'Have been sent'"
                :list="sentList"
                :color="color"
                :page-num="5" ></balloon-table>
    </div>

    <div v-if="currentView=='MyRoom'">
      <users></users>
      <balloon-table :title="'MyRoom'"
                :list="tosentList"
                :color="color"
                :page-num="5"
                :open-white-list="true"
                :white-list="filterUsers"  ></balloon-table>
    </div>

  </div>

</div>
  
</template>

<script>
  
  import BalloonTable from './BalloonTable.vue'
  import Users from './Users.vue'

  import ColorStore from './ColorStore.js'
  import Client from './Client.js'
  import RoomStore from './RoomStore.js'

	export default {
		data() {
			return {
        list: Client.fetchBalloons(),
        users: Client.fetchUsers(),
        problemlist: Client.fetchProblems(),
        color: ColorStore.fetch(),
        filterUsers: RoomStore.fetch(),

        currentView: 'Main', // Main, HasSent, All2Sent, MyRoom
			}
		},
    computed: {
      sentList: {
        get: function(){
          return this.list.filter(function(ele, index, arr){
            return ele.isSent;
          });
        }
      },
      tosentList: {
        get: function(){
          return this.list.filter(function(ele, index, arr){
            return !ele.isSent;
          });
        }
      }
    },
    components: {
      BalloonTable, Users
    },
    methods: {
      saveColor: function(){
        ColorStore.save( this.color );
      },

      selectView: function( view ){
        this.currentView = view ;
      },
    },
    events: {
      'send_balloon' :function( item ){
        let res = Client.send_balloon( item.name )
        if( res.status ){
          this.list.forEach(function(ele){
            if ( ele.submission===item.submission ){
              ele.isSent = true;
              ele.sentTime = res.time;
            }
          });
        }
        return true;
      },
      'changeWhiteList': function( filterUsers ) {
        //this.filterUsers = filterUsers;
        this.filterUsers = RoomStore.fetch();
      }
    }
	}
</script>