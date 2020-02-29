import React from 'react';
import {Container, Content, Text, Icon, Button} from 'native-base';
import {ImageBackground} from "react-native";

const Launch = (props) => {

    return(
        <Container>
            <ImageBackground
                    style={{flex: 1, resizeMode: 'cover', alignItems: 'center'}}
                    source={require('../assets/background.png')}
                >
                <Content>
                    <Icon name='musical-note' style={{marginTop: 80, fontSize: 50 ,color: 'white', textAlign: 'center'}}/>
                    <Text style={{color: 'white' , letterSpacing: 20, fontSize: 35, textAlign: 'center'}}>MUSSY</Text>
                    <Text style={{color: 'white' , marginTop: 140, textAlign: 'center' ,fontSize: 20}}>Share your tunes with the world.</Text>
                    <Text style={{color: 'white' , textAlign: 'center' ,fontSize: 20}}>Find what you love.</Text>
                    <Button dark full title='' style={{marginTop: 180}} onPress={()=>{
                        props.navigation.navigate('Mussy');
                    }}>
                        <Text>Get Started</Text>
                    </Button>
                </Content>
            </ImageBackground>
        </Container>
    )
};

export default Launch;