import React, { Component } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Textarea } from 'native-base';
import { View, TextInput, Picker, TouchableOpacity } from 'react-native'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            idNote: props.navigation.getParam('id_note'),
            idCat: props.navigation.getParam('id_category'),
            nameCat: [],
            nameNote: props.navigation.getParam('name_note'),
            description: props.navigation.getParam('description')
        }
    }

    newNote() {
        console.warn("idcat", this.state.idCat)
        console.warn("nameNote", this.state.nameNote)
        console.warn("descrip", this.state.description)
        let idNote = this.state.idNote
        
        let field = {
            idCat: this.state.idCat,
            nameNote: this.state.nameNote,
            description: this.state.description
        }
        axios.patch(`https://noteapp-abdi.herokuapp.com/note/${idNote}`, field)
            .then((result) => {
                alert('Berhasil iUpdate')
            })
            .catch((error) => {
                alert("input error")
            })
    }
    render() {
        console.warn("idcat props return", this.state.idCat)
        console.warn("idcat return", this.state.idNote)
        const { goBack } = this.props.navigation;
        return (
            <View>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <TouchableOpacity  onPress={() => goBack()}>
                            <Ionicons name="ios-arrow-round-back" color="black" size={30} style={{marginLeft: 20 }} />
                        </TouchableOpacity >
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', textAlign: 'center' }}>EDIT NOTE</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => this.newNote()}>
                            <Ionicons name="ios-checkmark-circle-outline" color="green" size={30} />
                        </TouchableOpacity >
                    </Right>
                </Header>
                <TextInput style={{
                    marginHorizontal: 20,
                    marginTop: 20,
                    fontSize: 20,
                    fontWeight: '500',
                    lineHeight: 27
                }}
                    placeholder='ADD TITLE...'
                    value={this.state.nameNote}
                    onChangeText={nameNote => this.setState({ nameNote })} />
                <Textarea style={{
                    marginHorizontal: 20,
                    fontSize: 20,
                    marginTop: 10,
                    height:300,
                    fontWeight: '400',
                    lineHeight: 27
                }} placeholder='ADD DESCRIPTION...'
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })} />
                <View >
                    <Text style={{
                        marginHorizontal: 20,
                        fontSize: 20,
                        fontWeight: '500', marginTop: 10
                    }}>Category</Text>

                    <Picker
                        selectedValue={this.state.idCat}
                        style={{ height: 50, width: 300, marginHorizontal: 20 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ idCat: itemValue })
                        }>

                        <Picker.Item label="Simple 1" value="1" />
                        <Picker.Item label="SImple 2" value="2" />
                        <Picker.Item label="Simple 3" value="3" />
                        <Picker.Item label="SImple 4" value="4" />

                    </Picker>

                </View>
            </View>
        )
    }
}