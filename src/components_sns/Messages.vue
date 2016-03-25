<template>
		
		<li class="list-group-item {{ isRead?'':'read' }}" >
			<div class="row">
				<div class="col-sm-2" ></div>
				<div class="col-sm-10">
					<div>
				  	<label></label>
				    <em class="pull-right">{{ who.name }}</em>
					</div>
					<a href="#" v-on:click="read()">
						<p> {{ content }} </p>
					</a>
					<div>
						<small> {{ sendTime }} </small>
				  	<a href="#" class="pull-right" v-on:click="reply">Reply</a> 
				  </div>
				</div>
			</div>
		</li>

</template>

<script type="text/javascript">
	export default {
		props: {
			content: {
				type: String,
				default: null,
			},
			who: {
				type: Object,
				default: function() {
					return { name: null, userid: null }
				}
			},
			sendTime: {
				type: Date,
				default: null,
			},
			isRead: {
				type: Boolean,
				default: false,
			}
		},
		methods: {
			reply: function(){
				this.$dispatch( 'reply', this.who );
			},
			read: function(){
				this.isRead = true;
			}
		}
	}
</script>

<style type="text/css">

.read{
	font-weight: bold;
}

</style>