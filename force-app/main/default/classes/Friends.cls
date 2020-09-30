public with sharing class Friends {
    public Friends() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Pals__c> getFriends(Id record){
        Id userId = [select User_Paypal__c from wallet__c where id=:record][0].User_Paypal__c;
        
        List<Pals__c> pals = [select Name,Friend_Lookup__r.name,type__c,user_paypal__r.name from Pals__c where User_Paypal__c=:userId];

        return pals;
    }

    @AuraEnabled
    public static string sendMoney(decimal money,Id user_paypal,Id friend_paypal){

        wallet__c uwall = [select balance__c from wallet__c where user_paypal__c=:user_paypal][0];
        wallet__c fwall = [select balance__c from wallet__c where user_paypal__c=:friend_paypal][0];

        if(money > uwall.balance__c)
        {
            return 'low';
        }
        try{
            uwall.balance__c = uwall.balance__c - money;
            fwall.balance__c = fwall.balance__c + money;
            update new List<wallet__c>{uwall,fwall};
            return 'success';
        }
        catch(Exception e)
        {
            return 'exception';
        }
        
        
        
        
    }


}
