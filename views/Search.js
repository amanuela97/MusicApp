import React, {useState} from "react";
import {Container,Header, Item, Input, Icon, Button, Text,Content} from 'native-base';
import FormTextInput from "../components/FormTextInput";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import List from "../components/List";


const Search = (props) => {
    const [input,setInput] = useState('');

    const handleSearchChange  = (text)=>{
        console.log('handle search change', text);
        setInput(text);
    };

    const getSearch = async ()=> {

    };

    return (
        <Container style={{paddingTop: '6%'}}>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        autoCapitalize='none'
                        value={input}
                        placeholder="Search"
                        onChangeText={handleSearchChange}
                        onSubmitEditing={( async () => {
                            await getSearch();
                        })}
                        multiline={false}
                    />
                    <Icon name="musical-note" />
                </Item>
                <Button transparent onPress='' title=''>
                    <Text>Search</Text>
                </Button>
            </Header>
            <Content>

            </Content>
        </Container>
    );
};

export default Search;