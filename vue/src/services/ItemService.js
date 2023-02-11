import axios from 'axios';
import store from '../store/index';


export default {
    addItem(item) {
        this.state = store.state;
        return axios.post(`lists/createItem`, item)
    },

    deleteItem(id) {
        this.state = store.state;
        return axios.delete(`lists/deleteItem?itemId=${id}`)
    },
    modifyItem(id, item) {
        this.state = store.state;
        return axios.put(`lists/items/${id}`, item)
    }
}