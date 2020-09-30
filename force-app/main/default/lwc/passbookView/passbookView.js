import { api, LightningElement, wire } from 'lwc';
import getPassbooks from '@salesforce/apex/Passbook.getAllPassbook';
import sendMail from '@salesforce/apex/Passbook.sendEmail';


export default class PassbookView extends LightningElement {

    @api passbooklist;

    @wire(getPassbooks)
    wiredContacts({ error, data }) {
        if (data) {
            this.passbooklist = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.passbooklist = undefined;
        }
        console.log(this.passbooklist);
    }


    handleEmail(event)
    {
        console.log('hi')
        let tar = JSON.parse(JSON.stringify(event.target.value)) 
        console.log(tar)
        sendMail({name:tar.Name,amount:tar.amount__c,UserId:tar.User_Paypal__c,dt:tar.Datetime__c}).then(
            (result) => {
                console.log(result)
                alert('Email Sent')
            }
        ).catch(
            error => {
                console.log(error)
                alert('Email failed to Send')
            }
        )

    }
}