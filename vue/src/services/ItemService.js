import axios from 'axios';
import store from '../store/index';

const http = axios.create({
    baseURL: "https://shoppinglistapp-backend.onrender.com"
});

export default {
    addItem(item) {
        this.state = store.state;
        return http.post(`/lists/createItem`, item)
    },

    deleteItem(id) {
        this.state = store.state;
        return http.delete(`/lists/deleteItem?itemId=${id}`)
    },
    modifyItem(id, item) {
        this.state = store.state;
        return http.put(`/lists/items/${id}`, item)
    }
}