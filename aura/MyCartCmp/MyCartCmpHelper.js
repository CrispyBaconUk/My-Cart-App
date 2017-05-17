({
	addItem :  function(component, event)
	{
		var newItem = event.getParam("item");
		var items = component.get("v.items", items);
		items.push(newItem);
		component.set("v.items", items);

	},
    removeItem : function(component, event)
    {
        var idx = event.target.id;
        var items = component.get("v.items");
        console.log(items);
        var collectionLength = items.length;
        for(var i=0; i<collectionLength; i++)
        {
            if(items[i].Id == idx)
            {
                // remove 1 element from posistion i
                items.splice(i, 1);
                break;
            }
        }
        component.set("v.items", items);
    }
})