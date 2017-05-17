public class ProductSearchCtrl {
	
    @AuraEnabled
    public static List<Product__c> searchProducts(String productName)
    {
        String prodName = '%'+productName+'%';
        List<Product__c> products = [SELECT Id,
                                         Name,
                                         Price__c,
                                         Blurb__c
                                  FROM Product__c
                                  WHERE Name LIKE :prodName];
        return products;
    }
}