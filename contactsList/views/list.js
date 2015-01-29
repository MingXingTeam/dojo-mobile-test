define(["dojo/_base/declare", "dojo/dom", "dojox/mobile/ListItem",
	"dojo/json", "dojo/text!contactsList/resources/data/list.json","dojo/store/Memory",
	 "dojo/request","dojox/mobile/EdgeToEdgeStoreList","hexin/protocol","dojo/store/JsonRest","dojo/on","dijit/registry", "dojo/hash","dojo/router"],
	function(declare, dom, ListItem,json,config,Memory,request,EdgeToEdgeStoreList,protocol,JsonRest,on,registry,hash,router){

	return {
		init: function(){
			var that = this;
			// console.info(dom.byId("selectionMade"));
			request.post("http://219.148.162.144:9091/infows-us/rs/users/ws/80400050",{
				handleAs:"json"
			}).then(
				function(res){
					// console.info(res);
					console.info(dom.byId("selectionMade"));
					// 
					var res = that.wrapdata(res);
					// res = json.stringify(res);
					// console.info(res);

					var sampleStore = new Memory({data:res, idProperty:"displayName"});

					var item = declare(ListItem,{
						target:"anotherList",
						clickable: true,
						postMixInProperties: function(){
							this.inherited(arguments);
							this.transitionOptions = {
								params: {
									"id" : 12
								}
							}
						}
					});

			        var storeList = new EdgeToEdgeStoreList({store:sampleStore,title:"hello",itemRenderer:item}, "list");
			        storeList.startup();

			        // on(dom.byId("list"),"click",function(e){
			        // 	// alert();
			        // 	router.go("#anotherList");
			        // 	// this.target = "anotherList";
			        // 	// e.target.transitionTo("anotherList");
			        // 	// dom.byId("selectionMade").innerHTML = e.target.innerHTML + ": was selected.";
			        // })
			        // on(registry.byId("item222"),"click",function(e){
			        // 	dom.byId("selectionMade").innerHTML = e.target.innerHTML + ": was selected.";
			        // })
			  //       dom.byId("item222").on("click", function(e){
					// 	dom.byId("selectionMade").innerHTML = e.target.innerHTML + ": was selected.";
					// });
				},
				function(error){

				}
			);
		},
		wrapdata:function(res){
			var arr = [];
			var obj = {};
			obj.id = 1; 
			obj.label = res.khxm;
			obj.icon = "mblDomButtonDarkBlueCheck";
			arr.push(obj);
			return arr;		
		}
	};
	
		//"dojox/mobile/EdgeToEdgeStoreList", "dojox/mobile/FilteredListMixin"
		// var item = dom.byId('item222');
		// request.post("resources/data/list.json", {
		// 	// Send the username and password
		// 	// data: ,
		// 	// Wait 2 seconds for a response
		// 	timeout: 2000

		// }).then(
		// 	function(response){
		// 		// console.info(response);
		// 		item.innerHTML = response[0].displayName+"";
		// 		// alert(dom.byId('item'));
		// 	},
		// 	function(error){
		// 		// Display the error returned
		// 		item.innerHTML = "<div class=\"error\">" + error + "<div>";
		// 	}
		// );



	// var ContactListItem = declare(ListItem, {
	// 	clickable: true
	// });
	// var store = new Memory({data: json.parse(config)});

// 	var mystore = new JsonRest({
// 		target:"resources/data/list.json"
// 	})

// 	return {
// 		// ContactListItem: ContactListItem,
// 		// filter:function(){
// 		// 	return this.loadedStores.contacts;
// 		// },
// 		store:mystore,
// 		init: function(){
// 			// return this.loadedStores.contacts;
// // 			store = new Memory({data:data});
// 			// console.info(this.loadedStores.contacts);
// 			// var store = this.loadedStores.contacts;

// 			// store.get("resources/data/list.json").then(function(item){
// 			//     console.info(item);
// 			// });
// 			this.contacts.on("click", function(e){
// 				dom.byId("selectionMade").innerHTML = e.target.innerHTML + ": was selected.";
// 			});
// 		}
// 	}
});

// define(["dojo/_base/declare", "dojo/dom", "dojox/mobile/ListItem","dojo/request",
// 	"dojox/mobile/EdgeToEdgeStoreList", "dojox/mobile/FilteredListMixin"],
// 	function(declare, dom, ListItem,request){

	// request("resources/data/list.json", {
 //       		handleAs: "json"
	//     }).then(function(data){
 //           storeData2 = data;
 //    });
	  
// });

// define(["dojo/_base/declare", "dojo/dom", "dojox/mobile/ListItem","dojo/json", "dojo/text!contactsList/resources/data/list.json",
// 	"dojox/mobile/EdgeToEdgeStoreList", "dojox/mobile/FilteredListMixin"],
// 	function(declare, dom, ListItem,json,config){
// 	 storeData2	 = json.parse(config);
// });