<template>

<div class="row" style="margin-top: 30px">
<div class="col-sm-12">

	<div class="panel panel-primary" >
		<div class="panel-heading"> {{ title }}</div>
		<table class="table table-hove table-condensed">
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

				<template v-for="item in pageList[currentPage]" track-by="$index">
					<tr>
						<td> {{ item.submission }}</td>
						<td> {{ item.username }}</td>
						<td v-bind:style="{color: color[item.label] }"> {{ item.label }} </td>
						<td v-bind:style="{color: color[item.label] }"> <label> {{ color[item.label] }}</label> </td>
						<td> <span class="glyphicon glyphicon-heart" 
									v-bind:style="{ color: color[item.label] }"
									v-if="item.isFirstBlood"></span> </td>
						<td> 
							<button class="btn btn-primary btn-sm"
								v-show="!item.isSent"
								v-on:click="send_balloon( item )">Send</button>
							<p v-show="item.isSent"> {{ dateToString(item.sentTime) }} </p> 
						</td>
					</tr>
				</template>

			</tbody>
		</table>
	</div>

	<nav>
	  <ul class="pagination">
	    <li>
	      <a href="#" aria-label="Previous" v-on:click="prev()">
	        <span aria-hidden="true" >&laquo;</span>
	      </a>
	    </li>

	    <template v-for="ele in pageList" track-by="$index">
	    	<li :class=" currentPage===$index?'active':'' ">
	    		<a href="#" v-on:click="setCurrentList($index)"> {{ $index + 1 }}</a></li>
	    </template>
	    
	    <li>
	      <a href="#" aria-label="Next" v-on:click="next()">
	        <span aria-hidden="true" >&raquo;</span>
	      </a>
	    </li>
	  </ul>
	</nav>
	{{ whiteList }}
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

export default {
	props: {
		title:{
			type: String,
			default: "Balloon has Sent",
		},
		list: {
			type: Array,
			default: function() {
				return new Array();
			}
		},
		pageNum: {
			type: Number,
			default: 5,
		},

		openWhiteList: {
			type: Boolean,
			default: false,
		},
		whiteList: {
			type: Array,
			default: function() {
				return new Array;
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
		},
	},
	data() {
		return {
			// for pagination
			currentPage: 0,	
		}
	},
	computed: {
		pageList: {
			get: function(){
				let list = this.list;
				
				if ( this.openWhiteList ){
					let inWhiteList = this.inWhiteList;
					list = this.list.filter(function(ele, index, arr){
						return inWhiteList( ele.username );
					});
				}
				return this.cutList(list, this.pageNum);
			}
		},
	}	,
	methods: {
		dateToString: function( d ) {
			if ( d===null ) return null;
			var s = d.toString();
			//return s.substring(0,s.length-15);
			return s;
		},
		// for pagination
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

		inWhiteList: function( name ){
			return this.whiteList.some(function(ele, index, arr){
				return name === ele;
			}) 
		},

		// send balloon
		send_balloon :function( item ){
			this.$dispatch('send_balloon', item );
		},

		// pagination event
		setCurrentList: function( num ){
			return this.currentPage = num;
		},
		next: function(){
    	if ( this.currentPage < this.pageList.length-1 )
    		this.currentPage++;
    },
    prev: function(){
    	if ( this.currentPage > 0 )
    		this.currentPage--;
	  }
	},

}	

</script>

<style type="text/css">

</style>