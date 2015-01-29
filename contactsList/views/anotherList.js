define(["dojo/_base/declare", "dojo/dom", "dojox/mobile/ListItem",
	"dojo/json", "dojo/text!contactsList/resources/data/list.json","dojo/store/Memory",
	 "dojo/request","dojox/mobile/EdgeToEdgeStoreList","hexin/protocol","dojo/store/JsonRest","dojo/on","dijit/registry"],
	function(declare, dom, ListItem,json,config,Memory,request,EdgeToEdgeStoreList,protocol,JsonRest,on,registry){

	return {
		init: function(){
			// alert(this.params.id);
			request.post("resources/data/anotherlist.json",{
				handleAs:"json"
			}).then(
				function(res){
					var sampleStore = new Memory({data:res, idProperty:"displayName"});
			        var storeList = new EdgeToEdgeStoreList({store:sampleStore,title:"hello"}, "item222");
			        storeList.startup();

			        on(dom.byId("item222"),"click",function(e){
			        	dom.byId("selectionMade").innerHTML = e.target.innerHTML + ": was selected.";
			        })
				},
				function(error){

				}
			);
		}
	};
});
