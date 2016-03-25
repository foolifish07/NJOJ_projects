<template>

<!-- Header -->
<div class="navbar navbar-fixed-top navbar-default" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed pull-right" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">展开</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class="pull-right visible-xs" style="margin-right: 10px">
                
                <ul class="nav navbar-nav" style="margin: 5px;margin-right: -5px">
                    <li class=""><a href="/Profile/">foolifish07</a></li>
                </ul>
                
            </div>
            <div class="pull-left" id="header-logo"><a href="/"><img width="42px" height="42px" src="/static/images/ICPC-Logo-Fishead.png"></a></div>
            <form class="visible-xs" id="search_form_xs" role="form">
                    <input class="form-control" id="search_area_xs" type="text" placeholder="">
            </form>
        </div>
        <div class="navbar-collapse collapse navbar-left">
            <ul class="nav navbar-nav">
                <li class="dropdown onhover-dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">平台<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/Problem/Local/">Local</a></li>
                        <li><a href="/Problem/Pku/">POJ</a></li>
                        <li><a href="/Problem/Zju/">ZOJ</a></li>
                        <li><a href="/Problem/Hdu/">HDU</a></li>
                        <li><a href="/Problem/CF/">CF</a></li>
                        <li><a href="/Problem/PAT/">PAT</a></li>
                    </ul>
                </li>
                <li class="dropdown onhover-dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">评测状态<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/Status/Local/">Local</a></li>
                        <li><a href="/Status/Pku/">POJ</a></li>
                        <li><a href="/Status/Zju/">ZOJ</a></li>
                        <li><a href="/Status/Hdu/">HDU</a></li>
                        <li><a href="/Status/CF/">CF</a></li>
                        <li><a href="/Status/PAT/">PAT</a></li>
                    </ul>
                </li>
                <li class="dropdown onhover-dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">竞赛<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/Contest/diy/Running/">DIY-contest</a></li>
                        <li><a href="/Contest/std/Running/">STD-contest</a></li>
                    </ul>
                </li>
                <li class="dropdown onhover-dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">关于我们<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/FAQ">F.A.Q</a></li>
                        <li><a href="/LocalSettings/">偏好设置</a></li>
                        <li><a href="/Forum/forum.php" data-no-instant="">论坛</a></li>
                        <li><a href="https://github.com/NJUST-FishTeam/NJUST_OnlineJudge_M6_BugReport/issues">Bug Report</a></li>
                        <li role="presentation" class="divider"></li>
                        <li><a href="/About/OpenJudge/">Openjudge</a></li>
                        <li><a href="/About/Achievement/">Achievement</a></li>
                        <li><a href="http://www.njoj.org/">Fisteam Blog</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/gist/create/" data-no-instant=""><b>+</b> Gist</a>
                </li>
                
                <li class="visible-xs">
                    <a href="/Logout/" data-no-instant="">注销</a>
                </li>
                
            </ul>
        </div>
        <div class="navbar-right  hidden-xs nav navbar-nav">
            
            <li class="dropdown onhover-dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img id="nav_user_avatar" width="36" height="36" src="https://cdn.v2ex.com/gravatar/451e4704ec3d87ae40f4e705ac76a01d?s=40">foolifish07<b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="/Profile/">我的账户</a></li>
                    <li><a href="/Logout/" onclick="return ajax_logout()" data-no-instant="">注销</a></li>
                </ul>
            </li>
            
        </div>
        <form class="navbar-form  hidden-xs" id="nav_search_form" role="form">
            <div style="overflow:hidden">
                <input class="form-control" id="nav_search_area" type="text" placeholder="输入题号直接进入题目">
            </div>
        </form>
    </div>
</div>

	<div class="container" style="margin-top: 80px">
		<div class="row">
			<div class="col-sm-3"> 
					
				<!-- left list -->
				<div class="panel panel-primary">
					
					<div class="panel-heading">
						<h4>Friends list</h4>
					</div>
					<div class="list-group">
            <template v-for="friend in friends" track-by="$index">
              <a class="list-group-item" href="#" 
                v-on:click="sendMessage( friend, $event )"> {{ friend.name }} </a>    
            </template>
				  </div>
				</div>

			</div>		

			<!-- right -->
			<div class="col-sm-8">
				
				<ul class="nav nav-tabs">
          <li role="presentation" class="{{ isMessageActive?'active':'' }}">
            <a href="#" v-on:click="select('messages', $event)">Messages</a></li>
          <li role="presentation" class="{{ isNewActive?'active':'' }}">
            <a href="#" v-on:click="select('new', $event)">
            NEW message</a></li>
        </ul>

        <ul style="margin-top:30px" class="list-group"
          v-if="isMessageActive" keep-alive>
          <template v-for="message in messages">
            <messages 
              :who="message.who"
              :content="message.content"
              :send-time="message.sendTime"
              :is-read="message.isRead"
              ></messages>
          </template>
        </ul>
        <new-message v-if="isNewActive"
          :user.once="sendTo"
           ></new-message>

			</div>		
		</div>
	</div>

</template>

<script>
  import Messages from './Messages.vue'  
  import NewMessage from './NewMessage.vue'

	export default {
		data() {
			return {
        friends: [
          { name:'comzyh1', userid:1 }, 
          { name:'comzyh2', userid:2 },
          { name:'comzyh3', userid:3 },
        ],
        messages: [
          { 
            who:{ name:'Comzyh33', userid:1 },
            content: 'Comzyh is SB',
            sendTime: new Date(), 
            isRead: false,
          },
          { 
            who:{ name:'Comzyh44', userid:1 },
            content: 'Comzyh is SB',
            sendTime: new Date(), 
            isRead: true,
          },
        ],

				currentView: 'messages', // messages | new 
        sendTo: {name:null, userid:null}, // for new message
			}
		},
    computed:{
      isMessageActive: {
        get: function(){
          return this.currentView==='messages';
        }
      },
      isNewActive:{
        get: function(){
          return this.currentView==='new';
        }
      }
    },
    methods: {
      select: function(v, event){
        this.currentView = v;
      },
      sendMessage: function(who, event){
        this.sendTo.name = who.name;
        this.sendTo.userid = who.userid;
        this.currentView = 'new';
      }
    },
    events: {
      'reply': function(who){
        this.sendTo.name = who.name;
        this.sendTo.userid = who.userid;
        this.currentView = 'new';
      }  
    },
    components: {
      Messages, NewMessage,
    },
	}
</script>