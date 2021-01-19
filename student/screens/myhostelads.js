import React, { Component } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,Image,
  Alert,TouchableOpacity
} from "react-native";
import Setings from "./Setings"
import { Card6, Badge, Button, Block, Text ,Divider} from "../components";
import { theme, mocks } from "../constants";
import * as Icon from "@expo/vector-icons";

const { width } = Dimensions.get("window");

class myhostelads extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
    title:"My Ads",
        headerRight: (
    
          <TouchableOpacity style={{  backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };
  constructor(props){
    super(props)
    this.state = {
      data:[]
    }
  }
  async handlemy(){ 
    let user = await AsyncStorage.getItem('token');
  }
  _render(){
    fetch('http://192.168.0.14:5000/auth/my_ads', {
      method: 'GET',
      headers: { Accept: 'application/json',
       'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user }
    })
    .then((response) => response.json())
    .then(json => this.setState({data : json}))
  }
  _onPressDel(postid) {
    Alert.alert(
      "",
      "Are you sure you want to del?",
      [
        {
          text: "Yes",
          onPress: () => { fetch(
            'http://192.168.0.14:5000/auth/delete_my_ads', {
            method: 'DELETE',
            headers: { Accept: 'application/json',
             'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user },
            body : JSON.stringify({
              post_id : postid
            })
          })
         .then((response)=>response.json())
  .then(data => {
  console.log('Success:', data);
  this.FetchCall();
  })
  .catch((error) => {
  console.error('Error:', error);
  });
  
  
  
          }
        },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        
      ],
      { cancelable: false }
        
      
    );
  }

  FetchCall=()=>{
    fetch('http://192.168.0.14:5000/auth/my_ads', {
      method: 'GET',
      headers: { Accept: 'application/json',
       'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user }
    })
    .then((response) => response.json())
    .then(json => this.setState({data : json}))
      if ('error' in this.state.data) {
        alert('No available notes');
      }
      
      console.log(user) 
  }
  componentDidMount() {
    this.FetchCall()
  } 

  
 
 


  render() {

    return (
      <Block style={styles.container} >
        
          <Text center h1 bold>
            MY HOSTEL POSTS
          </Text>

      
      <Divider flex={0.0001} margin={[0,0]}  />
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base  }}
        >
        <Block style={styles.categories}>
        {this.state.data.map((category) => //( console.log(category.ad_id),
         {
            const reg=/^\d+$/
            if(reg.test(category.ad_id))
            { 
              return(
            <Card6  middle shadow style={styles.card} key={category.ad_id}>
              <Text medium height={20}>
               rooms: {category.rooms}
               
              </Text>
              
              <Text  selectable medium height={20}>
               address: {category.address} 
              </Text>
              <Text  selectable medium height={20}>
              contact: {category.contact} 
             </Text>
             <Text  caption gray>
               Posted at: {category.datetime} 
              </Text>
             <Block row margin={[theme.sizes.padding * 0.9, 0]} style={styles.tag}>
             <ScrollView   horizontal={true}>
             
             <TouchableOpacity
            
                    /// key={index}
                     onPress={() => {}}>
                     <Image
                         style={{width, height: 200}}
                         source={{uri:category.image1}}
                         resizeMode="cover"
                         style={styles.image}
                     />  
                     </TouchableOpacity>
                     <TouchableOpacity
                    // key={index}
                    onPress={() => {}}>
                     <Image
                         style={{width, height: 200}}
                         source={{uri:category.image2}}
                         resizeMode="cover"
                         style={styles.image}
                     />  
                     </TouchableOpacity>
                     <TouchableOpacity
                    // key={index}
                    onPress={() => {}}>
                     <Image
                         style={{width, height: 200}}
                         source={{uri:category.image3}}
                         resizeMode="cover"
                         style={styles.image}
                     />  
                     </TouchableOpacity>
                     <TouchableOpacity
                    // key={index}
                    onPress={() => {}}>
                     <Image
                         style={{width, height: 200}}
                         source={{uri:category.image4}}
                         resizeMode="cover"
                         style={styles.image}
                     />  
                     </TouchableOpacity>
      

             

             </ScrollView>
  </Block>
  
  
              
              <Block center>
              <Button style={{width: '50%', height: 40, backgroundColor:theme.colors.accent}} onPress={() =>this._onPressDel(category.ad_id)}>
              <Block flex={false} row style={{justifyContent:"center"}}>
              <Icon.MaterialCommunityIcons size={25} name="delete" color="white" />
              <Text h2 center style={{color:"white"}}>Delete Ad</Text>
              </Block>
              </Button>
              </Block>

            </Card6>
            )}
            else return <Text>No Post Available</Text>
          })}
      </Block>
        </ScrollView>
        <Setings navigation={this.props.navigation} style2={{backgroundColor:"blue"}}/>
      </Block>
    );
  }
}



//myhostelads.defaultProps = {
  //categories: mocks.categories
//};

export default myhostelads;

const styles = StyleSheet.create({

  container:{
    backgroundColor:"#e6f9ff"
  },
  sp:{marginRight:15},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent:"space-around"
   },
   space:
   {
     justifyContent:"space-between",   flexDirection: 'row'
    },
    image: {
      width: width / 2.2,
      height: width / 2.2,
      marginRight: theme.sizes.base/5,
      borderColor: theme.colors.gray2,
      borderWidth: StyleSheet.hairlineWidth,
      
      paddingHorizontal: theme.sizes.base,
      paddingVertical: theme.sizes.base / 2.5,
     
    },
    tag: {
      borderColor: theme.colors.gray2,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: theme.sizes.base,
      paddingHorizontal: theme.sizes.base,
      paddingVertical: theme.sizes.base / 2.5,
     
      flexDirection: 'row',
    },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  card:{
    width:300
  },
  button:{
    width:70
  },
sp:{marginLeft:15},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent:"flex-end"
   }
});