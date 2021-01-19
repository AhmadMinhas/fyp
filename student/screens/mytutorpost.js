import React, { Component } from "react";
import {
  Dimensions,
  View,
  StyleSheet,Image,
  ScrollView,TouchableOpacity,Alert
} from "react-native";

import { Card5, Block, Text ,Divider} from "../components";
import { theme, mocks } from "../constants";
import * as Icon from "@expo/vector-icons";
const { width } = Dimensions.get("window");
import Setings from "./Setings"
class mytutorspost extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };

  state = {
    data: [],
  };
  async handletutorsp(){
    let user = await AsyncStorage.getItem('token');
  }
  _onPressDel(postid) {
    Alert.alert(
      "",
      "Are you sure you want to del?",
      [
        {
          text: "Yes",
          onPress: () => { fetch(
            'http://192.168.0.14:5000/auth/delete_my_tutor_post', {
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
          });}
          
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
  FetchCall=()=>{ fetch('http://192.168.0.14:5000/auth/my_tutors_post', {
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
    
    console.log(user)}

  componentDidMount() {
   this.FetchCall()
    
    //setInterval(this.componentDidMount , 3000);

  }

  render() {


    return (
      <Block style={styles.container} >
        
          <Text center h1 bold>
            MY Posts
          </Text>

      
      <Divider flex={0.0001} margin={[0,0]}  />
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base  }}
        >
        <Block style={styles.categories}>
        {this.state.data.map((category,i9) =>  {
          const reg=/^\d+$/
          if(reg.test(category.tutor_id))
          { 
            return(
            <Card5  middle shadow style={styles.card} key={i9}>
            <View style={{flexDirection:"row"}}>
            <Image style={styles.avatar} source={category.image}/>
            <View>
            <View style={{flexDirection:"row"}}> 
            <Text medium height={20}>
                   {category.fullname}
                  </Text>
                  <Text style={{color:"gray"}}>Rs 100/h</Text>
                  </View>  
                  <Text  medium height={20}>
                   Department: {category.department} 
                  </Text>
                  <Text  medium height={20}>
                  Semester: {category.semester} 
                 </Text>
                 <Text selectable medium height={20}>
                 email: {category.email} 
                </Text>
                <Text selectable medium height={20}>
                Description: {category.description} 
               </Text> 
               <Text  caption gray >
               Posted at: {category.datetime} 
              </Text> 
              <TouchableOpacity right onPress={() =>this._onPressDel(category.tutor_id)}   >
             <Icon.MaterialCommunityIcons size={25} name="delete" color={theme.colors.accent} />
              </TouchableOpacity>   
              </View>
              </View>  
            </Card5>
            )}
            else return <Text key={i9}>No Post Available</Text>
          })}
      </Block>
        </ScrollView>
        <Setings navigation={this.props.navigation} style4={{backgroundColor:"blue"}}/>
      </Block>
    );
  }
}
mytutorspost.defaultProps = {
  categories: mocks.categories
};

export default mytutorspost;

const styles = StyleSheet.create({
  container:{backgroundColor:"#f5f5f5"}, 
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
  avatar:{
    height: theme.sizes.base * 2,
    width: theme.sizes.base * 2,
    borderRadius: theme.sizes.radius*10,
    backgroundColor:"#f5f5f5",
    justifyContent:"center",
    marginRight:"3%"
  },
});