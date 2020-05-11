import React from 'react'
import { Modal, Form, Button, Image } from 'semantic-ui-react'
import {styles} from '../constants/Styles'
import layout from '../constants/Layout'
import {proAppsInitials} from '../constants/Images'
import ListItem from '../components/ListItem'
import AutoProgressBar from './AutoProgressBar'
import Utils from '../constants/Utils';
import { TextField } from '@material-ui/core'

/**
 * @prop {boolean} open : opens login modal if truthy
 * @prop {function} onConnect : callback called when user clicks the connect button ({email, hash}) => boolean
 */
export default class Login extends React.Component {
    state = {
        loginProcessing: false,
        loginError: false,
    }
    
    setEmail = (e) => this.setState({email: e.target.value, loginError: false, loginProcessing: false})
    setHash = (e) => this.setState({pwd: e.target.value, loginError: false, loginProcessing: false})

    login = async() => {
        this.setState({loginProcessing: true})
        const {email, pwd} = this.state

        if (email && pwd) {

            const hash = await Utils.hasher(pwd);

            const connexion = typeof this.props.onConnect === 'function' 
            && await this.props.onConnect({email, hash});

            this.setState({loginProcessing: false, loginError: !connexion})
        } else alert('connexion impossible')

    }

    render() {
        const Layout = layout.getLayout();
        const {loginProcessing, loginError} = this.state
        return(
            <Modal
                open={this.props.open}
                onClose={this.toggleLogger}
                size={Layout.isSmallDevice ? "large" : "small"}
            >
                
                <div style={styles.oneEmPadding}>
                    <ListItem
                        spaceEvenly
                        notAccepted
                        title={<p className="silText">LOGIN</p>}
                        titleStyle={styles.fontSize(30)}
                        subTitle={<p className="gotuText">Identifiants Pro Apps</p>}
                        subTitleStyle={styles.beige15}
                        leftElement={<Image centered src={proAppsInitials} size="small"
                        //style={{height: 300, width: 300}} alt=" " 
                        />}
                        alignAll="center"
                        //alignRight="center"
                        containerStyle={{height: "100%", backgroundColor: 'silver'}}
                        contentStyle={styles.whiteText}
                    />
                    {
                        loginProcessing || loginError
                        ? <AutoProgressBar
                            color={loginError ? 'red' : 'auto'}
                            completed={loginError || this.props.connected}
                            active={true}
                        />
                        : null
                    }
                    <Form style={styles.loginFormWrapper}>
                        <TextField type="email" label="Email" variant="outlined" onChange={this.setEmail} />
                        <TextField type='password' label="Secret" variant="outlined" onChange={this.setHash} />
                            

                        <div className="flexCenter margedTop">
                            <Button onClick={this.login}>       
                                <p className="silText" style={styles.fontSize(Layout.buttonText)}>On est bon</p>
                            </Button>
                        </div>
                        
                    </Form>

                </div>
            </Modal>
        )
    }

}