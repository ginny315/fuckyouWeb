var LoginWriteloginForm = React.createClass({
	handleSubmit:function(e){
		e.preventDefault();
		var name = this.refs.name.value.trim();
		var email = this.refs.email.value.trim();
		var psw = this.refs.psw.value.trim();
		var pswconfirm = this.refs.pswconfirm.value.trim();
		if(psw != pswconfirm){
			alert("error password!");
		}
		this.props.onLoginFormSubmit({name:name,email:email,psw:psw});
		this.refs.name.value = '';
		this.refs.email.value = '';
		this.refs.psw.value = '';
		this.refs.pswconfirm.value = '';
		
	}
	render:function(){
		return (
		<form className="login_writelogin_form" onSubmit={this.handleSubmit}>
			<input type='text' name='yourname' className='login_writelogin_name login_inputstyle' placeholder='your name:' ref='name'/>
			<input type='text' name='youremail' className='login_writelogin_email login_inputstyle' placeholder='your e-mail:' ref='email'/>
			<input type='text' name='yourpsw' className='login_writelogin_psw login_inputstyle' placeholder='your password:' ref='psw'/> 
			<input type='text' name='yourpswconfirm' className='login_writelogin_pswconfirm login_inputstyle' placeholder='your password again:' ref='pswconfirm'/>
			<button type='submit'className='login_writelogin_submit'>Touch!</button>
		</form>
		)
	}
});

var LoginAllowloginShow = React.createClass({
	render:function(){
		var name = this.props.data.name;
		var email = this.props.data.email;
		return (
			<div className="login_allowlogin_show">通行证
				<div className="login_allowlogin_showname login_allowlogin_showword">昵称：{name}</div>
				<div className="login_allowlogin_showemail login_allowlogin_showword">约么：{email}</div>
				<div className="login_allowlogin_photo">
					<img src="img/head.jpeg" />
				</div>
			</div>
		)
	}
})

var LoginAllowLogin= React.createClass({
	render:function(){
		return (
			<div className="login_allowloagin">
				<div className="login_allowlogin_tranigle"></div>
				<div className="login_allowlogin_rectangle"></div>
				<div className="login_allowlogin_roundleft"></div>
				<div className="login_allowlogin_roundright"></div>
				<LoginAllowloginShow />
			</div>
		)
	}
});

var LoginSorrow = React.createClass({
	render:function(){
		return (
			<div className="login_sorrow">
				<img src="img/iconfont-zhuanwan.png" />
			</div>
		);
	}
});

var LoginContainer = React.createClass({
	loadCommentsFromServer: function() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this);
	    });
	  },
	handleLoginFormSubmit:function(forminfo){
		var form = forminfo;
		this.setState = form;
		 $.ajax({
		      url: this.props.url,
		      dataType: 'json',
		      type: 'POST',
		      data: form,
		      success: function(data) {
		        this.setState({data: data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    });
	},
	getInitialState: function() {
    	return {data: []};
  	},
  	componentDidMount: function() {
    	this.loadFormFromServer();
    	//setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  	},
	render:function(){
		return (
			<div>
			<LoginAllowLogin data={this.state.data}/>
			<LoginSorrow/>
			<div className='login_writelogin'>
				<LoginWriteloginForm onLoginFormSubmit={this.handleLoginFormSubmit}/>
			</div>
			</div>
		);
	}
});

ReactDOM.render(
	<LoginContainer url='/api/login'/>,
	document.getElementById('container')
)