import React from 'react';
import Utils from '../constants/Utils';
import Modal from '@material-ui/core/Modal';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default class AdminAccess extends React.Component {
    adminSortedKeyCodes = "65, 68, 73, 77, 78"  // "admin" chars

    defaultTimer = {
        started: false,
        entries: []
    }

    timer = this.defaultTimer

    state = {}

    isAdminRequest = async() => {        
        const sorted = await Utils.sorting(this.timer.entries)
        return(sorted.join(', ') === this.adminSortedKeyCodes)
    }

    handleKeyDown = (event) => {
        this.timer.entries.push(event.keyCode)
        if(!this.timer.started) {
            console.log('setting timer to true')
            this.timer.started = true;
            setTimeout(async() => {
                // check if "admin" and connect if so ()
                const openAdminLoginModal = await this.isAdminRequest()
                console.log('openAdminLoginModal', openAdminLoginModal)

                if (openAdminLoginModal) {
                    this.destroyKeyDownEvent()
                    console.log('* admin required login *')
                    this.setState({openAdminLoginModal})
                }
                this.timer = this.defaultTimer
            }, 2000)
        }
        console.log(' ---> handleKeyDown -> event.keyCode', event.keyCode)
    }

    destroyKeyDownEvent = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    // componentWillMount deprecated in React 16.3
    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        this.destroyKeyDownEvent()
    }

    render() { 
        return <div>
            <Modal open={this.state.openAdminLoginModal}>
                <div>
                    <input placeholder="email" />
                    <input placeholder="password" type="password" />
                    <CheckCircleOutlineIcon />
                </div>
            </Modal>
        </div>
    }
}