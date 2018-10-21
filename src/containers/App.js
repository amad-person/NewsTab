import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Card } from 'semantic-ui-react';

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
                apiKey: process.env.REACT_APP_API_KEY
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
                    <Card.Content>
                        <Card.Header>{ headline.title }</Card.Header>
                        <Card.Description>{ headline.content }</Card.Description>
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
