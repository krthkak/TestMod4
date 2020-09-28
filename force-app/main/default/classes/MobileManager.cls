public with sharing class MobileManager {
    public MobileManager() {

    }

    @AuraEnabled
    public static List<Mobile__c> getAllMobile(){
        List<Mobile__c> mo = [Select Name,Brand__c,Price__c,Mobile_Id__c from Mobile__c];
        return mo;
    }
}