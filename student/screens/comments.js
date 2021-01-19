import React, { Component } from "react";
import {View,TouchableOpacity,ScrollView,TextInput,Dimensions,Modal,Alert} from 'react-native'
import { Divider,Card, Badge, Button, Block,Text,CardC } from "../components";
import {
  StyleSheet,
} from "react-native";
import { theme, mocks } from "../constants";
import Setings from "./Setings"
import { category } from "../constants/mocks";
import * as Icon from "@expo/vector-icons";
const { width } = Dimensions.get("window");
class comments extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    categories: [],
    post:null,
    loading: false,
    errors:[],
    lastRefresh: Date(Date.now()).toString(),
    buttonColor: 'gray',
    showTerms: false,
    reply : null,
    buttonColor1: 'gray',
    showTerms:true,
    postId:"",
    data:[]
  };
 

  onButtonPressC = () => {
    if(this.state.buttonColor1=='gray')
    {
      this.setState({ buttonColor1: 'red' }) // grey
    }
    else {
      this.setState({ buttonColor1: 'gray' }) // red
    }
  }
  componentDidMount(){
    console.log(this.props.navigation.state.params.postid)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
    var raw = JSON.stringify({"cmnt_id":this.props.navigation.state.params.postid});
   
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
   
    fetch("http://192.168.0.14:5000/auth/on_comment_reply", requestOptions)
    .then(response => response.json())
    .then(result =>this.setState({data : result}))
    .catch(error => console.log('error', error));
  }
  postReply=(id, reply)=>{
    console.log(user)
        var myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + user );
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({"comment_id": id ,"reply": reply}),
      redirect: 'follow'
    };
    
    fetch("http://192.168.0.14:5000/auth/add_reply", requestOptions)
    this.setState({reply : null})
    Alert.alert(
      "",
      "Reply posted",
      [
        {
          text: "OK",
          onPress: () =>  {var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
         
          var raw = JSON.stringify({"cmnt_id":this.props.navigation.state.params.postid});
         
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
         
          fetch("http://192.168.0.14:5000/auth/on_comment_reply", requestOptions)
          .then(response => response.json())
          .then(result =>this.setState({data : result}))
          .catch(error => console.log('error', error));
        }
      }
        

      ],
    );

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
   
    // var raw = JSON.stringify({"cmnt_id":this.props.navigation.state.params.postid});
   
    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };
   
    // fetch("http://192.168.0.14:5000/auth/on_comment_reply", requestOptions)
    // .then(response => response.json())
    // .then(result =>this.setState({data : result}))
    // .catch(error => console.log('error', error));
      } 

    render() {
     
 
      return (
       
     <View style={styles.Container}>
        <Block
        padding={[theme.sizes.padding , theme.sizes.padding]}
        >
        <Text h2 style={styles.text}>
        Comments
      </Text>
        <ScrollView style={{ marginVertical: theme.sizes.padding }} showsVerticalScrollIndicator={false}>
         
          <View style={styles.icon}>
          <TextInput
        style={styles.input}
        placeholder="Add a comment"
        onChangeText={text => this.setState({ reply: text })}

            />
            <TouchableOpacity>
            <Icon.Ionicons
            name='md-send'
            color={this.state.buttonColor}
            size={25}
            onPress={ () => this.postReply(this.props.navigation.state.params.postid, this.state.reply)}
          />
          </TouchableOpacity>
       
            </View>
         
            {this.state.data.map((category) =>  
            {
              const reg=/^\d+$/
              if(reg.test(category.check))
              { 
                return(
                  <CardC middle shadow style={styles.card} >

                  <View style={{flexDirection:"row",width:"100%"}}>
                  <View style={{width:"94%"}}>
                  <Text bluish h3 style={{fontFamily:"alpha_echo",marginVertical:"1%"}}>{category.username}</Text>
                  <Text caption gray>{category.datetime}</Text>
                  <Text medium height={20} style={{marginTop:15}}>{category.comment}</Text>
                  </View>
                  <TouchableOpacity >
                  <Icon.AntDesign color="gray" color={this.state.buttonColor1}
                  onPress={this.onButtonPressC} size={16} name="heart"/>
                  </TouchableOpacity>
                  </View>
                  </CardC>
                  )}
                else return <Text medium height={20}>No Post Available</Text>
              })}
        
          </ScrollView>
        </Block>
        </View>
      );
    }
  }
  export default comments;

  const styles = StyleSheet.create({
  Container:{
    backgroundColor:"#f5f5f5",
    flex:1,
    marginVertical:"10%"
   
   
  },
  icon:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
   
  },  input: {
    width:"92%",
     fontSize: theme.sizes.font,
     fontWeight: "500",
     color: theme.colors.black,
     height: theme.sizes.base *2
 
   }, card:{
    width:"100%",
    marginVertical:"8%",
    height:"20%"
  },
text:{
  textDecorationLine:"underline"
}})