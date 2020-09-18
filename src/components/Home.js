import React from 'react';
import AdminEntryPoint from './AdminEntryPoint'

import ClientsView from './ClientsView'
import AdminView from './AdminView'
export default class Home extends React.Component {

    state = {
        adminView: false
    }

    toggleAdminView = () => this.setState({adminView: !this.state.adminView});

    render() {
        const {adminView} = this.state;

        return (
            <div>
                <AdminEntryPoint onSuccess={this.toggleAdminView.bind(this)} />
                {
                    adminView
                    ? <AdminView />
                    : <ClientsView />
                }
                

            </div>
        )
    }

}