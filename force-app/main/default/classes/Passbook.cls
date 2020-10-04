public with sharing class Passbook {
    public Passbook() {

    }

    @AuraEnabled(cacheable=true)
    public static string getProfile(){
        Profile p = [Select Name from Profile where Id =: userinfo.getProfileid()];
		String pname = p.name;
        return pname;
    }

    @AuraEnabled(cacheable=true)
    public static List<Passbook__c> getAllPassbook(){
       return [select Name,amount__c,datetime__c,user_paypal__c,user_paypal__r.name from passbook__c where Canceled__c = false];
    }

    @AuraEnabled
    public static string sendEmail(String name,decimal amount,Id UserId,Datetime dt){
        System.debug(name + amount+UserId+dt);

        User__c u = [select email__c,name from user__c where id=:UserId][0];

        Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
    	attach.setContentType('application/pdf');
    	attach.setFileName('Transaction.pdf');
    	attach.setInline(false);
    	attach.Body = Blob.toPdf('Hello '+u.name+',<br><br>You have a transaction on '+dt+' from Vendor - '+name+' of amount '+amount);

        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new String[] { u.email__c};
        message.subject = 'Passbook Transaction from Paypal';
        message.plainTextBody = 'Your transaction report is attached below';
        message.setFileAttachments(new Messaging.EmailFileAttachment[] { attach }); 
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);

        return 'success';
        
    }

    @AuraEnabled
    public static string updatePassbook(Id record){
        system.debug( record);
        Passbook__c pb = [select Canceled__c from Passbook__c where id=:record][0];
        pb.Canceled__c = true;

        try{
            update pb;
            return 'success';

        }catch(Exception e)
        {
            return e.getMessage();
        }

    }
}
