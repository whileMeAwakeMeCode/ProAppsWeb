import React from 'react';
import AdminAccess from './AdminAccess'
import { styles, flexAlign, bgColor, txtColor, flex } from '../constants/Styles'
import { proAppsFull, whiteBg, electroBg } from '../constants/Images'
import { Parallax, Background } from 'react-parallax'
import Colors from '../constants/Colors';
export default class Home extends React.Component {
 
    render() {
        return (
            <div>
                <AdminAccess />
                <div className="App-header" style={{...flexAlign('center', 'center'), ...bgColor('darkAnthracite')}}>
                    <div style={{paddingTop: '10vmin'}}>
                        
                        <img className="App-logo" src={proAppsFull} alt="proapps logo" />
                            
                        <h1 style={{...txtColor('proAppsOrange'), fontSize: 1.1}}>développeur freelance</h1>
                        <h2 className="titleText textShadow" style={{...txtColor('proAppsOrange'), position: 'relative', top: -40}}>Développeur web, mobile, bureau, blockchain</h2>
                    </div>
                    <p className="centered" style={txtColor('white')}># numérisons votre activité</p>
                    
                </div>

                <Parallax bgClassName="App-electro" bgImage={electroBg} style={{...styles.flexCenter, opacity: 1}} strength={250}>
                    
                       <div style={{height: '30vh', color: Colors.white}} />
                    
                </Parallax>
                
                <div style={{height: '100vh', ...bgColor('white')}}></div>

            </div>
        )
    }

}