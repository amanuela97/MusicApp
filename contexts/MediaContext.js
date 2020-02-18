import React, {useState} from 'react';
import PropTypes from 'prop-types';


export const MediaContext = React.createContext([{}, () => {}]);

const mediaArray = [];

export const MediaProvider = (props) => {
    const [media, setMedia] = useState(mediaArray);
    const [myMedia, setMyMedia] = useState(mediaArray);
    return (
        <MediaContext.Provider value={{media, setMedia,myMedia, setMyMedia}}>
            {props.children}
        </MediaContext.Provider>
    );
};


MediaProvider.propTypes = {
    children: PropTypes.node,
};
