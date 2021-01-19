import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,TouchableOpacity,
 
} from "react-native";
import call from "react-native-phone-call"
import { Card4, Block, Text ,Divider, Button} from "../components";
import { theme, mocks } from "../constants";

import * as Icon from "@expo/vector-icons"
import ImageView from 'react-native-image-view';
const { width } = Dimensions.get("window");
import Setings from "./Setings"


const images = [
  {
      source: {
          uri:
              'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-forest-in-fog-russian-nature-forest-mist-dmitry-ilyshev.jpg',
      },
      title: 'Switzerland',
  },

  {
      source: {
          uri:
              'https://i.pinimg.com/564x/a5/1b/63/a51b63c13c7c41fa333b302fc7938f06.jpg',
      },
      title: 'USA',
      width: 400,
      height: 800,
  },
  {
      source: {
          uri:
              'https://guidetoiceland.imgix.net/4935/x/0/top-10-beautiful-waterfalls-of-iceland-8?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-2.1.1&w=883&s=1fb8e5e1906e1d18fc6b08108a9dde8d',
      },
      title: 'Iceland',
      width: 880,
      height: 590,
  },
];

class viewadshostel extends Component {
 static navigationOptions = ({ navigation }) => {
    return{
    title:"View Ads",
        headerRight: (
    
          <TouchableOpacity style={{  backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };
  constructor(){
    super()
    this.state = {
      photos:[],
      data: [],
  isVisible:true,
    imageIndex: 0,
    isImageViewVisible: false,}
    error = 0;
   
    
  }

  componentDidMount() {
    fetch('http://192.168.0.14:5000/auth/all_ads', {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
  })
  .then((response) => response.json())
  .then(json => this.setState({data : json}))

    if ('error' in this.state.data) {
      alert('No available notes');
    } 



  }



  
makeCall = (number) => {
  const args = {
      number: number, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
  }
 call(args).catch(console.error)
}


  render() {
    const {isImageViewVisible} = this.state;
    

    return (
      <Block style={styles.container} >
        
          <Text center h1 bold>
            EXPLORE HOSTELS
          </Text>

      
      <Divider flex={0.0001} margin={[0,0]}  />
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base}}
        >
        <Block style={styles.categories}>
        {this.state.data.map((category,i) =>{
          {console.log(category,"jjjjj")}
          const reg=/^\d+$/
          if(reg.test(category.ad_id))
          { 
            return(
            <Card4 middle shadow style={styles.card} key={i}>
              <Text medium height={20}>
              Available rooms: {category.rooms}
              </Text>
              <Text selectable medium height={20}>
               Address: {category.address} 
              </Text>
              <Text selectable medium height={20}>
              Contact Number: {category.contact} 
             </Text>
              <Text  caption gray>
              Posted at: {category.datetime} 
             </Text>
             
             <Block row margin={[theme.sizes.padding * 0.9, 0]} style={styles.tag}>
             <ScrollView   horizontal={true}>
             
             <TouchableOpacity
            
                    /// key={index}
                     onPress={() => {this.setState({photos:[{uri:category.image1},{uri:category.image2},{uri:category.image3},{uri:category.image4}],isImageViewVisible: true,})}}>
                     {console.log(this.state.photos)}
                     <Image
                         style={{width, height: 200}}
                         source={{uri:category.image1}}
                         resizeMode="cover"
                         style={styles.image}
                     />  
                     </TouchableOpacity>
                     <TouchableOpacity
                    // key={index}
                     onPress={() => {this.setState({isImageViewVisible: true,});
                     }}>
                     <Image
                         style={{width, height: 200}}
                         source={{uri:category.image2}}
                         resizeMode="cover"
                         style={styles.image}
                     />  
                     </TouchableOpacity>
                     <TouchableOpacity
                    // key={index}
                     onPress={() => {this.setState({isImageViewVisible: true,});
                     }}>
                     <Image
                         style={{width, height: 200}}
                         source={{uri:category.image3}}
                         resizeMode="cover"
                         style={styles.image}
                     />  
                     </TouchableOpacity>
                     <TouchableOpacity
                    // key={index}
                     onPress={() => {this.setState({isImageViewVisible: true,});
                     }}>
                     <Image
                         style={{width, height: 200}}
                         source={{uri:category.image4}}
                         resizeMode="cover"
                         style={styles.image}
                     />  
                     </TouchableOpacity>
      

             

             </ScrollView>
  </Block>
  
  
  
    <Button style={{width: '100%', height: 40, backgroundColor: "green"}} onPress={()=> this.makeCall(category.contact)}>
             <Block flex={false} row style={{justifyContent:"center"}}>
             <Icon.Ionicons style={{marginRight:"3%"}} size={20} name="md-call" color="white"/>
             <Text h2 center style={{color:"white"}}>Contact</Text>
             </Block>
             </Button>
             {console.log(this.state.photos,"glfeee")}
       <ImageView
             glideAlways
             images={this.state.photos}
             imageIndex={0}
             animationType="fade"
             isVisible={this.state.isImageViewVisible}
             onClose={() => this.setState({isImageViewVisible: false})}
            // onImageChange={index => {
               //  console.log(index);
          //  }
         //  }
         />
       
            </Card4>
            )}
            else return <Text key={i}>No Post Available</Text>
          })}
      </Block>
        </ScrollView>
        <Setings  navigation={this.props.navigation} style2={{backgroundColor:"blue"}}/>
      </Block>
    );
  }
}


viewadshostel.defaultProps = {
  categories: mocks.categories,
  product: mocks.categories[0]
};

export default viewadshostel;

const styles = StyleSheet.create({

  container:{
   backgroundColor:"#e6f9ff"
  },

 image: {
    width: width / 2.2,
    height: width / 2.2,
    marginRight: theme.sizes.base/5,
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
   
  },avatar:{
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
  }
});