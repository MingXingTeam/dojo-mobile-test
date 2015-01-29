define(["dojo/query","dojo/request","dojo/_base/array","dojo/dom","dojo/on"
	, "contactsList/widgets/TGPrdWidget/TGPrdWidget"
	,"dojo/_base/window"],
	function(query,request,arrayUtil,dom,on,TGPrdWidget,window){
	//所有的产品
	var allProducts=null;
	//当前产品ID
	var rprid = null;

	var start = 0;
	return {
		init:function(){
			var that = this;
			this.addEventListener();
			var tg_content = dom.byId("tg_content");
			//请求数据
			request.post(HTTP+"csp-info/rs/product/gettgproduct",{
				handleAs:"json"
			}).then(function(response){
				allProducts = response.result;
				// arrayUtil.forEach(allProducts,function(item){
				// 	var widget = new TGPrdWidget(item).placeAt(tg_content);
				// });
				//加载数据
				that.loadData();
			});
		}
		,
		addEventListener:function(){
			var that = this;
			on(dom.byId("loadMore"),"click",function(){
				//加载数据
				that.loadData();
			});

			on(dom.byId("backToTop"),"click",function(){
				window.global.scrollTo(0,0);
			});

			on
		},
		//每次获取最短的ul,将图片放到其后
		getMinUl:function(){
			var tg_content = dom.byId("tg_content");
			var tg_content2 = dom.byId("tg_content2");
			// console.info(tg_content2.offsetHeight);
			if(tg_content.offsetHeight<tg_content2.offsetHeight){
				return tg_content;
			}else{
				return tg_content2;
			}
			// return tg_content;

			// var $minUl = $arrUl.eq(0);
			// $arrUl.each(function(index, elem) {
			// 	if ($(elem).height() < $minUl.height()) {
			// 		$minUl = $(elem);
			// 	}
			// });
			// return $minUl;
		},
		//载入数据
		loadData:function(){
			var data = 0;
			for (var i = start; i <start+ 4; i++) {//每次加载时模拟随机加载图片
				// data = parseInt(Math.random() * 25);
				// var html = "";
				// html = '<li><div><a href="#"><img src = http://www.17sucai.com/preview/104311/2014-03-20/myWater_fall/img/'
				// 	+ data + '.jpg></a></div><div class="water_user pdp4">美女小清新_'
				// 	+ data + '</div><div class="water_option"><a href="" class="option_item option_coll">50</a> <a href="" class="option_item option_comt">66</a</div></li>';
				var content = this.getMinUl(); 	
				new TGPrdWidget(allProducts[i]).placeAt(content);
			}
			start += 4;
		}
	}
});
