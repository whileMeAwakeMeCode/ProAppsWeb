import React from 'react';
import { flexAlign, bgColor } from '../constants/Styles'
import { proAppsFull } from '../constants/Images'


const ClientsView = () => <div>
    <div style={{...flexAlign('flex-start', 'center'), ...bgColor('darkAnthracite')}}>
        <img className="small-app-logo" src={proAppsFull} alt="proapps logo" />
    </div>

    
    <div style={{height: '100vh', ...bgColor('white')}}>

        <h1>INTRANET</h1>

    </div>
</div>

export default ClientsView;