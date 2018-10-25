import React from 'react';
import { Box, Heading, Paragraph, Anchor, Image } from 'grommet';

const Article = (props) => {
    let img = null;
    if (props.headline.urlToImage !== null) {
        img = (
            <Box alignSelf="center">
                <Image style={{ width: "100%", height: "auto" }} fit="cover" src={ props.headline.urlToImage }/>
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
            <Heading level={3}>{ props.headline.title }</Heading>
            <Paragraph alignSelf="center" size="small">{ props.headline.content }</Paragraph>
            <Anchor href={ props.headline.url }>Source</Anchor>
        </Box>
    );
};

export default Article;