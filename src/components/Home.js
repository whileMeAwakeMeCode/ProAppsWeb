import React from 'react';
import { flexAlign, bgColor, txtColor } from '../constants/Styles'
import { proAppsFull } from '../constants/Images'
export default class Home extends React.Component {
 
    render() {
        return <div className="App-header balooAll" style={{...flexAlign('center', 'center'), ...bgColor('darkAnthracite')}}>
            <div style={{padding: '10vmin', paddingTop: '20vmin'}}>
                <img className="App-logo" src={proAppsFull} alt="proapps logo" />
                <h1 style={{...txtColor('proAppsOrange'), fontSize: 1.1}}>développeur freelance</h1>
                <h2 className="titleText textShadow" style={{...txtColor('proAppsOrange'), position: 'relative', top: -40}}>Développeur web, mobile, bureau, blockchain</h2>
            </div>
            <p className="centered" style={txtColor('lightAnthracite')}># numérisons votre activité</p>
        </div>
    }

}