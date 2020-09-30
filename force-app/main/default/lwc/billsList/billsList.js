import { api, LightningElement,wire } from 'lwc';
import getBills from '@salesforce/apex/GetBillData.getAllBills'
import  updateBill  from '@salesforce/apex/GetBillData.updateBillObject';
import { NavigationMixin } from 'lightning/navigation';




export default class BillsList extends NavigationMixin(LightningElement) {

    @api billlist;

    @wire(getBills)
    wiredBills({ error, data }) {
        if (data) {
            this.billlist = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.billlist = undefined;
        }
        console.log(this.billlist);
    }

    handlePay(event)
    {
        console.log(event.target.value)
        const billid = event.target.value
        console.log( billid)
        // const up = { fields }
        updateBill({recordId:billid}).then(
            result =>{
                if(result[0]=='success')
                {
                    alert('Bill paid successfull')
                    location.reload();
                }
                else if(result[1]!='id'){
                    alert('Wallet Balance is lower than the bill amount, Recharge wallet')
                    this[NavigationMixin.Navigate]({
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: result[1],
                            objectApiName: 'wallet__c', // objectApiName is optional
                            actionName: 'edit'
                        }
                    });
                }
                else if(result[2]!='error'){
                    alert('Update Failed');
                    Location.reload();
                }
            } 
        ).catch(
            error => {
                console.log(error)
                alert('unsuccessful')
            }
        )
        
    }
}