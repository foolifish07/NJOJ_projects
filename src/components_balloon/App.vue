<template>

<div class="container" style="margin-top: 80px">

  <table class="table table-condensed text-center ">
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
  </button>

  <ul class="nav nav-tabs">
    <li role="presentation" v-bind:class="{'active':currentView==='Main'}">
      <a href="#" v-on:click="selectView('Main')"> Main </a></li>
    <li role="presentation" v-bind:class="{'active':currentView==='MyRoom'}">
      <a href="#" v-on:click="selectView('MyRoom')"> MyRoom </a></li>
  </ul>

  <balloon-table v-if="currentView=='Main'"
    :title="Main"
    :list="list" 
    :color="color" 
    :users="users"></balloon-table>
  <balloon-table v-if="currentView=='MyRoom'"
    :title="'MyRoom'"
    :list="list" 
    :color="color" 
    :users="users" 
    :can-edit="true"></balloon-table>

</div>
  
</template>

<script>
  
  import BalloonTable from './BalloonTable.vue'
  import ColorStore from './ColorStore.js'
  import Client from './Client.js'

	export default {
		data() {
			return {
        list: Client.fetchBalloons(),
        users: Client.fetchUsers(),
        problemlist: Client.fetchProblems(),
        color: ColorStore.fetch(),

        currentView: 'Main', // Main, MyRoom
			}
		},
    components: {
      BalloonTable
    },
    methods: {
      saveColor: function(){
        ColorStore.save( this.color );
      },

      selectView: function( view ){
        this.currentView = view ;
      }
    }
	}
</script>