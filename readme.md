##目前遇到的问题与解决方式
###提交表单get与post
在ajax中设置提交方式为post，结果一直执行get，排查后发现后端没问题，问题出在前端，可能情况没有阻止表单默认行为。直接通过表单提交method在react渲染中被屏蔽关键字，解决方式：通过onSubmit方法添加FormData对象，用键值对模拟一个完整的表单，用原生ajax发送。发送二进制文件需要在form中添加enctype="multipart/form-data"


###react传递数据方式
开始时依然采用查找DOM节点，可能会遇到DOM未渲染时状态改变，不能很好的通信，还是采取属性传递，传递后在节点中改变

###react节点生命周期
用formData获取表单，直接传入表单名字的方式，发现内容并没有添加，应该是获取的虚拟DOM中没有内容，只能通过手动添加表单提交内容。
server端采用multer插件上传，可以通过console.dir(req.files)来查看请求

###mongodb启动
先杀死其他线程后重启，自带_id，直接用还是自己设定自增的ID？


###mongodb筛选用户
如果按照执行顺序，则先查找，设置标志符号，根据标志符号判断是否需要新建。但是回调是否会影响执行顺序？还是在回调中查询？查询error与查询不到的关系？理解错误，非err情况可能为空，通过查看数组长度来检查是否有数据。设置数据库唯一字段unique，即使查找错误也不会影响数据库插入重复数据


###res回复
如果多个回调用到res，同时返回吗？还是等待队列？启用同步锁保持同步返回，数据库操作不需要返回，只有需要向客户端返回数据才写response

###require自己的包有个坑
如果文件和require进去的文件在同一目录，使用"./"不能完成索引，将文件移出目录解决这个问题。

###501
501 mail from address must be same as authorization user，邮件from要和user名字相同

###调用发送邮件模块之后res无法响应
使用自己写的模块之后如何next()?代码错误，只是当事件执行，是res.sent和res.redirect的问题

###如何在服务器未打开的时候返回500？
打开时返回的是浏览器的默认打不开

###怎么判断定向的404
server.js里面最后使用404中间件，url输入未找到时触发，可是之前的html也没发出特殊的请求，这是怎么判断的呢？由express服务器搜寻，没找到是定向404，不能自己在页面中写。

###Date.prototype.Format写在哪里？
可以写在当前文件中，作为方法调用。

###结束一个任务，如何开始下一个任务?
“Can’t set headers after they are sent.” => “不能发送headers因为已经发送过一次了” => 在处理HTTP请求时，服务器会先输出响应头，然后再输出主体内容，而一旦输出过一次响应头（比如执行过 res.writeHead() 或 res.write() 或 res.end()），你再尝试通过 res.setHeader() 或 res.writeHead() 来设置响应头时（有些方法比如 res.redirect() 会调用 res.writeHead()），就会报这个错误。
（说明：express中的 res.header() 相当于 res.writeHead() ，res.send() 相当于 res.write() ）
原因就是你程序有问题，重复作出响应，具体原因很多，需要自己根据以上的原则来排除。

###返回对象数组在前端处理不太好
在后台拼合数据，然后前端只要判断取数就行

###通过fs转存图片发生错误

###回调函数的时差

###数据库查询只返回一个对象
只用对象属性提取不到，要用对象数组第一个元素

###神奇的req.session过期

###react新节点渲染默认找到第一个id
怎样识别当前节点的id, 让getElementById的位置节点display:none,还是会渲染,className = {show ?  '' :'disnone'}这个写法是错误的,改写id状态改变也会默认添加到第一个上面

###用户删除后服务器文件夹里的文件？
怎样删除？

###react报错
当数据来自于搜索结果或者新的组件被添加到数据流里，在这种情况下，每个子节点需要保持唯一的标识。可以给每个子节点添加key属性。

###返回数据后重新刷新
用了原生js的reload，应该不好，最好用react的方式，暂时没做

###React遇到很多DOM需要懒加载吗
不需要

###将log和pic组件分开弊端
不能在登录之后马上显示，最好建立通信，log组件能通知其他所有组件已经登录

###组件加style?
react组件添加的是数据，样式怎么改？
var divStyle = {  
    color: 'white',  
    WebkitTransition: 'all'  
}   
React.renderComponent(<div style={divStyle}>Hello</div>)  