var mongoose = require('mongoose');

/*
userSchema  name,email,psd,workid,aliveTime
 */
var userSchema = new mongoose.Schema({
	name:String,
	email:{
		type:String,
		index: {unique: true}
	},
	psd:String,
	workid:Number,//作品id
	aliveTime:Date,//每次登陆时更新
},{
	minimize:false
});

//userSchema.set('autoIndex', true);

userSchema.static('getList',function(cb){
	return this.find().sort({releaseTime:-1}).exec(cb);
});

userSchema.static('delUser',function(userId,cb){
	return this.findByIdAndRemove(userId).exec(cb);
});

userSchema.static('getUser',function(userId,cb){
	return this.findById(userId,function(err,userEntity){
		if(userEntity){

		}
	})
});

userSchema.static('updateUser',function(newUser,cb){

});

var UserModel = mongoose.model('User',userSchema);
module.exports = UserModel;