import { api, LightningElement, track, wire } from 'lwc';
import getPassbooks from '@salesforce/apex/Passbook.getAllPassbook';
import sendMail from '@salesforce/apex/Passbook.sendEmail';
import getProfile from '@salesforce/apex/Passbook.getProfile';
import updatePassbook from '@salesforce/apex/Passbook.updatePassbook';
import { NavigationMixin } from 'lightning/navigation'



export default class PassbookView extends NavigationMixin(LightningElement) {

    @api passbooklist;

    @track isAdmin = false;

    @wire(getProfile) 
    userWire(result){
    //    this.pname = result.data;
       //console.log('Result of getProf is : '+JSON.stringify(result));
       //console.log('Resilt '+result);
       //console.log('Tryign '+result.data)
        if(result.data == "System Administrator"){
            //alert('Inside if');
            this.isAdmin = true;
        }

    }

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

    handleCancelTransaction(event)
    {
        console.log('enter cancel')
        let currentPassbook = JSON.parse(JSON.stringify(event.target.value))
        console.log(currentPassbook)
        console.log(currentPassbook.Id)
        updatePassbook({record:currentPassbook.Id}).then((result)=> {
            console.log(result)
            alert('Transaction Canceled');
            console.log(result)
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: currentPassbook.Id,
                    objectApiName: 'PassBook__c', // objectApiName is optional
                    actionName: 'view'
                }
            });
            
        })
        .catch(error => {
            console.log(error)
        });
    }
}