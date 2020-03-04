import React, {useState} from 'react';
import PropTypes from 'prop-types';


export const MediaContext = React.createContext([{}, () => {}]);

const mediaArray = [];

export const MediaProvider = (props) => {
    const [media, setMedia] = useState(mediaArray);
    const [myMedia, setMyMedia] = useState(mediaArray);
    const [Comment, setComment] = useState(mediaArray);

    return (
        <MediaContext.Provider value={{media, setMedia,myMedia, setMyMedia, Comment, setComment}}>
            {props.children}
        </MediaContext.Provider>
    );
};


MediaProvider.propTypes = {
    children: PropTypes.node,
};
