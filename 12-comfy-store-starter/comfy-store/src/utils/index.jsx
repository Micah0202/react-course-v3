//renamed it to jsx as we  are returning some things 
import axios from 'axios';

//below is the base url 
const productionUrl = 'https://strapi-store-server.onrender.com/api';

//creating  a custom  axios instance 
export const customFetch = axios.create({
    baseURL : productionUrl , 
});


//to  format the price 
export const formatPrice  =(price )=>{
    const dollarsAmount =  new Intl.NumberFormat('en-US',{
        style:'currency' ,
        currency: 'USD'

    }).format((price/100).toFixed(2)) ;
    return dollarsAmount ;
}


//function to generate dynamic amount options 
export const generateAmountOptions =(number)=>{
 return Array.from({length:number},(_,index)=>{
    const amount = index + 1 ;

    return  <option key={amount} value={amount}>{amount}</option>
 })
}
