({
    // searchProducts Method - invoked from controller
    fetchProducts : function(component)
    {
        // get the searchTermInput element
        var searchTermElement = component.find("searchTermInput");

        // Get our search term input
		var searchTermInput = component.get('v.searchTerm');
        
        // Check if the value is empty
        if($A.util.isEmpty(searchTermInput))
        {
            // Add an error to our searchTermInput element
            searchTermElement.set('v.errors', [{message: "Please enter a value"}]);
        }
        else
        {
            // Blank any errors against the input
			searchTermElement.set('v.errors', null);
            
            // get a reference to our apex method
            var searchProductsAction = component.get('c.searchProducts');
            
            // set the parameters for the method
	        searchProductsAction.setParams({
	        	'productName' : searchTermInput
            });
            
            // create a reference to our helper
            var self = this;
            
            // set callback action
            searchProductsAction.setCallback(self, function(response){
                self.setProducts(component, response);
            });
			
            // queue our action
            $A.enqueueAction(searchProductsAction);
        }
    },
    // process server response
    setProducts : function(component, response)
    {
    	var state = response.getState();
        console.log(state);
        // if we were successful
        if (state === "SUCCESS") 
        {
            // get the result from the server (List<Product__c>)
            var products = response.getReturnValue();
            // set our list of products - this will redraw our UI
        	component.set('v.products', products);
        }
        else
        {
        	// handle errors ;)  
        }
	},

    addItem : function(component, event)
    {
        var idx = event.target.id;
        var items = component.get("v.products");
        var itemToAdd;
        items.forEach(function(item)
        {
            if(item.Id == idx)
            {
                itemToAdd = item;
            }
        })
        var addItemEvent = $A.get("e.c:AddItemToCartEvt");
        addItemEvent.setParams(
        { 
            "item" : itemToAdd
        });
        addItemEvent.fire();
    }
})