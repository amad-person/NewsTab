import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import Newspaper from '../components/Newspaper';
import Article from '../components/Article';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headlines: []
        };
    }

    componentDidMount() {
        axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                language: 'en',
                apiKey: process.env.REACT_APP_API_KEY,
                sources: 'bbc-news,reuters,the-new-york-times'
            }
        }).then((res) => {
            this.setState({
                headlines: res.data.articles.slice(0, 20)
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const items = this.state.headlines.map((headline) => {
            return (
                <Article headline={headline}/>
            );
        });

        return (
            <div className="App">
                <Grommet theme={grommet}>
                    <h1>News Tab</h1>
                    <Newspaper columns={4} gap={5}>
                        { items }
                    </Newspaper>
                </Grommet>
            </div>
        );
    }
}

export default App;