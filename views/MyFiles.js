import React from 'react';
import List from '../components/List.js';


const MyFiles = (props)=> {
    const {navigation} = props;
    return (
        <List navigation={navigation} mode='myFiles'/>
    );
};

export default MyFiles;