import React from 'react';

import autobind from 'autobind-decorator';

import UsersStore from './../stores/UsersStore';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: UsersStore.getUser()
        };
        UsersStore.addChangeListener(this.onUsersStoreChange);
    }

    @autobind
    onUsersStoreChange() {
        this.setState({ user: UsersStore.getUser() });
    }

    render() {
        if(this.state.user) {
            return (<div>
                <h1>Welcome, {this.state.user.username}</h1>
            </div>);
        }
        else {
            return (<div>
                <h1>Welcome to Opengram's index page</h1>
                <h2> It was made as an hobby of its creator to learn some web development skills</h2>
            </div>);
        }
    }
}