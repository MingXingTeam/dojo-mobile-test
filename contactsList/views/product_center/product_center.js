define([
	  "dojox/mobile/parser",
        "dojox/mobile",
        "dojox/mobile/compat", // For non-webkit browsers (FF, IE)
        "dojo/ready",
        "dijit/registry",
        "dojo/store/Memory",
        "dojox/mobile/ScrollableView",
        "dojox/mobile/EdgeToEdgeStoreList",
        "dojox/mobile/FilteredListMixin",
        "dojo/request",
        "dojo/_base/declare",
        "dojox/mobile/ListItem",
         "dojo/ready"
	 ],
	function(parser, mobile, compat, ready, registry,
                Memory, ScrollableView, EdgeToEdgeStoreList, FilteredListMixin,request,declare,
                ListItem,ready){



		return {
			init: function(){
				this.request();
			},
			//获取数据
			request:function(){
				var that = this;
				//恒泰推荐产品
				request.post("http://219.148.162.144:9091/csp-info/rs/product/getFundCompList",{
					handleAs:"json",
				}).then(
					function(result){
						// console.info(result);
						// var result = that.wrapdata(result);

						var sampleStore = new Memory({data:result.result, idProperty:"label"});

						ready(function(){
			                var view = registry.byId("scrollableView");
			                var listWidget =
			                        new declare([EdgeToEdgeStoreList, FilteredListMixin])(
			                                {filterBoxRef: 'filterBox', placeHolder: 'Search', store: sampleStore,
			                                itemMap:{"comp":"label"}
			                                
			                            });
			                listWidget.placeAt(view.containerNode);
			                console.info("listWidget:"+listWidget.toString());
			                // Retrieve the instances of SearchBox and ScrollableView created by the mixin:
			                var filterBox = listWidget.getFilterBox();
			                var scrollableView = listWidget.getScrollableView();
			                // "contains" instead of the default "starts with" matching
			                filterBox.set("queryExpr", "*${0}*");
			                var scrollableView = listWidget.getScrollableView();
			                // Enable both horizontal and vertical scrolling
			                // scrollableView.set("scrollDir", "vh");
			                // var itemlist = listWidget.getChildren();
			                // for(var i in itemlist){
			                // 	console.info(itemlist[i]);
			                // 	itemlist[i].clickable = true;
			                // 	itemlist[i].target="product_detail";
			                // }

			                listWidget.startup();
				        });
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
				  //      var storeList = new EdgeToEdgeStoreList({store:sampleStore,itemRenderer:item,filterBoxRef: 'filterBox', placeHolder: 'Search'}, "jjProduct_ul");
				  //      storeList.startup();
				    });
			},
			//封装数据
			wrapdata:function(result){
				var arr = [];
				var result = result.result;
				// for(var i in result){
				// 	var obj = {};
				// 	obj.id = new Date().valueOf()+i; 
				// 	obj.label = result[i].comp;
				// 	obj.noArrow = true;
				// 	arr.push(obj);
				// }
				// console.info(arr);
				return arr;	
			}
		};
});