import axios from 'axios';
import store from '../store/index';



export default {

    createShoppingList(shoppingList) {
        this.state = store.state;
        
        return axios.post(`/lists/`, shoppingList);
    },

    viewAllItemsByListId(listId) {
        this.state = store.state;
        
        return axios.get(`/lists/${listId}`);
    },

    viewShoppingListByListId(listId) {
        this.state = store.state;
        
        return axios.get(`/lists/list/${listId}`);
    },

    viewShoppingListsByAccountId() {
        this.state = store.state;
        
        return axios.get(`/lists/account/mylists`);
    },

    viewShoppingListsByGroupId(groupId) {
        this.state = store.state;
        
        return axios.get(`/lists/group?groupId=${groupId}`);
    },

    removeShoppingList(listId) {
        this.state = store.state;
        const id = this.state.user.id;
        
        return axios.delete(`/lists/delete/${listId}?accountId=${id}`);
    },

    clearList(listId) {
        this.state = store.state;
        
        return axios.delete(`/lists/delete?listId=${listId}`);
    },

    claimShoppingList(listId,shoppingList) {
        this.state = store.state;
        
        return axios.put(`/lists/${listId}/claim`,shoppingList);
    }

}