<template>

<div class="row" style="margin-top: 30px">

<div class="col-sm-2">
	<div class="panel panel-primary">
		<div class="panel-heading"> Users </div>
		<ul class="list-group">
			<li class="list-group-item"	v-for="user in users" track-by="$index">
				{{ user }} 

				<a href="#" v-show="canEdit">
					<span class="glyphicon glyphicon-plus" style="color: green" 
						v-show="!inList( user ) "
						v-on:click="addUser( user )"> </span>
					<span class="glyphicon glyphicon-minus" style="color: green" 
						v-show="inList( user ) "
						v-on:click="deleteUser( user )"> </span>
				</a>
			</li>
		</ul>
	</div> 
</div>

<div class="col-sm-10">
	<div class="panel panel-primary" >
		<div class="panel-heading"> {{ title }}</div>
		<table class="table table-hove">
			<thead style="font-weight: bold">
				<tr>
					<td>Submission</td>
					<td>User</td>
					<td>Label</td>
					<td>Color</td>
					<td>First Blood</td>
					<td>Status</td>
				</tr>
			</thead>
			<tbody>
				<template v-for="item in list" track-by="$index">
					<tr v-show="filtered( item.username )">
						<td> {{ item.submission }}</td>
						<td> {{ item.username }}</td>
						<td v-bind:style="{color: color[item.label] }"> {{ item.label }} </td>
						<td v-bind:style="{color: color[item.label] }"> <label> {{ color[item.label] }}</label> </td>
						<td> <span class="glyphicon glyphicon-heart" 
										v-bind:style="{ color: color[item.label] }"
										v-if="item.isFirstBlood"></span> </td>
						<td> 
							<button class="btn btn-primary btn-sm"
								v-show="!item.isSent">Send</button>
							<p v-show="item.isSent"> {{ dateToString(item.sentTime) }} </p> 
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</div>

</div>

</template>

<script type="text/javascript">
	

/*
submission: string
username:  string
userid: number
Label: string
color: string
isFirstBlood: boolean
isSent: boolean
sentTime: Date
*/

import RoomStore from'./RoomStore.js'

export default {
	props: {
		title: {
			type: String,
			default: 'Balloon Board',
		},
		canEdit: {
			type: Boolean,
			default: false,
		},
		list: {
			type: Array,
			default: function() {
				return new Array();
			}
		},
		users: {
			type: Array,
			default: function(){
				return new Array();
			}
		},
		color: {
			type: Object,
			default: function(){
				return {
				"A":"#000000","B":"#000000","C":"#000000","D":"#000000","E":"#000000","F":"#000000","G":"#000000",
				"H":"#000000","I":"#000000","J":"#000000","K":"#000000","L":"#000000","M":"#000000","N":"#000000",
				"O":"#000000","P":"#000000","Q":"#000000","R":"#000000","S":"#000000","T":"#000000","U":"#000000",
				"V":"#000000","W":"#000000","X":"#000000","Y":"#000000","Z":"#000000"
				}
			}
		}
	},
	data() {
		return {
			filterUser: RoomStore.fetch(),
		}
	},	
	methods: {
		dateToString: function( d ) {
			if ( d===null ) return null;
			var s = d.toString();
			//return s.substring(0,s.length-15);
			return s;
		},

		filtered: function( name ){
			return !this.canEdit || this.inList( name );
		},

		inList: function( name ){
			return this.filterUser.some(function(ele, index, arr){
				return name === ele;
			}) 
		},
		addUser: function(name){
			this.filterUser.push( name );
			RoomStore.save( this.filterUser );
		},
		deleteUser: function(name){
			let tmp = this.filterUser;
			this.filterUser = tmp.filter(function(ele){
				return ele!=name
			});
			RoomStore.save( this.filterUser );
		}
	}
}	

</script>

<style type="text/css">
	
</style>