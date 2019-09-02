import React, { Component } from 'react'
import { View, ScrollView, FlatList, TouchableOpacity, TextInput, Image } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Textarea } from 'native-base';
import { Fab, Card, CardItem } from 'native-base'
import axios from 'axios'
import { FAB } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            spinner: false
        }
    }

    componentDidMount() {
        this.getNote()
    }

    getasc(){
        this.setState({
            spinner: true
        })
        axios.get('https://noteapp-abdi.herokuapp.com/note/asc')
            .then((result) => {
                console.warn("result", result.data.result)
                this.setState({
                    data: result.data.result,
                    spinner: false
                })
            })
    }

    getNote() {
        this.setState({
            spinner: true
        })
        axios.get('https://noteapp-abdi.herokuapp.com/note/all')
            .then((result) => {
                console.warn("result", result.data.result)
                this.setState({
                    data: result.data.result,
                    spinner: false
                })
            })
    }

    renderRow = ({ item }) => {
        console.warn("item", item)
        return (
            <View
                style={{
                    marginHorizontal: 10,
                }}

            >
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('EditNote', item) }}
                >
                    <Card
                        style={{ height: 130, width: 140, backgroundColor: item.color, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                        <CardItem cardBody style={{ flexDirection: 'column', backgroundColor: 'transparant' }}>
                            <Text style={{ color: 'white', textAlign: 'right' }}>{this.formatDate(item.updated_at)}</Text>
                            <Text style={{ color: 'white' }}>{item.name_note}</Text>
                            <Text style={{ color: 'white' }}>{item.description}</Text>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>

        )
    }

    formatDate(date) {
        let data = Date.parse(date);
        let newDate = new Date(data);
        let day = newDate.getDate();
        let months = ['Jan', 'Feb', 'Mar', 'Aprl', 'Mei', 'Juni', 'Juli', 'Agust', 'Sept', 'Okt', 'Nov', 'Des'];
        let month = months[newDate.getMonth()];
        let year = newDate.getFullYear();
        return `${day} ${month}`
    }

    render() {
        return (
            <View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
                {/* <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 20 }}>
                        <Image style={{width:40, height: 40, borderRadius: 50}} source={{uri : 'https://res.cloudinary.com/abdi-library-storage/image/upload/v1567409295/DSC_0148-01_nxtfi0.jpg'}} />
                    </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: 'black', textAlign: 'center' }}>NOTE APP</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => this.newNote()}>
                            <Ionicons name="md-funner" size={30} />
                        </TouchableOpacity >
                    </Right>
                </Header> */}
                <TextInput
                    style={{
                        marginHorizontal: 20,
                        borderRadius: 20,
                        marginVertical: 20,
                        borderWidth: 0.4,
                        borderColor: '#888',
                        paddingLeft: 20,
                        height: 45
                    }}
                    placeholder="Search..." />

                <FlatList
                    style={{ marginLeft: 20, height: '100%' }}
                    data={this.state.data}
                    renderItem={this.renderRow}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
                <FAB
                    small
                    color='#00ADB5'
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        icon: 'add',
                        top: '60%',
                        backgroundColor: '#bbb',
                        color: 'black'
                    }}
                    onPress={() => this.getasc()}
                />
                <FAB
                    small
                    color='#00ADB5'
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        icon: 'add',
                        top: '70%',
                        backgroundColor: '#bbb',
                        color: 'black'
                    }}
                    onPress={() => this.props.navigation.navigate('AddNote')}
                />
                   

            </View>
        )
    }
}