
var list = [
	{
		id:1,
		title:"hello,vuejs",
		isSelected:true
	},
	{
		id:2,
		title:"hello,vuejs2",
		isSelected:false
	}
];
//加载页面自动获取焦点，自定义指令
Vue.directive("focus",{
	inserted:function (el){
		el.focus();
	},
	update:function (el,binding){
		if( binding.value ){
			el.focus();
		}
	}
});

//设置三种情况
var filters = {
	all:function (todos){
		return 	todos	
	},
	active:function (todos){
		return todos.filter(function (item){
			return !item.isSelected;
		})	
	},
	completed:function (todos){
		return todos.filter(function (item){
			return item.isSelected;
		})	
	}
}



var vm = new Vue({
	el:"#demo",
	data:{
		list:list,
		enterValue:"",
		edtorTodo:"",
		visibility:"all"
	},
	watch:{
		list:{
			handler:function (todo){
				//this.list = todo;
			},
			deep:true
		}
	},
	computed:{
		filteredItems:function (){
			return filters[this.visibility](this.list)
		},
		hasSelect:function (){
			return filters.active(this.list).length;	
		},
		allDone:{
			get:function (){
				return this.hasSelect === 0;		
			},
			set:function (value){
				//设置了true或false的值
				this.list.forEach(function (item){
					item.isSelected = value;
				})
			}
		}
	},
	methods:{
		addItemMethod:function (){
			var newTodo = this.enterValue && this.enterValue.trim();

			if( newTodo ){
				this.list.push({
					title:newTodo,
					id:Math.random(),
					isSelected:false
				});

				this.enterValue = '';
			}
		},
		removeItem:function (index){
			this.list.splice(index,1);		
		},
		edtorItem:function (todo){
			//缓存编辑前的值,目的是在按esc键不编辑保留之前的值
			this.beforEdtorValue = todo.title;
			this.edtorTodo = todo;
		},
		doneEdtor:function (todo,index){
			var val = todo.title.trim();
			this.edtorTodo = null;
			if( !val ){
				this.removeItem(index);
			}
		},
		cancelEdtor:function (todo){
			this.edtorTodo = null;
			todo.title = this.beforEdtorValue;	
		},
		removeAllCompleted:function (){
			this.list = filters.active(this.list);	
		}
	}
});

function changeHashFn(){
	var hash = window.location.hash.replace(/#\/?/,"");
	if( filters[hash] ){
		vm.visibility = hash;
	}else{
		window.location.hash = "";
		vm.visibility = "all";
	}
}

changeHashFn();

window.addEventListener("hashchange",changeHashFn)



