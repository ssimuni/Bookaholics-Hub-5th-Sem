import { myAxios } from "./helper";
import FormData from 'form-data';

export const signUp=(user)=>{
    return myAxios.post('/api/user/register',user)
    .then((response)=>response)
}
export const signIn=(loginDetail)=>{
    return myAxios.post('/api/user/login',loginDetail)
    .then((response)=>response)
}
export const addSellPost=(formData)=>{
    console.log(formData.get('authorname'));
    console.log(formData.get('title'));
    console.log(formData.get('price'));
    return myAxios.post('/api/user/addsell',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    .then((response)=>response.data)
}

export const addBorrowPost=(formData)=>{
    console.log(formData.get('authorname'));
    console.log(formData.get('title'));
    console.log(formData.get('price'));
    console.log(formData.get('pickupPoint'));
    return myAxios.post('/api/user/addborrow',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    .then((response)=>response.data)
}

export const addExchangePost=(formData)=>{
    console.log(formData.get('authorname'));
    console.log(formData.get('title'));
    console.log(formData.get('price'));
    console.log(formData.get('wishedBook'));
    return myAxios.post('/api/user/addexchange',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    .then((response)=>response.data)
}

export const getUser=(userId)=>{
    return myAxios.get(`/api/user/profile/${userId}`)
    .then((response)=>response.data)
}

export const getBuyPosts=()=>{
    return myAxios.get('/api/user/buyposts')
    .then((response)=>response.data)
}

export const getBorrowPosts=()=>{
    return myAxios.get('/api/user/borrowposts')
    .then((response)=>response.data)
}

export const getExchangePosts=()=>{
    return myAxios.get('/api/user/exchangeposts')
    .then((response)=>response.data)
}

export const getABook=(sid)=>{
    return myAxios.get(`/api/user/book-info/${sid}`)
    .then((response)=>response.data)
}

export const orderPlace=(orderDetail)=>{
    return myAxios.post('/api/user/orderplace',orderDetail)
    .then((response)=>response)
}

export const getBorrowBook=(borrId)=>{
    return myAxios.get(`/api/user/borrow-book-info/${borrId}`)
    .then((response)=>response.data)
}

export const borrowPlace=(borrowDetail)=>{
    return myAxios.post('/api/user/borrowplace',borrowDetail)
    .then((response)=>response)
}

export const getExchangeBook=(ebId)=>{
    return myAxios.get(`/api/user/exchange-book-info/${ebId}`)
    .then((response)=>response.data)
}

export const exchangePlace=(exchangeDetail)=>{
    return myAxios.post('/api/user/exchangeplace',exchangeDetail)
    .then((response)=>response)
}

export const getExchangeRequests=(eEmail)=>{
    return myAxios.get(`/api/user/exchange-requests/${eEmail}`)
    .then((response)=>response.data)
}

export const deleteExchangeProcess=(epId)=>{
    return myAxios.delete(`/api/user/delete-exchange-process/${epId}`)
    .then((response)=>response)
}

export const confirmRequest=(epId)=>{
    return myAxios.put(`/api/user/confirm-request/${epId}`)
    .then((response)=>response)
}

export const getBorrowRequests=(eEmail)=>{
    return myAxios.get(`/api/user/borrow-requests/${eEmail}`)
    .then((response)=>response.data)
}

export const deleteBorrowProcess=(bpId)=>{
    return myAxios.delete(`/api/user/delete-borrow-process/${bpId}`)
    .then((response)=>response)
}

export const confirmBorrowRequest=(bpId)=>{
    return myAxios.put(`/api/user/confirm-borrow-request/${bpId}`)
    .then((response)=>response)
}

export const getOrderRequests=(eEmail)=>{
    return myAxios.get(`/api/user/order-requests/${eEmail}`)
    .then((response)=>response.data)
}

export const deleteOrderProcess=(orderId)=>{
    return myAxios.delete(`/api/user/delete-order-process/${orderId}`)
    .then((response)=>response)
}

export const confirmOrderRequest=(orderId)=>{
    return myAxios.put(`/api/user/confirm-order-request/${orderId}`)
    .then((response)=>response)
}

export const getMySellPosts=(eEmail)=>{
    return myAxios.get(`/api/user/get-my-sell-posts/${eEmail}`)
    .then((response)=>response.data);
}

export const editSellPost=(post)=>{
    return myAxios.put(`/api/user/edit-sell`,post)
    .then((response)=>response);
}

export const getMyBorrowPosts=(eEmail)=>{
    return myAxios.get(`/api/user/get-my-borrow-posts/${eEmail}`)
    .then((response)=>response.data);
}

export const editBorrowPost=(post)=>{
    return myAxios.put(`/api/user/edit-borrow`,post)
    .then((response)=>response);
}

export const getMyExchangePosts=(eEmail)=>{
    return myAxios.get(`/api/user/get-my-exchange-posts/${eEmail}`)
    .then((response)=>response.data);
}

export const editExchangePost=(post)=>{
    return myAxios.put(`/api/user/edit-exchange/`,post)
    .then((response)=>response);
}
export const getMyPurchase=(eEmail)=>{
    return myAxios.get(`/api/user/my-purchase/${eEmail}`)
    .then((response)=>response.data);
}

export const getMyBorrow=(eEmail)=>{
    return myAxios.get(`/api/user/my-borrow/${eEmail}`)
    .then((response)=>response.data);
}

export const getMyExchange=(eEmail)=>{
    return myAxios.get(`/api/user/my-exchange/${eEmail}`)
    .then((response)=>response.data);
}

export const getMySellRecords=(eEmail)=>{
    return myAxios.get(`/api/user/my-sell-records/${eEmail}`)
    .then((response)=>response.data);
}

export const getMyLendRecords=(eEmail)=>{
    return myAxios.get(`/api/user/my-lend-records/${eEmail}`)
    .then((response)=>response.data);
}

export const getMyExchangeRecords=(eEmail)=>{
    return myAxios.get(`/api/user/my-exchange-records/${eEmail}`)
    .then((response)=>response.data);
}
export const getAllUser=()=>{
    return myAxios.get(`/api/user/get-all-user`)
    .then((response)=>response.data);
}

export const getTransactionBuySell = () => {
    return myAxios.get('/api/user/transaction-buy-sell')
        .then((response) => response.data)
}

export const getTransactionBorrow = () => {
    return myAxios.get('/api/user/transaction-borrow')
        .then((response) => response.data)
}

export const getTransactionExchange = () => {
    return myAxios.get('/api/user/transaction-exchange')
        .then((response) => response.data)
}

export const getAllBuySellPost = () => {
    return myAxios.get('/api/user/all-buy-sell-post')
        .then((response) => response.data)
}

export const getAllBorrowPost = () => {
    return myAxios.get('/api/user/all-borrow-post')
        .then((response) => response.data)
}
export const getAllExchangePost = () => {
    return myAxios.get('/api/user/all-exchange-post')
        .then((response) => response.data)
}