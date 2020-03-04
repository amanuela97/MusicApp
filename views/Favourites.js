import React from 'react';
import List from '../components/List.js';


const Favourites = (props)=> {
    const {navigation} = props;
    return (
        <List navigation={navigation} mode='myfavourites'/>
    );
};

export default Favourites;