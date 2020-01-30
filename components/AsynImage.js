import React, {useState} from 'react';
import {Image, ActivityIndicator} from 'react-native';
import {Content, Container} from 'native-base';

export const AsyncImage = (props) => {
    const [loaded, setLoaded] = useState(false);

    const {
        placeholderColor,
        style,
        source
    } = props;

    const _onLoad = () => {
        // This only exists so the transition can be seen
        // if loaded too quickly.
        setTimeout(() => {
            setLoaded(() => ({ loaded: true }))
        }, 1000)
    };

    return (
        <Container
            style={style}>

            <Image
                square
                source={source}
                resizeMode={'contain'}
                style={[
                    style,
                    {
                        position: 'absolute',
                        resizeMode: 'contain'
                    }
                ]}
                onLoad={_onLoad} />

            {!loaded &&
            <Content
                style={[
                    style,
                    {
                        backgroundColor: placeholderColor || '#90a4ae',
                        position: 'absolute',
                    }
                ]} >
                <ActivityIndicator
                    size="large"
                    color="green"
                    style={{marginTop: 140}}
                />
            </Content>
            }

        </Container>
    );

};
