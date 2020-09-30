import { api, LightningElement, track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class WalleteditOverride extends NavigationMixin(LightningElement) {
    @api recordId

    @track walletId;
    
     handleSuccess(event)
    {
        this.walletId = event.detail.id;
        console.log(this.walletId);
        alert("Wallet Updated Successfully");
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
        console.log(event.detail.fields);
 
    }

}