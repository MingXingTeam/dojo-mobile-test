define([
	"dojo/on","dojo/dom"
	,"dojox/mobile/TransitionEvent"
	,"dojox/mobile/View","dojox/mobile/GridLayout","dojox/mobile/Pane"
	 ],
	function(on,dom,TransitionEvent){
		//无法用on??
	return {
		init:function(){
			this.addEventListener();
		},
		addEventListener:function(){
			on(dom.byId("TGPrd"),"click",function(e){
				var transOpts = {
					target: "tg_product",
					url: "#tg_product"
					// ,data:{
					// 	rprid:rprid
					// }
				};
		    	new TransitionEvent(e.target,transOpts,e).dispatch();
			});
		}
	}
});