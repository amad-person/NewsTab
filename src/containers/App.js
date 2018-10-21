import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Card, Image } from 'semantic-ui-react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headlines: []
        }
    }

    componentDidMount() {
        axios.get('https://newsapi.org/v2/top-headlines',{
            params: {
                language: 'en',
                apiKey: process.env.REACT_APP_API_KEY,
                sources: 'bbc-news,associated-press,reuters,the-new-york-times,cnn'
            }
        }).then((results) => {
            this.setState({
                headlines: results.data.articles.slice(0, 20)
            });
        }).catch((error) => {
            console.log('Error in fetching top headlines', error);
        });
    }

    render() {
        const headlines = this.state.headlines.map((headline) => {
            return (
                <Card centered href={ headline.url }>
                    { headline.urlToImage !== null ? <Image src={ headline.urlToImage }/> : null }
                    <Card.Content>
                        <Card.Header>{ headline.title }</Card.Header>
                        <Card.Description>{ headline.content }</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a href={ headline.url }>Link</a>
                    </Card.Content>
                </Card>
            )
        });

        return (
            <div className="App">
                <h1>News Tab</h1>
                <Card.Group centered itemsPerRow={4}>
                { headlines }
                </Card.Group>
            </div>
        );
    }
}

export default App;
