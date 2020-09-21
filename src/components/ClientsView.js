import React, { useState } from 'react';
import { styles, flexAlign, bgColor, txtColor } from '../constants/Styles'
import { proAppsFull, electroBg } from '../constants/Images'
import { Parallax } from 'react-parallax'
import Slide from 'react-reveal/Slide'

import Colors from '../constants/Colors';
import { topics } from '../constants/Constants'
import { Icon, Card, Reveal, Image, Button, Modal } from 'semantic-ui-react';

 
const ClientsView = () => {

    const [topicView, setTopicView] = useState(-1)
    const [focusedOn, setFocusedOn] = useState(-1)

    const resetTopicView = () => setTopicView(-1);

    const TopicCard = ({title, icon, subtitle, imageSrc, description, index, focused}) => <div onMouseEnter={() => setFocusedOn(index)} onMouseLeave={() => setFocusedOn(-1)} className="column balooAll" style={{padding: '1.5vw'}}>
        <Card
            className="boxShadow"
            image={<Reveal animated='move up' className="flexCenter" style={{minHeight: '20vh'}}>
                <Reveal.Content visible style={{width: '100%'}}>
                    <Image 
                        style={{height: '20vh', width: '100%', resizeMode: 'cover'}} 
                        //src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' 
                        src={imageSrc}
                    />
                </Reveal.Content>
                <Reveal.Content hidden>
                    <Button basic color={"orange"} onClick={() => setTopicView(index)}><Icon name="plus" />en savoir plus</Button>
                </Reveal.Content>
            </Reveal>}
            header={<div style={focused ? {color: Colors.proAppsOrange} : {}}><Icon name={icon} />{title}</div>}
            meta={subtitle}
            description={description}
            //extra={extra}
        />
    </div>

    return <div>
        <div className="App-header" style={{...flexAlign('center', 'center')}}>
            <div style={{paddingTop: '10vmin'}}>
                
                <img className="App-logo" src={proAppsFull} alt="proapps logo" />
                    
                <h2 className="titleText textShadow baloo" style={{...txtColor('proAppsOrange'), position: 'relative', top: -40}}>Développeur web, mobile, bureau, blockchain</h2>
            </div>
            <p className="centered reenie" style={txtColor('white')}># site en construction</p>
            
        </div>

        <Parallax bgClassName="App-electro" bgImage={electroBg} style={{...styles.flexCenter, opacity: 1}} strength={250}>
            
                <div style={{height: '30vh', color: Colors.white}} />
            
        </Parallax>

        <Slide left>

            <div className="flexCenter" style={{height: '100vh', ...bgColor('white'), flexWrap: "wrap"}}>

                {
                    topics.map((topic, topicIndex) => <TopicCard
                        {...topic}
                        index={topicIndex}
                        focused={focusedOn === topicIndex}
                    />)
                }

            </div>
        </Slide>
        <Modal
            //size="fullscreen"
            //style={{ height: '90vh', width: '90vw' }}
            open={topicView >= 0}
            header={topicView >= 0 && topics[topicView].title}
            content={<div style={{padding: 20}}><h4>Le site est en construction,</h4> Il n'y a pas plus d'informations ici pour le moment, vous pouvez toujours nous contacter :<br /><ul><li>Par téléphone au 07 66 40 32 95</li><li>Par email à <a href="mailto:contact@proapps.fr">contact@proapps.fr</a></li></ul></div>}
            actions={[{ key: 'done', content: 'Compris', icon: {name: 'thumbs up'}, color: "orange", inverted: true, onClick: resetTopicView}]}
        />
    </div>
}

export default ClientsView;