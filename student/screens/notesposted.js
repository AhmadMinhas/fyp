import React, { Component } from "react";
import {
  Dimensions,
  View,
  StyleSheet,Image,
  ScrollView,
  Alert,TouchableOpacity
} from "react-native";
import Setings from "./Setings"
import { Card3, Badge, Button, Block, Text ,Divider} from "../components";
import { theme, mocks } from "../constants";
import * as Icon from "@expo/vector-icons";

const { width } = Dimensions.get("window");

class notesposted extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };


  async handlenotes(){
    let user = await AsyncStorage.getItem('token');
  }
  state = 
  { 
    categories: [],
    data : []
  };
  _onPressDel(postid) {
    console.log(postid,"id");
    Alert.alert(
      "",
      "Are you sure you want to del?",
      [
        {
          text: "Yes",
          onPress: () => { fetch(
            'http://192.168.0.14:5000/auth/delete_my_notes', {
            method: 'DELETE',
            headers: { Accept: 'application/json',
             'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user },
            body : JSON.stringify({
              post_id : postid
            })
          }).then((response)=>response.json())
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
  fetch('http://192.168.0.14:5000/auth/my_notes', {
    method: 'GET',
    headers: { Accept: 'application/json',
     'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user }
  })
  .then((response) => response.json())
  .then(json => {console.log(json);
    this.setState({data : json})})
    if ('error' in this.state.data) {
      alert('No available notes');
    }
  
    console.log(user)}//already binded arrow function

  componentDidMount() {
  this.FetchCall()
  }

  
  _onPressButton1() {
    
    Alert.alert(
      "",
      "Do you want to delete these notes?",
      [
        { text: "YES", onPress: () => Alert.alert("Notes deleted")  },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        
      ],
      { cancelable: false }
    );
  }
 


  render() {
    const { categories } = this.state;

    return (
      <Block style={styles.container} >
        
          <Text center h1 bold>
            MY NOTES
          </Text>

      
      <Divider flex={0.0001} margin={[0,0]}  />
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base  }}
        >
        <Block style={styles.categories}>
        {this.state.data.map((category,i) =>  {
          const reg=/^\d+$/
          if(reg.test(category.NotesId))
          { 
            return(
            <Card3  middle shadow style={styles.card} key={i}>
              <Text medium height={20}>
               Department: {category.department}
              </Text>
              <Text  medium height={20}>
               Subject: {category.subject} 
              </Text>
              <Text  medium height={20}>
              Semester: {category.semester} 
             </Text>
            
              <Text  medium height={20}>
               Description: {category.description} 
              </Text>
              <Text  caption gray>
              Posted at: {category.datetime} 
             </Text>
             <TouchableOpacity right onPress={() =>this._onPressDel(category.NotesId)}   >
             <Icon.MaterialCommunityIcons size={25} name="delete" color={theme.colors.accent} />
              </TouchableOpacity>  
            </Card3>
            )}
            else return <Text key={i} style={styles.text}>NO Post Available</Text>
          })}
      </Block>
        </ScrollView>
        <Setings navigation={this.props.navigation} style1={{backgroundColor:"blue"}}/>
      </Block>
    );
  }
}

notesposted.defaultProps = {
  categories: mocks.categories
};

export default notesposted;

const styles = StyleSheet.create({

  container:{
    backgroundColor:"#f5f5f5"
  },
  sp:{marginRight:15},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent:"flex-end"
   },
   space:
   {
     justifyContent:"space-between",   flexDirection: 'row'
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
  text:{
    justifyContent:"center"
  }
}); 