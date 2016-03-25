<template>
	
	<h3>New Message</h3>
	<form>
	  <div class="form-group">
	    <label>Send to:</label> 
	    <span class="glyphicon glyphicon-remove alert-danger">No user</span>
	    <input type="text" class="form-control" placeholder="Send to" 
	    	v-model="user.name">
	  </div>
	  <!--div class="form-group">
	    <label>Title:</label>
	    <span class="glyphicon glyphicon-remove alert-danger">Needed</span>
	    <input type="text" class="form-control" placeholder="Title">
	  </div-->
	  <div class="form-group">
	    <label>Content:</label>
	    <span class="glyphicon glyphicon-remove alert-danger">Needed</span>
	    <textarea class="form-control" rows="12" placeholder="Content"
	    	v-model="content"></textarea> 
	  </div>

	  <button class="btn btn-primary btn-lg center-block">Submit</button>
	</form>

</template>

<script type="text/javascript">
	export default{
		props: {
			user: {
				type: Object,
				default: function() {
					return { name:null, userid:null };
				}
			},
		},
		data() {
			return {
				content: ''
			}
		},
		computed: {
			username: {
				get: function(){
					return '';
				}
			},
			userid: {
				get: function(){
					return '';
				}
			}
		}
	}
</script>