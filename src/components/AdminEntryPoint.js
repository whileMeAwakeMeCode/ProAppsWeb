import React from 'react';
import Utils from '../constants/Utils';
import { bgColor, flexAlign } from '../constants/Styles'
import Web3 from 'web3'
// import { Progress } from 'semantic-ui-react';
import { Stepper, Step, StepLabel} from '@material-ui/core'

const steps = [ "Enable web3", "retrieve nonce", "sign nonce", "connected"]

export default class AdminAccess extends React.Component {
   
    defaultState = {
        message: {
            text: undefined,
            severity: undefined
        },
        isOwner: false,                     // know if web3 1st enabled address is the owner
        nonce: undefined,                   // unique nonce key that client must sign in order to connect
        nonceSignature: undefined,          // signature of the received nonce key
        web3Enabled: [],                    // public eth addresses that have been enabled by injected web3 
        browserHandlesWeb3: false,          // browser-compatibility with web3
        connecting: false,                  // indicate if user is currently trying to connect
        nonceRetrieved: false,              // address / nonceKey retrieval
        nonceSigned: false,                 // indicates if nonce key has been signed
        connected: false                    // indicate if client is fully connected
    }

    state = this.defaultState;

    mountDefault = () => {
        const {connecting, nonceRetrieved, nonceSigned, connected} = this.defaultState;

        return this.setState({
            connecting, 
            nonceRetrieved,
            nonceSigned, 
            connected
        })
    }

    OWNER_ADDRESS = "0x21fAC178E0b0df2Db51A06d52B32DE4479a8b3F1";

    initWeb3 = async() => {
    
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);  
            try {
                // Request account access if needed
                const web3Enabled = await window.ethereum.enable();
                // Acccounts now exposed
                this.setState({browserHandlesWeb3: true, web3Enabled, isOwner: web3Enabled && web3Enabled.length && web3Enabled[0] && web3Enabled[0].toLowerCase() === this.OWNER_ADDRESS.toLowerCase()});
            } catch (error) {
                // User denied account access... 
                console.error(error)
            }
        }
        
        // Legacy dapp browsers...
        else if (window.web3) {
    
            window.web3 = new Web3(window.web3.currentProvider); 
            // Acccounts always exposed
            this.setState({browserHandlesWeb3: true, web3Enabled: window.web3.coinbase});   // TODO : check if coinbase is received here

        }
        
        // Non-dapp browsers...
        else {
            console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }

        return true;
    }

    async componentDidMount() {
        await this.initWeb3();

    }

    adminAccess = async() => {
        try {
            // make sure web3 is enabled and a coinbase is known
            await this.initWeb3();

            this.setState({connecting: true});

            const {web3Enabled} = this.state;
            if (web3Enabled && web3Enabled.length) {
                // request nonce for first enabled address 
                const {error, response} = await Utils.fetchApi({
                    request: "require_nonce",
                    method: "POST",
                    body: {
                        coinbase: web3Enabled[0]
                    }
                })

                if (error) {
                    throw(error);
                } else {
                    const {nonce} = response;

                    this.setState({nonceRetrieved: (typeof nonce === 'string') && nonce.length && nonce})
                    // sign nonce
                    window.web3.eth.personal.sign(nonce, this.OWNER_ADDRESS.toLowerCase(), async(error, signature) => {
                        if (error) {
                            console.log(`ERROR\nsignatureReceiver Error :\n ${error}`)
                            alert("il y a eu une erreur lors de la signature de la transaction.")
                            this.mountDefault()
                        } 
                        else {
                            this.setState({nonceSigned: true, nonceSignature: signature})
                            // transmit to backend for login
                            const {error:loginErr, response: connected} = await Utils.fetchApi({
                                request: "web3_login",
                                method: 'POST',
                                body: {
                                    coinbase: web3Enabled[0],
                                    signature
                                }
                            })

                            if (loginErr) throw(loginErr)
                            else {
                                this.setState({connected, connecting: false});

                          

                                typeof this.props.onSuccess === 'function' 
                                && this.props.onSuccess();
                            }
                        }
                    
                    });
                
                }
            }
            else throw(new Error('Missing public ethereum address, please connect to an ethereum provider'));

        } catch(e) {
            console.log( `Admin Access Error :\n ${e}`)
            alert("il y a eu une erreur lors de la connexion")
            this.mountDefault()
        }
    }

    connectProgress = () => {
        const {nonceRetrieved, nonceSigned, connected} = this.state;
        return(
            connected
            ? 100
            : (
                nonceSigned
                ? 75
                : (
                    nonceRetrieved
                    ? 50
                    : 25
                )
            )
        )
    }


    activeStep = () => {
        const {nonceRetrieved, nonceSigned, connected} = this.state;
        return(
            connected
            ? 4
            : (
                nonceSigned
                ? 3
                : (
                    nonceRetrieved
                    ? 2
                    : 1
                )
            )
        )
    }

    render() { 
        const {
            connecting,
            connected,
            isOwner,
            message
        } = this.state;

        return (
            isOwner
            ? <div style={{...bgColor('darkAnthracite'), ...flexAlign("center", "flex-start"), padding: 10}}>
                {
                    connected
                    ? null
                    : <button 
                        onClick={this.adminAccess} 
                    >
                        <b>Login</b>
                    </button>
                }
                
                {
                    connecting
                    ? <Stepper alternativeLabel activeStep={this.activeStep()}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    : null
                }

       
                
            </div>
            : null
        )
    }
}