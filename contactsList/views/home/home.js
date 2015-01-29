define(["dojo/_base/declare", "dojo/dom", "dojox/mobile/ListItem",
	"dojo/json","dojo/store/Memory",
	 "dojo/request","dojox/mobile/EdgeToEdgeStoreList","hexin/protocol","dojo/store/JsonRest"
	 ,"dojo/on","dijit/registry", "dojo/hash","dojo/router"
	 ,"dojox/mobile/parser","dojox/mobile/FixedSplitter","dojo/fx"
	 ,"dojo/_base/array", "contactsList/widgets/RecomdPrdWidget/RecomdPrdWidget"
	 ,"dojo/query","dojo/router","dojo/window","dojo/_base/lang"
	 ,"dojox/mobile/TransitionEvent"
	 ,"dojo/on"
	 ,"dojox/mobile/SwapView","dojox/mobile/PageIndicator","dojox/mobile/TabBarButton"
	 ,"dojox/mobile/TabBar","dojox/app/widgets/Container","dojox/widget/AutoRotator"
	 ,"dojox/widget/rotator/Controller"
	 ],
	function(declare, dom
       , ListItem,JSON,Memory,
		request,EdgeToEdgeStoreList,protocol,JsonRest,on,registry,hash,router
		,parser,FixedSplitter,fx
		,arrayUtil,RecomdPrdWidget
		,query,router,window,lang
		,TransitionEvent
		){
		var currIndex = 0;
		//滚动更新
		hh=function(e){
			if(e=="play"){
				query(".navdot").forEach(function(item,idx){
					if(idx==currIndex){
						item.setAttribute("class","navdot selected");
					}else{
						item.setAttribute("class","navdot");
					}
				});
				currIndex++;
				if(currIndex>3) currIndex=0;
			}
		}
	return {
		init: function(){
			//启动路由控制
			// router.startup();
			this.request();
			this.addEventListener();
			this.autoswap();
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

						// console.info("recomPct_ul::"+recomPct_ul);
						// console.debug(result[1]);
						arrayUtil.forEach(result, function(productItem){
							// Create our widget and place it
							var widget = new RecomdPrdWidget(productItem).placeAt(recomPct_ul);
						});
						// console.info(query(".authorWidget"));
						query(".authorWidget").forEach(function(node){
							// console.debug(node);
						    on(node,"click",function(e){
						    	// var productName = query(".authorWidgetName",this)[0].innerText;
						    // 	var Avatar = query(".authorWidgetAvatar",this)[0].src;
						  		// var PM = query(".authorWidgetPM",this)[0].value;
						  		var rprid = query(".authorWidgetRid",this)[0].value;
						    	// var productName = query(".authorWidgetName",this)[0].innerText;
						    	var transOpts = {
						    		title: "Configuration",
									target: "product_detail",
									url: "#product_detail",
									data:{
										// productName:productName
										// ,Avatar:Avatar
										// ,PM:PM
										rprid:rprid
										}
								};
						    	new TransitionEvent(e.target,transOpts,e).dispatch();
						    });
						});						
						// console.info(result);
					// 	var result = that.wrapdata(result);

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

			  //       var storeList = new EdgeToEdgeStoreList({store:sampleStore,itemRenderer:item
			  //       	// ,itemMap:{"rname":"label","rimg":"icon"}
			        	
			  //       }, "recomPct_ul");
			  //       storeList.startup();
			        dom.byId("recomdPct").style.display="block";
			    });
			//幻灯片图片
			request.post(HTTP+"infows-us/rs/users/ad",{
				handleAs:"json"
			}).then(
			function(result){
				var result = result.result;
				for(var i in result){
					console.info("幻灯片图片路径："+HTTP+result[i].IMAGEPATH);
					dom.byId("slide_img"+i).src=HTTP+result[i].IMAGEPATH;
				}
		    });
		},
		//注册事件
		addEventListener:function(){
			var that = this;
			//home选项卡
			this.dap_tab_viewpoint.on('click',function(){
				dom.byId("recomdPct").style.display="none";
				dom.byId("sellrank").style.display="none";
				dom.byId("viewpoint").style.display="block";
			});
			this.dap_tab_sellrank.on('click',function(){
				dom.byId("recomdPct").style.display="none";
				dom.byId("sellrank").style.display="block";
				dom.byId("viewpoint").style.display="none";
			});
			this.dap_tab_recomd_product.on('click',function(){
				dom.byId("recomdPct").style.display="block";
				dom.byId("sellrank").style.display="none";
				dom.byId("viewpoint").style.display="none";
			});
			//幻灯片的dot点击方法
			query(".navdot").forEach(function(item,index){
				on(item,"click",function(){
					currIndex = index;
					dojo.publish('myAutoRotator/rotator/control', ['go', index]);
					query(".navdot").forEach(function(item,idx){
						if(idx==index){
							item.setAttribute("class","navdot selected");
						}else{
							item.setAttribute("class","navdot");
						}
					});
					
				});
			});
		},
		//封装数据
		wrapdata:function(result){
			var arr = [];
			var result = result.result;
			for(var i in result){
				var obj = {};
				obj.id = i; 
				obj.label = result[i].rname+"<br />起点金额："+ result[i].code5+"&nbsp;&nbsp;投资风格："+ result[i].code7+"&nbsp;&nbsp;收益率："+ result[i].code8;
				obj.icon = HTTP+result[i].rimg;
				obj.iconPos = "0,0,70,93";
				obj.style="height:114px;padding:10px;";
				obj.noArrow = true;
				arr.push(obj);
			}
			// console.info(arr);
			return arr;	
		},
		//幻灯片自动放
		autoswap:function(){
			// var that = this;

			// var timer = setTimeout(function(){
			// 	query(".swapimg").forEach(function(item,idx){
			// 		if(item.style.display != "none"){
			// 			var next = idx>=3?0:(idx+1);
			// 			that["dap_wrap_img"+idx].performTransition("swap_img"+next,1,"slide");
			// 			clearTimer()
			// 			// return;
			// 			// console.info("dap_wrap_img"+idx+"----------"+"swap_img"+next);
			// 		}
			// 	})
			// },4000);

		}
	};
});