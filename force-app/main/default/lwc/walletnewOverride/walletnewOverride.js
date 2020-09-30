import { LightningElement, track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class WalletnewOverride extends NavigationMixin(LightningElement) {

    @track walletId;
    
     handleSuccess(event)
    {
        this.walletId = event.detail.id;
        console.log(this.walletId);
        alert("Wallet Created Successfully");
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.walletId,
                objectApiName: 'wallet__c', // objectApiName is optional
                actionName: 'view'
            }
        });
    }

    handleError(event) {
        console.log("handleError event");
        const errorTarget = JSON.parse(JSON.stringify(event.detail));
        console.log(errorTarget)
        alert(errorTarget.detail)
    }

    handleSubmit(event) {
        console.log(hi);
        // event.preventDefault(); // stop the form from submitting
        // const fields = event.detail.fields;
        // console.log(JSON.stringify(fields));

        // fields.title = 'VP of Opearations';
        // fields.MobilePhone = '2123123123213';
        // fields.LeadSource = 'Web';
        // this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
}