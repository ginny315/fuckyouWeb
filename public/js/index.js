// var LoginAllowLogin= React.createClass({
// 	render:function(){
// 		var len = this.props.data.length-1;
// 		console.log("len="+len);
// 		var name = this.props.data[len].name;
// 		var email = this.props.data[len].email;
// 		return (
// 			<div className="login_allowloagin">
// 				<div className="login_allowlogin_tranigle"></div>
// 				<div className="login_allowlogin_rectangle"></div>
// 				<div className="login_allowlogin_roundleft"></div>
// 				<div className="login_allowlogin_roundright"></div>
// 				<LoginAllowloginShow name={name} email={email}/>
				
// 			</div>
// 		)
// 	}
// });
var flag = 0;

$('window').scroll(function(){
		alert(1);
		console.log($('html').scrollTop());
		// if($('window').scrollTop() <= 50){
		// 	footer.hidden();
		// }else{
		// 	footer.show();
		// }
	});
$('document').ready(function(){
	var footer = $('footer');
	var choose_li = $('.index_choose li');
	var time = setInterval(turn,5000);

	for(var i=0 ; i<4 ;i++){		
		$(choose_li[i]).on('mouseenter',function(){
			turn(this.innerHTML);
			clearInterval(time);
		});
		$(choose_li[i]).on('mouseout',function(){
			time = setInterval(turn,5000);
		});
	}

	$('window').scroll(function(){
		alert(1);
		console.log($('html').scrollTop());
		// if($('window').scrollTop() <= 50){
		// 	footer.hidden();
		// }else{
		// 	footer.show();
		// }
	});

});


function turn(value){
	var p_ul = $('#turnPic ul');
	var choose_ul = $('.index_choose ul');
	var choose_li = $('.index_choose li');

	var	translate = 0;

	if (value == null){
		$(choose_li[flag]).css('height','0px');
		if(flag == 3){
			flag = 0;
			for(var i=0 ; i<4 ;i++){
				$(choose_li[i]).css('height','40px');
			}
		}
		else
			translate = -25*(++flag);
			$(choose_li[flag]).css('height','0px');
	}else{
		flag = parseInt(value)-1;
		translate = -25*(--value);
	}
	p_ul.css({'transition':'transform 1s','transform':'translate3d(' + translate+'%,0,0)'})

	

}

