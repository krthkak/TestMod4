public with sharing class GetBillData {
    
    public GetBillData() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Bills__c> getAllBills(){
        return [select Name,category__c,User_Paypal__r.name,pay_before__c,amount__c,successful__c,paid__c from Bills__c where successful__c = false and flaged__c = false];
    }


    @AuraEnabled()
    public static String updateBillObject(String recordId){
        system.debug('inside updateBillObject');
        bills__C bill =  [select successful__c,paid__c from Bills__c where id=:recordId][0];

        bill.successful__c=true;
        bill.paid__c=true;
        try
        {
            update bill;
            return 'success';
        }
        catch(Exception e)
        {
            return e.getMessage();
        }
    }

    
}
