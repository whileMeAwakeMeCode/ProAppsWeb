import React, { useState } from 'react';
import { styles, flexAlign, bgColor, txtColor } from '../constants/Styles'
import { proAppsFull, electroBg } from '../constants/Images'
import { Parallax } from 'react-parallax'
import Slide from 'react-reveal/Slide'

import Colors from '../constants/Colors';
import { Icon, Card, Reveal, Image, Button, Modal } from 'semantic-ui-react';

const topics = [
    {
        title: "Application web",
        icon: "laptop",
        subtitle: "outils professionnels",
        imageSrc: "https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/5-ways-seo-web-design-go-together-5e2945dd5df37.png",
        description: `Vous allez gagner du temps !
        Conçevons les outils web dont votre activité a besoin.
        Un intranet d'entreprise ? un système d'organisation ? 
        On peut vous faire ça !`
    },
    {
        title: "Application mobile",
        icon: "mobile alternate",
        subtitle: "privée, ios & android",
        imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvCRL3L00-yvWcDm7GfGWFBrFswxj9_QdoVA&usqp=CAU",
        description: `Mettez toute votre entreprise dans votre poche et partagez vos outils personnalisés avec vos collaborateurs via l'AppStore Apple et le PlayStore Google`
    },
    {
        title: "Site vitrine",
        icon: "sitemap", 
        subtitle: "web & responsive mobile",
        imageSrc: "https://www.poush.be/wp-content/uploads/2019/02/blog-responsive-design.jpg",
        description: `Un produit, un service ou un évènement à présenter et/ou à mettre en avant ? Vos visiteurs vont faire du lèche-vitrine, on va faire briller les étagères !`
    },
    {
        title: "Base de données",
        icon: "database",        
        subtitle: "cryptage & stockage",
        imageSrc: "https://www.masterdc.com/images/photos/dedicated-and-managed-server-differences.jpg",
        description: `Il parait que les datas valent de l'or, autant les mettre à l'abris ! Nous proposons des solutions de stockage sécurisé à court, moyen et long terme`
    },
    {
        title: "Blockchain",
        icon: "ethereum",
        subtitle: "smart-contracts, applications décentralisées",
        imageSrc: "https://www.everteam.com/wp-content/uploads/2019/02/600shutterstock_1061262521.jpg",
        description: `La dernière grosse révolution en matière d'internet est bel est bien la blockchain. Fini les serveurs, tokénisation et décentralisation sont les mots d'ordre ici.`
    },
]



 
const ClientsView = () => {

    const [topicView, setTopicView] = useState(-1)
    const [focusedOn, setFocusedOn] = useState(-1)

    const resetTopicView = () => setTopicView(-1);

 

    const TopicCard2 = ({title, icon, subtitle, imageSrc, description, index, focused}) => <div onMouseEnter={() => setFocusedOn(index)} onMouseLeave={() => setFocusedOn(-1)} className="column balooAll" style={{padding: '2vw'}}>
        <Card
            className="boxShadow"
            image={<Reveal animated='move up' className="flexCenter" style={{minHeight: '20vh'}}>
                <Reveal.Content visible style={{width: '100%'}}>
                    <Image 
                        style={{height: '20vh', width: '100%', resizeMode: 'cover', borderRadius: 5}} 
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
                    topics.map((topic, topicIndex) => <TopicCard2
                        {...topic}
                        index={topicIndex}
                        focused={focusedOn === topicIndex}
                    />)
                }

            </div>
        </Slide>
        <Modal
            open={topicView > 0}
            header={topicView > 0 && topics[topicView].title}
            content={<div style={{padding: 20}}><h4>Le site est en construction,</h4> Il n'y a pas plus d'informations ici pour le moment, vous pouvez toujours nous contacter :<br /><ul><li>Par téléphone au 07 66 40 32 95</li><li>Par email à <a href="mailto:contact@proapps.fr">contact@proapps.fr</a></li></ul></div>}
            actions={[{ key: 'done', content: 'Compris', icon: {name: 'thumbs up'}, color: "orange", inverted: true, onClick: resetTopicView}]}
        />
    </div>
}

export default ClientsView;