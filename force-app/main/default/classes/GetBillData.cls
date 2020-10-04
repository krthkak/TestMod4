public with sharing class GetBillData {
    
    public GetBillData() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Bills__c> getAllBills(){
        return [select Name,category__c,User_Paypal__r.name,pay_before__c,amount__c,successful__c,paid__c from Bills__c where successful__c = false and flaged__c = false and Canceled__c = false];
    }


    @AuraEnabled()
    public static List<String> updateBillObject(String recordId){
        system.debug('inside updateBillObject');
        List<String> result = new List<String>{'status','id','error'};
        bills__C bill =  [select amount__c,successful__c,paid__c,User_Paypal__c from Bills__c where id=:recordId][0];
        bill.successful__c=true;
        bill.paid__c=true;

        wallet__c u = [select balance__c from wallet__c where User_Paypal__c=:bill.User_Paypal__c][0];

        try
        {
            if(bill.amount__c<=u.balance__c)
                {
                    update bill;
                    u.balance__c = u.balance__c - bill.amount__c;
                    update u;
                    result[0]='success';
                }
                else {
                    result[1]=u.Id;
                }
        }
        catch(Exception e)
        {
            result[2]=e.getMessage();
            
        }
        return result;
        
    }

    
}
