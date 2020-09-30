public with sharing class Passbook {
    public Passbook() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Passbook__c> getAllPassbook(){
       return [select Name,amount__c,datetime__c,user_paypal__c,user_paypal__r.name from passbook__c];
    }

    @AuraEnabled
    public static string sendEmail(String name,decimal amount,Id UserId,Datetime dt){
        System.debug(name + amount+UserId+dt);

        User__c u = [select email__c,name from user__c where id=:UserId][0];

        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new String[] { u.email__c};
        message.subject = 'Passbook Transaction from Paypal';
        message.plainTextBody = 'Hello '+u.name+',\nYou have a transaction on '+dt+' from Vendor - '+name+' of amount '+amount;
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);

        return 'success';
        
    }
}
