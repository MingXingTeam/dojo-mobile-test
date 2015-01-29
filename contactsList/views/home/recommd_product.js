define(["dojo/_base/declare", "dojo/dom", "dojox/mobile/ListItem",
	"dojo/json","dojo/store/Memory",
	 "dojo/request","dojox/mobile/EdgeToEdgeStoreList","hexin/protocol","dojo/store/JsonRest"
	 ,"dojo/on","dijit/registry", "dojo/hash","dojo/router"
	 ,"dojox/mobile/parser","dojox/mobile/FixedSplitter","dojo/fx"
	 ,"dojo/_base/array", "contactsList/widgets/RecomdPrdWidget/RecomdPrdWidget"
	 ,"dojox/mobile/SwapView","dojox/mobile/PageIndicator","dojox/mobile/TabBarButton"
	 ,"dojox/mobile/TabBar","dojox/app/widgets/Container","dijit/layout/TabContainer"
	 ],
	function(declare, dom
       , ListItem,config,Memory,
		request,EdgeToEdgeStoreList,protocol,JsonRest,on,registry,hash,router
		,parser,FixedSplitter,fx
		,arrayUtil,RecomdPrdWidget
		){

	return {
		init: function(){
			this.request();
		},
		//获取数据
		request:function(){
			var that = this;
			//恒泰推荐产品
			request.post(HTTP+"/csp-info/rs/product/rank",{
				handleAs:"json",
				query:{
					rType:0
				}
			}).then(
				function(result){

					// Get a reference to our container
					var result = result.result;
					var recomPct_ul = dom.byId("recomPct_ul");

					console.info("recomPct_ul::"+recomPct_ul);

					arrayUtil.forEach(result, function(productItem){
						// Create our widget and place it
						var widget = new RecomdPrdWidget(productItem).placeAt(recomPct_ul);
					});
					// console.info(result);
					// var result = that.wrapdata(result);

					// var sampleStore = new Memory({data:result, idProperty:"rid"});

					// var item = declare(ListItem,{
					// 	target:"product_detail",
					// 	clickable: true,
					// 	postMixInProperties: function(){
					// 		this.inherited(arguments);
					// 		this.transitionOptions = {
					// 			params: {
					// 				"id" : 12
					// 			}
					// 		}
					// 	}
					// });
			  //       var storeList = new EdgeToEdgeStoreList({store:sampleStore,itemRenderer:item}, "recomPct_ul");
			  //       storeList.startup();
			    });
		},
		// //封装数据
		// wrapdata:function(result){
		// 	var arr = [];
		// 	var result = result.result;
		// 	for(var i in result){
		// 		var obj = {};
		// 		obj.id = i; 
		// 		obj.label = result[i].rname+"<br />起点金额："+ result[i].code5+"&nbsp;&nbsp;投资风格："+ result[i].code7+"&nbsp;&nbsp;收益率："+ result[i].code8;
		// 		obj.icon =HTTP+result[i].rimg;
		// 		obj.iconPos = "0,0,80,80";
		// 		obj.style="height:100px;margin:4px;border:none";
		// 		obj.noArrow = true;
		// 		arr.push(obj);
		// 	}
		// 	// console.info(arr);
		// 	return arr;	
		// }
	};
});
