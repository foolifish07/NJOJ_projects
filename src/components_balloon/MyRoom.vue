<template>



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
			currentPage: 0,	
		}
	},
	computed: {
		pageList: {
			get: function(){
				return this.cutList(this.list, this.pageNum);
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

		send_balloon :function( item ){
			this.$dispatch('send_balloon', item );
		},

		setCurrentList: function( num ){
			return this.currentPage = num;
		},
		next: function(){
    	if ( this.currentPage<this.pageList.length )
    		this.currentPage++;
    },
    prev: function(){
    	if ( this.currentPage>0 )
    		this.currentPage--;
	  }
	}
}	

</script>

<style type="text/css">

</style>