define(["dojo/query","dojo/request","dojo/_base/array","dojo/dom","dojo/on"],
	function(query,request,arrayUtil,dom,on){
	//所有的产品
	var allProducts=null;
	//当前产品ID
	var rprid = null;
	return {
		init:function(){
			this.addEventListener();
		}
		,beforeActivate: function(previousView, data){
			// console.info("home视图："+previousView);
			// if(data && data.productName){
			// 	// alert(data.test);
			// 	this.dap_heading.set("label",data.productName);
			// }
			// if(data && data.Avatar){
			// 	query(".Avatar")[0].src=data.Avatar;
			// }
			var that = this;
			if(data&&data.rprid){
				rprid = data.rprid;
			}
			request.post(HTTP+"csp-info/rs/product/gettgproduct",{
				handleAs:"json"
			}).then(function(response){
				allProducts = response.result;
				arrayUtil.forEach(allProducts,function(item){
					// console.info(item.rid);
					// console.info("rprid:"+rprid);
					if(item.rid==rprid){
						that.dap_heading.set("label",item.rtzzhmc);

						var productType=null;
						switch(item.rzhlx){
							case "21":productType = "稳健型";break;
							case "11":productType = "激进型";break;
							case "12":productType = "保守型";break;
						}

						dom.byId("Avatar").src = HTTP+item.rimg;
						dom.byId("description").src = HTTP+item.rpath;
						dom.byId("productName").innerText = item.rtzzhmc;
						dom.byId("PM").innerText = item.rjl;
						dom.byId("productType").innerText = productType;
						dom.byId("price").innerText = item.rcpdj;
					}
				});
			});
		}
		,addEventListener:function(){
			on(dom.byId("buyBtn"),"click",function(){
				dom.byId("loginMask").style.display="block";
				dom.byId("loginContainerWrap").style.display="block";
			});

			on(dom.byId("cancel"),"click",function(){
				dom.byId("loginMask").style.display="none";
				dom.byId("loginContainerWrap").style.display="none";
			});

			on(dom.byId("acct"),"keyup",function(){
				// if(this.)
				if(this.value!=""){
					dom.byId("emptyAccount").style.display="block";
				}
			});

			on(dom.byId("pwd"),"keyup",function(){
				if(this.value!=""){
					dom.byId("emptyPassword").style.display="block";
				}
			});

			on(dom.byId("emptyAccount"),"click",function(){
				dom.byId("acct").value="";
				this.style.display="none";
			});

			on(dom.byId("emptyPassword"),"click",function(){
				dom.byId("pwd").value="";
				this.style.display="none";
			});
			
		}
	}
});
