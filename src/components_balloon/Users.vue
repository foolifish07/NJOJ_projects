<template>

<div class="row" v-if="canEdit">

	<div class="col-sm-4" v-for="page in shownUsers[currentPage]" track-by="$index">
		<div class="panel panel-primary">
			<div class="panel-heading"> Users </div>

			<ul class="list-group">
				<li class="list-group-item" v-for="user in page" track-by="$index">
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

</div>

<nav>
	<ul class="pagination">
	  <li>
	    <a href="#" aria-label="Previous" v-on:click="prev()">
	      <span aria-hidden="true" >&laquo;</span>
	    </a>
	  </li>

	  <template v-for="ele in shownUsers" track-by="$index">
	  	<li :class=" currentPage===$index?'active':'' ">
	   	<a href="#" v-on:click="setCurrent( $index )"> {{ $index + 1 }}</a></li>
	  </template>
	    
	  <li>
	    <a href="#" aria-label="Next" v-on:click="next()">
       	<span aria-hidden="true" >&raquo;</span>
	    </a>
	  </li>
	</ul>
<nav>

</template>

<script type="text/javascript">

import RoomStore from './RoomStore.js'
import Client from './Client.js'

export default {
	props :{
		canEdit: {
			type: Boolean,
			default: true,
		}
	},
	data() {
		return {
			users: Client.fetchUsers(),
			filteredUsers: RoomStore.fetch(),

			currentPage: 0,
			pageNum: 15,
			pageLen: 5,
		}
	},
	computed: {
		shownUsers: {
			get: function(){
				let tmp = this.cutList( this.users, this.pageNum );
				let res = new Array;
				for(let i in tmp ){
					res.push( this.cutList( tmp[i], this.pageLen ) );
				}
				return res;
			},
		}
	},
	methods: {
		cutList: function(list, len) {
			let res = new Array;
			for(let i=0; i<list.length; i+=len){
				let tmp = list.filter(function(ele, index, arr){
					return ( i<=index && index<i+len && index<list.length )
				});
				res.push( tmp );
			}
			return res;
		},

		inList: function( name ){
			return this.filteredUsers.some(function(ele, index, arr){
				return name === ele;
			}) 
		},
		addUser: function(name){
			this.filteredUsers.push( name );
			RoomStore.save( this.filteredUsers );
			this.$dispatch('changeWhiteList', this.filterUsers ); 
		},
		deleteUser: function(name){
			let tmp = this.filteredUsers;
			this.filteredUsers = tmp.filter(function(ele){
				return ele != name
			});
			RoomStore.save( this.filteredUsers );
			this.$dispatch('changeWhiteList', this.filterUsers );
		},

		setCurrent: function(num){
			return this.currentPage = num;
		},
		next: function(){
    	if ( this.currentPage < this.shownUsers.length-1 )
    		this.currentPage++;
    },
    prev: function(){
    	if ( this.currentPage > 0 )
    		this.currentPage--;
	  }

	}
}
</script>