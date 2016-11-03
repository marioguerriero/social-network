import AppDispatcher from './../dispatcher/AppDispatcher'
import UsersConstants from '../util/UsersConstants'
import EventEmitter from 'events';

import autobind from 'autobind-decorator';

import cookie from 'react-cookie';

const CHANGE_EVENT = 'change';
const LOGIN_FAILED_EVENT = 'login-failed';
const REGISTER_EVENT = 'register';

function setUser(profile, token) {
    if (!cookie.load('id_token')) {
        cookie.save('profile', JSON.stringify(profile));
        cookie.save('id_token', token);
    }
}

function removeUser() {
    cookie.remove('profile');
    cookie.remove('id_token');
}

class UsersStoreClass extends EventEmitter {
    addListener(eventName, cb) {
        this.on(eventName, cb)
    }

    isAuthenticated() {
        return (cookie.load('id_token'));
    }

    getUser() {
        return cookie.load('profile');
    }

    getAuthToken() {
        return cookie.load('id_token');
    }

    /**
     * Initialize UsersStore handled content (eg user's profile and token)
     */
    @autobind
    init() {
        let profile = this.getUser();
        let token = this.getAuthToken();
        if(profile && token) {
            setUser(profile, token);
            UsersStore.emit(CHANGE_EVENT);
        }
    }
}

const UsersStore = new UsersStoreClass();

UsersStore.dispatch = AppDispatcher.register(action => {
    switch(action.actionType) {
        case UsersConstants.LOGIN_USER:
            setUser(action.profile, action.token);
            UsersStore.emit(CHANGE_EVENT);
            break;

        case UsersConstants.LOGOUT_USER:
            removeUser();
            UsersStore.emit(CHANGE_EVENT);
            break;

        case UsersConstants.REGISTER_USER:
            UsersStore.emit(REGISTER_EVENT);
            break;

        case UsersConstants.LOGIN_FAILED:
            UsersStore.emit(LOGIN_FAILED_EVENT, action.errorMessage);
            break;

        default:
    }
});

export default UsersStore;