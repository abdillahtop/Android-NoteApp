import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import axios from 'axios'

class ComponentDrawer extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getCategory()
    }

    getCategory() {
        axios.get('https://noteapp-abdi.herokuapp.com/category/all')
            .then((result) => {
                console.warn("result", result.data.result)
                this.setState({
                    data: result.data.result
                })
            })
    }

    renderRow = ({ item }) => {
        return (
            <View
                style={{
                    marginHorizontal: 13,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => { this.props.navigation.navigate('Detail', { bookid: item }) }}>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.icon }} />
                    <Text>{item.name_category}</Text>
                </TouchableOpacity>

            </View>

        )
    }


    render() {

        return (
            <SafeAreaView style={{
                flex: 1, backgroundColor: '#fff', elevation: 20
            }
            }>
                <View style={styles.profilTemplate}>
                    <TouchableOpacity>
                        <Image source={{ uri: 'https://res.cloudinary.com/abdi-library-storage/image/upload/v1567409295/DSC_0148-01_nxtfi0.jpg' }} style={styles.profilImage} />
                        <Text style={styles.profilName}>Abdillah Dzulfikar Mustanir</Text>
                    </TouchableOpacity>

                </View >
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </SafeAreaView >
        );
    }
}

export default (withNavigation(ComponentDrawer))

const styles = StyleSheet.create({
    textIcon: {
        flex: 7,
        fontWeight: '500',
        color: '#666',
        marginLeft: 32,
        fontSize: 16,
    },
    profilTemplate: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 30
    },
    profilImage: {
        height: 100,
        width: 101,
        borderRadius: 54,
        alignSelf: 'center',
    },
    iconStyle: {
        color: '#FBCC38',
        fontWeight: '900'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '70%',
        position: 'relative',
    },
    profilName: {
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
        paddingTop: '5%',
        fontSize: 25
    },
    gambar1: {
        opacity: .8,
        marginTop: 20,
        width: 270,
        marginLeft: -20
    }
})