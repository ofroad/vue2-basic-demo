//弹框的html结构
var temp = `<div v-show="closeDialog"><div id="draglog">
		<div class="draglog">
			<slot name="title"><h3>这是一个弹框</h3></slot>
			<slot name="content">
				<div class="content">
					这里是内容
				</div>
			</slot>
			<div>
				<input type="button" value="确认" @click="ok" />
				<input type="button" @click="close" value="取消" />
			</div>
		</div>
	</div>
	<div id="mask"></div></div>`;

var a = Vue.component("test-alert",{
	template:temp,
	data:function (){
		return {
			
		}		
	},
	props:['closeDialog'],
	methods:{
		close(){
			this.$emit("close-method");
		},
		ok(){
			this.$emit("ok");
		}
	}
});

//每一个弹框都要对应一个数据和回调函数

var list = [1,2,3,4]

new Vue({
	el: "#demo",
	data:{
		draglog:"",
		draglog2:"",
		closeDialog:true,
		closeDialog2:true,
		list:list,
		delectedItem:""
	},
	methods:{
		testDialog:function (index){

			this.draglog = a;
			this.closeDialog = true;
			if(typeof index === "number") this.delectedItem = index;
		},
		closeMthods:function (){
			this.closeDialog = false;
		},
		closeMthods2:function (){
			this.closeDialog2 = false;
		},
		testDialog2:function (){
			this.closeDialog2 = true;
			this.draglog2 = a;
		},
		ok(){
			this.closeDialog = false;
			if(this.delectedItem !== "") this.list.splice(this.delectedItem,1);
			this.delectedItem = '';
		}
	}
})