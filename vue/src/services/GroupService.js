import axios from 'axios';
import store from '../store/index';


export default {

    getGroupByGroupId(id) {
        this.state = store.state;
        return axios.get(`groups/${id}`)
    },

    createGroup(group) {
        this.state = store.state;
        return axios.post(`groups/`, group)
    },

    createShoppingListInGroup(shoppingList, groupId) {
        this.state = store.state;
        return axios.post(`groups/list/${groupId}`, shoppingList)
    },

    viewAllGroupsByUsername(username) {
        this.state = store.state;
        return axios.get(`groups/?username=${username}`)
    },


    viewMyInvitations(accountId) {
        this.state = store.state;
        return axios.get(`groups/invitation/${accountId}`)
    },


    viewSentInvitations(accountId) {
        this.state = store.state;
        return axios.get(`groups/sentInvitation/${accountId}`)
    },

    inviteUserToGroup(invite) {
        this.state = store.state;
        return axios.post(`groups/invitation/`, invite)
    },

    addUserToGroup(groupId, invite) {
        this.state = store.state;
        return axios.post(`groups/${groupId}`, invite)
    },

    updateInviteStatus(invite) {
        this.state = store.state;
        return axios.put(`groups/invitation/`, invite)
    },

    deleteUserFromGroup(accountId, groupId) {
        this.state = store.state;
        return axios.delete(`groups/leave/?accountId=${accountId}&groupId=${groupId}`)
    },

    findAllUsers(username) {
        this.state = store.state;
        return axios.get(`groups/users/${username}`)
    },

    getUserIdByUsername(username) {
        this.state = store.state;
        return axios.get(`groups/getId/${username}`)
    },
    rejectInvite(inviteId) {
        this.state = store.state;
        return axios.delete(`groups/reject/${inviteId}`)
    },

    getUsernameByUserId(userId) {
        this.state = store.state;
        return axios.get(`groups/getUsername/${userId}`)
    }
    
}