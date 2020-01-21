import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const mediaURL= "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{uri: mediaURL + navigation.getParam('file', 'default value')}}
            />
            <Text>title: {JSON.stringify(navigation.getParam('title', 'default value'))}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    image: {
        height: '70%',
        width: '80%',
        borderRadius: 2,
    },
});

export default Single;