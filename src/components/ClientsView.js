import React from 'react';
import { styles, flexAlign, bgColor, txtColor } from '../constants/Styles'
import { proAppsFull, electroBg } from '../constants/Images'
import { Parallax } from 'react-parallax'
import Colors from '../constants/Colors';

const ClientsView = () => <div>
    <div className="App-header" style={{...flexAlign('center', 'center'), ...bgColor('darkAnthracite')}}>
        <div style={{paddingTop: '10vmin'}}>
            
            <img className="App-logo" src={proAppsFull} alt="proapps logo" />
                
            <h2 className="titleText textShadow" style={{...txtColor('proAppsOrange'), position: 'relative', top: -40}}>Développeur web, mobile, bureau, blockchain</h2>
        </div>
        <p className="centered" style={txtColor('white')}># site en construction</p>
        
    </div>

    <Parallax bgClassName="App-electro" bgImage={electroBg} style={{...styles.flexCenter, opacity: 1}} strength={250}>
        
            <div style={{height: '30vh', color: Colors.white}} />
        
    </Parallax>
    
    <div style={{height: '100vh', ...bgColor('white')}}>

        

    </div>
</div>

export default ClientsView;