<template>

	<ul class="list-group" style="margin-top:30px">
		
		<li class="list-group-item">
			<div class="row">
				<div class="col-sm-2" ></div>
				<div class="col-sm-10">
					<div>
				  	<label></label>
				    <em class="pull-right">{{ who.name }}</em>
					</div>
					<p> {{ content }} </p>
					<div>
						<small> {{ sentTime }} </small>
				  	<a href="#" class="pull-right" v-on:click="reply">Reply</a> 
				  </div>
				</div>
			</div>
		</li>
		
	</ul>	

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
					return { name: null,userid: null }
				}
			},
			sendTime: {
				tpe: Date,
				default: null
			}
		},
		methods: {
			reply: function(){
				this.$dispatch( 'reply', this.who );
			}
		}
	}
</script>