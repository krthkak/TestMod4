import { api, LightningElement, track, wire } from 'lwc';
import getFriendList from '@salesforce/apex/Friends.getFriends';
import moneySend from '@salesforce/apex/Friends.sendMoney';
import { NavigationMixin } from 'lightning/navigation'

export default class ShareMoney extends NavigationMixin(LightningElement) {
    @api recordId;
    @api friendList;

    friend;
    @api showFriendList = false;
    @api showSendMoney = false;

    @api userName;
    @api sendAmount = null;



    @wire(getFriendList,{record:'$recordId'})
    wiredFriends({error,data}){
        if (data) {
            this.friendList = data;
            this.error = undefined;
            this.showFriendList = true;
            this.showSendMoney = false;
        } else if (error) {
            this.error = error;
            this.friendList = undefined;
        }
        console.log(this.friendList);
    }

    handleChoose(event)
    {
        console.log('enter')
        this.friend = JSON.parse(JSON.stringify(event.target.value))
        console.log(this.friend)
        this.userName = this.friend.User_Paypal__r.Name;
        console.log(this.userName)
        this.showFriendList = false;
        this.showSendMoney = true;
    }

    changeCapture(event)
    {
        this.sendAmount = event.target.value;
        console.log(this.sendAmount);
    }

    handleSend(event)
    {
        if(this.sendAmount==null)
        {
            alert('Enter an amount to continue')
        }
        else{
            moneySend({money:this.sendAmount,user_paypal:this.friend.User_Paypal__c,friend_paypal:this.friend.Friend_Lookup__c}).then(
                (result) =>
                {
                    if(result=='low')
                    {
                        alert('Amount should be lesser than the balance.')
                    }
                    else if(result=='success')
                    {
                        alert('Money successfully sent')
                        location.reload()
                        this[NavigationMixin.Navigate]({
                            type: 'standard__recordPage',
                            attributes: {
                                recordId: this.recordId,
                                objectApiName: 'wallet__c', // objectApiName is optional
                                actionName: 'view'
                            }
                        });
                    }
                }
            ).catch(
                (error)=>{
                    alert(error)
                }
            )
        }
    }

}