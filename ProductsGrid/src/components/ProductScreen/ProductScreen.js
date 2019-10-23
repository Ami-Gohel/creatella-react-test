/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    SafeAreaView,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { productlistAction } from '../redux/actions'
import { connect } from 'react-redux'
const url = "http://localhost:3000/ads/?r="
var { height, width } = Dimensions.get('window');
import Loader from './Loader'
import formatDate from './Date';

export class ProductScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortOption: '',
            isSorted: false,
            data: [],
            isAd: false,
            page: 1,
            sortBy: '',
            isLoading: true,
            onEndReached: false,
            noData: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.Products.data){
        if (nextProps.Products.data.length != 0) {
            this.setState({
                data: this.state.data.concat(nextProps.Products.data), page: this.state.page + 1,
                onEndReached: false, isLoading: false
            })
        }
        else {
            this.setState({
                noData: true,
                onEndReached: false
            });
        } 
    }
        else{
     alert('Please start server for api data')
   }
    }
    _getProductlist() {
        const Params = {
            "_page": this.state.page,
            "_limit": 20,
            "_sort": this.state.sortBy
        }
        this.props.productlistAction(Params);
    }
    componentDidMount() {
        this._getProductlist()
    }
    componentDidUpdate(previosProps, previousState) {
        if (this.state.sortOption !== previousState.sortOption) {
            this.setState({ isLoading: true})
            this._getProductlist()
        }
        

        if (this.state.onEndReached !== previousState.onEndReached) {
            this.setState({ isAd: true })
            this._getProductlist()

        }
    }
    _onEndReached = () => {
        this.setState({ onEndReached: true });
    };
    renderSortview() {
        const sortOption = [
            {
                lable: " Size",
                value: 'size'
            },
            {
                lable: "Price",
                value: 'price'
            },
            {
                lable: "Id",
                value: 'Id'
            },
        ]
        return (
            <View style={styles.sortOption} >
                {sortOption.map((option) => (
                    <TouchableOpacity key={option.lable} style={styles.sortBtn}
                        onPress={() => {this.setState({ sortOption: option.lable,isSorted: false })
                            if(option.value != this.state.sortBy ) 
                        this.setState({ sortOption: option.lable,data: [], page: 1,sortBy: option.value, isSorted: false })}}>
                        <Text> {option.lable}</Text>
                    </TouchableOpacity>))}
            </View>
        )
    }
    _renderListFooter = () => {
        if (this.state.onEndReached) {
            return <Loader />;
        } else if (this.state.noData) {
            return <Text style={styles.footer}>~ end of catalogue ~</Text>;
        }
        return null;
    };
    _renderItem = ({ item, index }) => {
        let cost = item.price/100
        return (
            <View style={styles.item}>
                {(index )%20 == 0 && index !=0 ?
                    <Image source={{ uri: `${url}${Math.floor(Math.random() * 1000)}` }} style={styles.itemAd} />
                      :
                    <View>
                        <Text style={styles.id}>{item.id}</Text>
                        <View style={styles.viewFace}>
                            <Text style={[styles.face, { fontSize: item.size }]}>{item.face}</Text>
                        </View>
                        <Text style={styles.price}>Price: ${cost}</Text>
                        <Text style={styles.date}>{formatDate(item.date)}</Text>
                    </View>}
            </View>

        );
    };
    _onEndReached = () => {
        this.setState({ onEndReached: true });
    };
                    /*<---- render Header and Grid   ----> */

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.container}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={styles.productsText}>Products Grid</Text>
                        <Text style={styles.topText}>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</Text>
                        <Text style={styles.topText}>But first, a word from our sponsors:</Text>
                        <Image source={{ uri: `${url}${Math.floor(Math.random() * 1000)}` }}
                            style={styles.ad} />

                    </View>
                    <View style={styles.viewSort}>
                        <TouchableOpacity style={styles.sortBtn}
                            onPress={() => this.setState({ isSorted: !this.state.isSorted })}>
                            <Text>Sortby : {this.state.sortOption}  ▼</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.isSorted == true ?
                        this.renderSortview()
                        : undefined}
                    {this.state.isLoading ?
                        <Loader /> :
                        <FlatList
                            keyExtractor={(item, index) => index}
                            contentContainerStyle={styles.flatListContentContainer}
                            numColumns={2}
                            data={this.state.data}
                            renderItem={this._renderItem}
                            ListFooterComponent={this._renderListFooter}
                            onEndReached={this._onEndReached}
                            onEndReachedThreshold={0.1}
                            extraData={{
                                onEndReached: this.state.onEndReached,
                                noData: this.state.noData
                            }}
                        />}
                </SafeAreaView>
            </>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    productsText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20
    },
    topText: {
        fontSize: 15,
        width: width - 30,
        alignSelf: 'center',
        marginTop: 10
    },
    ad: {
        height: 200,
        width: width - 20,
        marginVertical: 10,
        alignSelf: 'center'
    },
    viewSort: {
        height: 40,
        marginBottom: 10,
        justifyContent: 'center',
        width: width - 20,
        borderColor: 'black',
        borderWidth: 0.61,
        alignItems: 'flex-end',
        alignSelf: 'center'
    },
    sortBtn: {
        height: 30,
        opacity: 1,
        backgroundColor: 'white',
        paddingRight: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemAd:{
        height:width/2.4,
        resizeMode:'contain',
        width:width/2-20
    },
    sortOption: {
        width: 100,
        borderColor: 'gray',
        borderWidth: 0.61,
        backgroundColor: 'white',
        shadowColor: '#000000',
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        alignSelf: 'center',
        shadowRadius: 4,
        shadowOpacity: 0.3,
        opacity: 1,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        marginRight: 10

    },
    item: {
        flex: 1,
        height: 225,
        paddingVertical:10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.1,
        backgroundColor: 'white',
        shadowColor: '#000000',
        elevation: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        alignSelf: 'center',
        width: width - 30,
        shadowRadius: 4,
        shadowOpacity: 0.3,
        borderRadius: 6,
        marginBottom: 15,
        borderRadius: 5,
        paddingVertical: 5,
        marginVertical: 2,
        marginHorizontal: 3
    },
    viewFace:{
        height: 150,
        padding: 10, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    face: {
        textAlign: 'center',
        marginBottom: 10
    },
    price: {
        textAlign: 'center',
        color: '#2D9B93',
        fontSize: 15,
        fontWeight: '400'
    },
    id:{
        textAlign: 'center',
        color: 'grey',marginTop:10
    },
    date: {
        textAlign: 'center',
        color: 'grey',
        marginBottom:10,
    },
    flatListContentContainer: {

        paddingBottom: 10
    },
    footer: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10
    }
});

const mapStateToProps = (state) => {
    return {
        Products: state.Products
    };
}
export default connect(mapStateToProps, { productlistAction })(ProductScreen);
