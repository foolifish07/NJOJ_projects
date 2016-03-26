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
      <a href="#" v-on:click="selectView('Main')"> All Balloons </a></li>
    <li role="presentation" v-bind:class="{'active':currentView==='All2Sent'}">
      <a href="#" v-on:click="selectView('All2Sent')"> All to sent </a></li>
    <li role="presentation" v-bind:class="{'active':currentView==='HasSent'}">
      <a href="#" v-on:click="selectView('HasSent')"> Has sent </a></li>
    <li role="presentation" v-bind:class="{'active':currentView==='MyRoom'}">
      <a href="#" v-on:click="selectView('MyRoom')"> MyRoom </a></li>
  </ul>

  <has-sent v-if="currentView=='Main'"
    :title="Main"
    :list="list" 
    :color="color" ></has-sent>
  <has-sent v-if="currentView=='All2Sent'"
    :title="All2Sent"
    :list="tosentList" 
    :color="color" ></has-sent>
  <has-sent v-if="currentView=='HasSent'"
            :title="Balloon has sent"
            :list="sentList"
            :color="color" ></has-sent>

  <balloon-table v-if="currentView=='MyRoom'"
    :title="'MyRoom'"
    :list="tosentList" 
    :color="color" 
    :users="users" 
    :can-edit="true"></balloon-table>

</div>
  
</template>

<script>
  
  import BalloonTable from './BalloonTable.vue'
  import HasSent from './HasSent.vue'

  import ColorStore from './ColorStore.js'
  import Client from './Client.js'

	export default {
		data() {
			return {
        list: Client.fetchBalloons(),
        users: Client.fetchUsers(),
        problemlist: Client.fetchProblems(),
        color: ColorStore.fetch(),

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
      BalloonTable, HasSent
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
      }
    }
	}
</script>