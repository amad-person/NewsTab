import React from 'react';
import PropTypes from 'prop-types';

const Newspaper = (props) => {
    const columnWrapper = {};
    const result = [];

    for (let i = 0; i < props.columns; i++) {
        columnWrapper[`column${i}`] = [];
    }

    for (let j = 0; j < props.children.length; j++) {
        const columnIndex = j % props.columns;
        columnWrapper[`column${columnIndex}`].push(
            <div style={{ marginBottom: `${props.gap}px`, display: 'flex', justifyContent: 'center'}}>
                { props.children[j] }
            </div>
        );
    }

    for (let k = 0; k < props.columns; k++) {
        result.push(
            <div
                style={{
                    marginLeft: `${k > 0 ? props.gap : 0}px`,
                    flex: 1,
                    borderRight: `${k === (props.columns - 1) ? 0 : 1}px solid grey`
                }}
            >
                { columnWrapper[`column${k}`] }
            </div>
        )
    }

    return (
        <div style={{ display: 'flex' }}>
            { result }
        </div>
    )
};

Newspaper.propTypes = {
    columns: PropTypes.number.isRequired,
    gap: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.element)
};

Newspaper.defaultProps = {
    columns: 2,
    gap: 20
};

export default Newspaper;