import React from 'react';

export default class DownloadableImage extends React.Component {

    state = {
        loaded: false,
        error: false
    }

    reachImage = async() => {
        const { url } = this.props;
        const { loaded, error } = this.state;

        // try only once
        if (url && !loaded && !error) {
            
            try {
                let pic = await fetch(url);
                const blob = await pic.blob();
                const source = URL.createObjectURL(blob);
                this.setState({source, loaded: true, error: false})
            }
            catch(e) {
                console.log(`DownloadableImage Error for provided url ${url}:`, e);
                this.setState({error: true})
            }
        }
    }

    async componentDidMount() {
        this.reachImage()
    }

    async componentDidUpdate() {
        this.reachImage()
    }

    render() {
        const {source} = this.state;
        return(
            source
            ? <a href={source} download>
                <img src={source} />
            </a>
            : null
        )
    }

}