import { api, LightningElement,wire } from 'lwc';
import getBills from '@salesforce/apex/GetBillData.getAllBills'
import  updateBill  from '@salesforce/apex/GetBillData.updateBillObject';




export default class BillsList extends LightningElement {

    @api billlist;

    @wire(getBills)
    wiredContacts({ error, data }) {
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
                if(result=='success')
                alert('Bill update successfull')
                location.reload()

            } 
        ).catch(
            error => {
                console.log(error)
                alert('unsuccessful')
            }
        )
        
    }
}