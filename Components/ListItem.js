import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ListItem = (props) => {
    console.log("list item props", props);
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: props.singleMedia.thumbnails.w160}}
                />
                <View style={styles.details}>
                    <Text style={{fontWeight: "bold"}}>{props.singleMedia.title}</Text>
                    <Text>{props.singleMedia.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        paddingTop: 12 ,
        paddingBottom: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '1%',
    },
    details: {
        width: '50%',
    },
    image: {
        marginRight: '4%',
        marginLeft: '4%',
        height: '100%',
        width: '40%',
        borderRadius: 15,
    },
});



ListItem.propTypes = {
    singleMedia: PropTypes.object,
};

export default ListItem;
