import React from 'react';
import { styles, flexAlign, bgColor, txtColor, flex } from '../constants/Styles'
import { proAppsFull, electroBg } from '../constants/Images'
import { Parallax } from 'react-parallax'
import Colors from '../constants/Colors';

const ClientsView = () => <div>
    <div style={{...flexAlign('flex-start', 'center'), ...bgColor('darkAnthracite')}}>
        <img className="small-app-logo" src={proAppsFull} alt="proapps logo" />
    </div>

    
    <div style={{height: '100vh', ...bgColor('white')}}>

        <h1>INTRANET</h1>

    </div>
</div>

export default ClientsView;