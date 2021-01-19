import React, { Component } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,Alert,KeyboardAvoidingView, Image,TextInput,Modal
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { Card1, Block, Text ,Divider,Input,Button, CardC} from "../components";
import { theme, mocks } from "../constants";
import Setings from "./Setings"
import { category } from "../constants/mocks";

const { width } = Dimensions.get("window");


class Browse extends Component {

  static navigationOptions = ({ navigation }) => {
    return{
    title:"Discuss",
        headerRight: (
          <TouchableOpacity style={{  backgroundColor:"#00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };
  state = {
    categories: [],
    post:null,
    loading: false,
    errors:[],
    lastRefresh: Date(Date.now()).toString(),
    buttonColor: 'gray',
    showTerms: false,
    reply : null
  };
  
  
  
  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
  }


  componentDidMount() {
    fetch('http://192.168.0.14:5000/auth/all_comments', {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
    })
    .then((response) => response.json())
    .then(json => this.setState({categories : json}))
      if ('error' in this.state.categories) {
        alert('No post available');
      } 
  }
/*  renderTermsService() {
            
    const { categories } = this.state;

    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
        
      >
        <Block
        padding={[theme.sizes.padding , theme.sizes.padding]}
        >
        <Text style={styles.text}>
        Comments
      </Text>
        <ScrollView style={{ marginVertical: theme.sizes.padding }} showsVerticalScrollIndicator={false}>
         
          <View style={styles.icon}>
          <TextInput
        style={styles.input}
        placeholder="Add a comment"
        onChangeText={text => this.setState({ reply: text })}

            />
            <TouchableOpacity  >
            <Icon.Ionicons
            name='md-send'
            color={this.state.buttonColor} onPress={this.onButtonPress(category.comment_id, this.state.reply)}
            size={25}
          />
          </TouchableOpacity>
        
            </View>
          
            {categories.map((category,indexC) => (
  
              <CardC middle shadow style={styles.card} key={indexC}>

                
                <Text caption  gray height={12}>
                 {category.comments}
                </Text>
                
               
               
              </CardC>
          
          ))}
          </ScrollView>
        </Block>
      </Modal>
    );
    
  }*/
//   onButtonPress=(id, reply)=>{

//     var myHeaders = new Headers();
// myHeaders.append("Authorization", 'Bearer ' + user );
// myHeaders.append("Content-Type", "application/json");

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: JSON.stringify({"comment_id": id ,"reply": reply}),
//   redirect: 'follow'
// };

// fetch("http://192.168.0.14:5000/auth/add_reply", requestOptions)
//   } 
  
//   onButtonPressreply=(postid)=>{
 
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
    
//     var raw = JSON.stringify({"cmnt_id":2});
    
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };
    
//     fetch("http://192.168.0.14:5000/auth/on_comment_reply", requestOptions)
//       .then(response => response.text())
//       .then(result => console.log(result))
//       .catch(error => console.log('error', error));
   
//   }
  _onPressButton2(id) {
    
    Alert.alert(
      "",
      "Do you want to report this post?",
      [
        { text: "YES", onPress: () =>{
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({"comment_id":id}); 

          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
                               };

fetch("http://192.168.0.14:5000/auth/report_comment", requestOptions)
  .then(response => response.json())
  .then(result => {if (result.status == 1) {
    Alert.alert("","Ad reported, Post will review it!")
  } else {
    Alert.alert("","You have alaready reported this add")
  }})
  .catch(error => console.log('error', error));
        }
        // Alert.alert("","Ad reported, Post will review it!") 
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

_onPressButtondiscuss() {
  const {post} = this.state;
    const errors = [];
    var data = {}
    this.setState({ loading: true });
    if (!post) errors.push("post")
    this.setState({ errors, loading:false });

    if (!errors.length) {
      fetch('http://192.168.0.14:5000/auth/add_comment', {
        method: 'POST',
        headers: { Accept: 'application/json',
         'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user },
        body: JSON.stringify({ 'comment': this.state.post}),
      })
      .then((response)=> (response.json))
      .then((json) => {
       this.setState({post : null})
      Alert.alert(
        "",
        "Query posted",
        [
          {
            text: "OK",
            onPress: () =>   fetch('http://192.168.0.14:5000/auth/all_comments', {
              method: 'GET',
              headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
            })
            .then((response) => response.json())
            .then(json => this.setState({categories : json})) ,
            
          }
          

        ],
      );

    



      })
    

}
}




  render() {
    const { profile, navigation } = this.props;
    const { loading, errors} = this.state;
    const hasErrorsp = key => (errors.includes(key) ? styles.hasErrorsp: null);

    return (
      <Block style={styles.container} >
      <ImageBackground
      source={require('../assets/d1.jpg')}
      style={styles.bgImage}
      resizeMode="cover"
    >
          <Text center h1 bold>
          Share Your Problems with Us!
          </Text>
         
      
   
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base  }}
        >
        <KeyboardAvoidingView style={{flex:1}} enabledKeyboardOffset={30}>
        <Block style={styles.categories1}>
        <ScrollView contentContainerStyle={{alignItems:"center"}}>
        
        <View style={styles.formcontainer}>
   
        
        <Input
        post
        label="POST YOUR QUERIES"
        error={hasErrorsp("post")}
        style={[styles.input, hasErrorsp("post")]}
        defaultValue={this.state.post}
        onChangeText={text => this.setState({ post: text })}
      />
      <TouchableOpacity  onPress= {() => this._onPressButtondiscuss(this.props.navigation)}> 
        <Text accent style={{ textDecorationLine: "underline" ,marginLeft:260 }}>POST</Text>
        </TouchableOpacity>
        

       
        </View>
        
        </ScrollView>
        </Block>
        </KeyboardAvoidingView>

        <Block style={styles.categories}>
        {this.state.categories.map((category,index2) => {
          const reg=/^\d+$/
          if(reg.test(category.comment_id))
          { 
            return(
            <Card1  middle shadow style={styles.card} key={index2}>
              
        <Block flex={false} row>
        <Image style={styles.avatar} source={{uri:category.image}} />

        <Block> 
        <Text h3 bold medium style={{fontFamily:"3Dumb"}}>
                {category.email}
              </Text>
              <Text caption  gray height={12}>
               {category.username} 
              </Text>
        </Block> 
        </Block>

              <Text  medium height={20} style={{marginTop:15}}>
              Query: {category.comment} 
             </Text>
             <Text  caption gray>
              Posted at: {category.datetime} 
             </Text>
             <Block flex={false} row margin={[theme.sizes.base, 0]} style={styles.tag}>
       {console.log(category,"discusss")}
        <TouchableOpacity >
         <Icon.AntDesign color="gray" color={this.state.buttonColor}
         onPress={this.onButtonPress} size={25} name="like1"   />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sp}    >
          <Icon.FontAwesome size={25} color="gray"  name="comment-o"  onPress={() => this.props.navigation.navigate("comments",{postid:category.comment_id})} />
          </TouchableOpacity>
          <TouchableOpacity  style={styles.sp} >
          <Icon.MaterialIcons size={25} name="report-problem" color="gray"  onPress={() => this._onPressButton2(category.comment_id)}/>
          </TouchableOpacity>
        </Block>
          
             
            </Card1>
            )}
            else return <Text key={index2}>No Post Available</Text>
          })}
      </Block>
        </ScrollView>
   <Setings navigation={this.props.navigation} style5={{backgroundColor:"blue"}}/>
   </ImageBackground>
      </Block>
     
    );
  }
}

Browse.defaultProps = {
  categories: mocks.categories
};

export default Browse;

const styles = StyleSheet.create({
  
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  container:{backgroundColor:"#e6f2ff"},
  sp:{marginLeft:10},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
  
   },
   formcontainer:{
    width:"100%",
    marginTop:5,
    
 },
 hasErrorsp: {
  borderBottomColor: theme.colors.accent
},
   input:{
    paddingHorizontal:3,
    paddingVertical:2,
    backgroundColor:"#e6f2ff",
    height:70,
    fontSize:14,
    borderColor:"gray",
    borderWidth:2,
    marginVertical:2,
    color:"white",
    marginTop:7,
    marginLeft:0,
    color:"black",
   
},
avatar:{
  height: theme.sizes.base * 2,
  width: theme.sizes.base * 2,
  borderRadius: theme.sizes.radius*10,
  backgroundColor:"#f5f5f5",
  justifyContent:"center",
  marginRight:"3%"
},
   
   tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625
  },

   space:{justifyContent:"space-between",   flexDirection: 'row',},
   container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },

  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  categories1: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base 
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
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base/ 4,
    marginRight: theme.sizes.base * 0.625,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:0,
    marginTop:30
  },

  sp:{marginLeft:"10%"},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent:"flex-end"
   },
   text:{textDecorationLine: "underline", fontSize:25, marginBottom:15},
   input: {
   width:285,
    fontSize: theme.sizes.font,
    fontWeight: "500",
    color: theme.colors.black,
    height: theme.sizes.base *2

  },
  icon:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    
  }
});