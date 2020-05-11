import React from 'react';
import Utils from '../constants/Utils';
import Modal from '@material-ui/core/Modal';
import { Dialog } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Login from "./Login";

export default class AdminAccess extends React.Component {
    adminSortedKeyCodes = "65, 68, 73, 77, 78"  // "admin" chars

    defaultTimer = {
        started: false,
        entries: []
    }

    timer = this.defaultTimer

    state = {
        connected: false
    }

    isAdminRequest = async() => {        
        const sorted = await Utils.sorting(this.timer.entries)
        return(sorted.join(', ') === this.adminSortedKeyCodes)
    }

    handleKeyDown = (event) => {
        this.timer.entries.push(event.keyCode)
        if(!this.timer.started) {
            this.timer.started = true;
            setTimeout(async() => {
                // check if "admin" and connect if so ()
                const openAdminLoginModal = await this.isAdminRequest()

                if (openAdminLoginModal) {
                    this.destroyKeyDownEvent()
                    this.setState({openAdminLoginModal})
                }
                this.timer = this.defaultTimer
            }, 2000)
        }
    }

    destroyKeyDownEvent = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    // componentWillMount deprecated in React 16.3
    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);

        // auto destroy keydown event in 10 scd
        setTimeout(() => {
            this.destroyKeyDownEvent()
        }, 10000)
        console.log("Il n'y a vraiment que les techniciens ou les développeurs qui mettent le nez ici ;) Help yourself, take a seat, relax !")
    }

    componentWillUnmount() {
        this.destroyKeyDownEvent()
    }

    /**
     * @param {object} credentials : {email;string, hash;string}
     * @return {boolean} Promise resolving to a boolean *no rejection*
     */
    connect = async(credentials) => new Promise(async(resolve) => {

        try {
            const connection = await Utils.fetchApi({
                method: "POST",
                request: "LOGIN",
                body: credentials
            },
            {
                returnStatus: true
            })

            console.log('connection', connection)

            this.setState({openAdminLoginModal: !connection.error, connected: connection.status === 200});


            connection.error && console.error("LOGIN ERROR", connection.error);

            resolve(!connection.error)

        } catch(e) {
            console.log('LOGIN CATCH ERROR', e)
            resolve(false)
        }
    })

    render() { 
        const { openAdminLoginModal, connected } = this.state;

        return <div>

            <Login 
                open={openAdminLoginModal}
                onConnect={this.connect}  
                connected={connected}  
            />
                
        </div>
    }
}