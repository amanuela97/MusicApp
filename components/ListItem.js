import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const mediaURL= "http://media.mw.metropolia.fi/wbma/uploads/";

const ListItem = (props) => {
    return (
        <TouchableOpacity onPress={()=>{props.navigation.push('Single', {
                file: props.singleMedia.filename,
                title: props.singleMedia.title
            });
        }}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: mediaURL + props.singleMedia.thumbnails.w160}}
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
        backgroundColor: '#999',
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
        borderRadius: 5,
    },
});



ListItem.propTypes = {
    singleMedia: PropTypes.object,
};

export default ListItem;
