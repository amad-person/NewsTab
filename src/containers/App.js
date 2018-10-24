import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import {Grommet, Box, Heading, Paragraph, Anchor, Image} from 'grommet';
import { grommet } from 'grommet/themes';
import Newspaper from '../components/Newspaper';

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
            let img = null;
            if (headline.urlToImage !== null) {
                img = (
                    <Box alignSelf="center">
                        <Image style={{ width: "100%", height: "auto" }} fit="cover" src={ headline.urlToImage }/>
                    </Box>
                );
            }

            return (
                <Box animation={{
                    type: "fadeIn",
                    delay: 0,
                    duration: 1000,
                    size: "xsmall"
                }}
                     border="bottom"
                     pad="small"
                     direction="column"
                     margin="xsmall"
                     flex="shrink"
                     responsive
                >
                    { img }
                    <Heading level={3}>{ headline.title }</Heading>
                    <Paragraph alignSelf="center" size="small">{ headline.content }</Paragraph>
                    <Anchor href={ headline.url }>Source</Anchor>
                </Box>
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