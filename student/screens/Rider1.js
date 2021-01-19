import MapView, { Polyline, Marker,PROVIDER_GOOGLE } from "react-native-maps";
import React, { Component } from "react";
import call from "react-native-phone-call"
import {
  Dimensions,
  Image,Modal,
  StyleSheet,TextInput,
  ScrollView,TouchableWithoutFeedback,
  TouchableOpacity,View, KeyboardAvoidingView
} from "react-native";
import { Button, Block, Text,Cardcar ,Input} from "../components";
import { theme, mocks } from "../constants";
import * as Icon from "@expo/vector-icons";






 class Rider1 extends Component {



  static navigationOptions = ({ navigation }) => {
    return{
        title:"Book Your Ride",
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };

      
 
    state = {
     latitude: 31.5204,
     longitude: 74.3587,
     error: null,
     routeCoordinates: [],
     distanceTravelled: 0,  
    valueprevLatLng: {},
    destination:"",
    pick:"Pick up point: COMSATS",
    latitude2:31.430204,
    longitude2:74.3587,
    showTerms: false,
      categories: [],
      post:null,
      loading: false,
      errors:[],
      lastRefresh: Date(Date.now()).toString(),
  
    
    };   

   

   componentDidMount() {
    navigator.geolocation.getCurrentPosition(
    position => {
   const { latitude, longitude } = position.coords;
   const { routeCoordinates,distanceTravelled  } = this.state;
   const newCoordinate = {
    latitude,
    longitude
   };
   this.setState({
    latitude,
    longitude,
    routeCoordinates: routeCoordinates.concat([newCoordinate]),
   categories: this.props.categories 
   });
},
    error => this.setState({ error: error.message }),
     { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
     );

     navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const { routeCoordinates } = this.state;
        const newCoordinate = {  latitude,  longitude  };
        this.setState({
         latitude,
         longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate])
        });
      },
      error => console.log(error),
      { 
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }

      
     );

     
   }
  

   getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
   });
   getMapRegion1 = () => ({
    latitude: this.state.latitude2,
    longitude: this.state.longitude2,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
   });

   makeCall = (number) => {
    const args = {
        number: number, // String value with the number to call
        prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
   call(args).catch(console.error)
  }
  

async onChangeDestination(destination){
  const api_key="AIzaSyDh0WSUUvpcSzv59oWTVlb15023KEXMxDU"
  this.setState({destination});
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${api_key}&input={${destination}}&location=${
      this.state.latitude},${this.state.longitude}&radius=2000`;
}
  
   
  render() {
    var x=this.state.latitude.toString()
    const {navigation} = this.props;
    const {categories}=this.state;
    if(this.state.showTerms){
     return (
       
       <Cardcar
       style={{ 
        backgroundColor:"#eff8fb",
        marginTop:"2%",
        flexGrow:0.98
        }}
       animationType="slide"
     >
     <TouchableWithoutFeedback style={{backgroundColor:"#C5CCD6",borderTopLeftRadius:25,borderTopRightRadius:25, borderColor:"white"}} onPress={() => this.setState({ showTerms: false })}>
     <Icon.AntDesign name="closecircleo" size={30} style={{marginLeft:"90%"}}/></TouchableWithoutFeedback>
         <View style={{flex:1,backgroundColor:"white",borderBottomLeftRadius:25,borderBottomRightRadius:25}}>
          <View style={{flex:0.15,borderBottomColor:"gray", borderWidth:StyleSheet.hairlineWidth,backgroundColor:"#C5CCD6",borderTopWidth:0,borderLeftWidth:0,borderRightWidth:0}}>
          <View style={styles.imageContainer}><Image fadeDuration={2000} source={require('../assets/d1.jpg')} style={styles.image}
     resizeMode="cover"
     /></View>
          </View>
          <View style={{flex:0.4,marginHorizontal:"5%"}}>
          
          <Block row justifyContent="space-around" style={{marginTop:"12%",marginBottom:"3%",borderWidth:StyleSheet.hairlineWidth,borderTopWidth:0,borderRightWidth:0,borderLeftWidth:0,borderBottomColor:"gray"}}><Text style={{textAlign:"center",color:"blue",fontSize:35}}>Ayishm</Text>
          <Text h1 style={{textAlign:"center",color:"blue",fontSize:35}}>*****</Text>
          </Block>
          
            <Text style={{fontSize:30 ,textDecorationLine: "underline",color:"gray"}}>Car Details:</Text>
            <Block style={{marginTop:0,marginHorizontal:"2%"}} row justifyContent="space-between">
            <Text style={{ fontSize:20,color:"#C5CCD6" }}>Car Name: XYZ</Text>
            <Text style={{fontSize:20,color:"#C5CCD6"}}>Car Number: 123</Text>
            </Block>

            <Block style={{marginTop:0,marginHorizontal:"2%"}} row justifyContent="space-between">
            <Text style={{ fontSize:20,color:"#C5CCD6" }}>No. of Seats: 2</Text>
            <Text style={{fontSize:19,color:"#C5CCD6",marginLeft:"6%"}}>Departure: 9:00am</Text>
            </Block>
            <Block style={{marginTop:0,marginHorizontal:"2%"}} row justifyContent="space-between">
            <Text style={{ fontSize:20,color:"#C5CCD6" }}>Pickup: COMSATS</Text>
            <Text style={{fontSize:19,color:"#C5CCD6",marginLeft:"6%"}}>Drop-off: Johar Town</Text>
            </Block>

          
          </View>

          <View style={{flex:0.20,marginHorizontal:"5%"}}>
          
            <Text style={{fontSize:30 ,textDecorationLine: "underline",color:"gray"}}>Car Details:</Text>
            <Block style={{marginTop:0,marginHorizontal:"3%"}} row justifyContent="space-between">
            <Text style={{ fontSize:20,color:"#C5CCD6" }}>Car Name: XYZ</Text>
            <Text style={{fontSize:20,color:"#C5CCD6"}}>Car Number: 123</Text>
            </Block>

            <Block style={{marginTop:0,marginHorizontal:"3%"}} row justifyContent="space-between">
            <Text style={{ fontSize:20,color:"#C5CCD6" }}>No. of Seats: 2</Text>
            <Text style={{fontSize:19,color:"#C5CCD6",marginLeft:"6%"}}>Departure: 9:00am</Text>
            </Block>

          
          </View>

          <View style={{flex:0.20,marginHorizontal:"5%"}}>
          
          <Text style={{fontSize:30 ,textDecorationLine: "underline",color:"gray"}}>Car Details:</Text>
          <Block style={{marginTop:0,marginHorizontal:"3%"}} row justifyContent="space-between">
          <Text style={{ fontSize:20,color:"#C5CCD6" }}>Car Name: XYZ</Text>
          <Text style={{fontSize:20,color:"#C5CCD6"}}>Car Number: 123</Text>
          </Block>

          <Block style={{marginTop:0,marginHorizontal:"3%"}} row justifyContent="space-between">
          <Text style={{ fontSize:20,color:"#C5CCD6" }}>No. of Seats: 2</Text>
          <Text style={{fontSize:19,color:"#C5CCD6",marginLeft:"6%"}}>Departure: 9:00am</Text>
          </Block>

        
        </View>
          
         </View>
         
       </Cardcar>
      
     );
     
   }
    return (
      <View style={styles.container}>
      <MapView
      provider={PROVIDER_GOOGLE}
      style={{ ...StyleSheet.absoluteFillObject }}
      region={this.getMapRegion()}>
      <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
      <Marker coordinate={this.getMapRegion()} />
       <Marker coordinate={this.getMapRegion1()}/>
      </MapView>
     
    
        

        {this.state.showTerms?<Cardcar>
        <TouchableWithoutFeedback style={{backgroundColor:"#C5CCD6",borderTopLeftRadius:25,borderTopRightRadius:25, borderColor:"white"}} onPress={() => this.setState({ showTerms: false })}>
        <Icon.AntDesign name="closecircle" size={30} style={{marginLeft:"90%"}}/></TouchableWithoutFeedback>
        <Text caption style={{fontSize:18,fontFamily:"OpenSans-Bold",textAlign:"center",justifyContent:"center"}}>Driver Will contact you soon,Please Wait</Text>
        </Cardcar>:null}
{/*   {categories.map((category) => (         
          
        <Cardcar key={category.id} style={{flex:0.6, backgroundColor:"white", marginTop:"5%"}}>
        <Block row style={{borderBottomWidth:StyleSheet.hairlineWidth,borderColor:theme.colors.gray, marginHorizontal:"3%",paddingBottom:"1%"}} >
        <Image style={styles.avatar} source={category.image} />
       
          <Block row style={{justifyContent:"space-between", width:"75%",marginRight:"5%"}}> 
      
                     <Text gray h1>
                      @{category.username} 
                     </Text>
                     <Text gray h1>{category.Price}</Text>
           </Block> 
                   </Block>
   <View style={{marginTop:"2%"}}>
    <Text caption style={styles.text}>Pickup Location</Text>
         <TextInput style={styles.dest} placeholder="Enter pickup point" value={x}></TextInput>
         <Text caption style={styles.text}>Drop-off Location</Text>
         <TextInput style={styles.dest} placeholder= "Enter Drop off point" value={x} label="Drop Off" onChangeText={destination=>this.onChangeDestination(destination)}></TextInput>
        </View>  
        <Block row justifyContent="space-around">
        <Button style={{width: '25%', height: 50, backgroundColor: "green"}}onPress={()=> this.makeCall(category.contact)}>
        <Block flex={false} row style={{justifyContent:"center"}}>
        <Icon.Ionicons style={{marginRight:"8%"}} size={20} name="md-call" color="white"/>
        <Text h4 center style={{color:"white"}}>Call</Text>
        </Block>
        </Button>

        <Button style={{width: '38%', height: 50,backgroundColor:"blue"}} onPress={()=> {navigation.navigate("AddRide")}}>
        <Block flex={false} row style={{justifyContent:"center"}}>
        <Icon.FontAwesome5 style={{marginRight:"8%"}} size={20} name="car-side" color="white"/>
        <Text h4 center style={{color:"white"}}>Book Ride</Text>
        </Block>
        </Button>

        <Button style={{width: '28%', height: 50, backgroundColor: "green"}}onPress={()=> this.setState({ showTerms: true })}>
        <Block flex={false} row style={{justifyContent:"center"}}>
        <Icon.MaterialCommunityIcons style={{marginRight:"5%"}} size={20} name="message-text" color="white"/>
        <Text h4 center style={{color:"white"}}>View Details</Text>
        </Block>
        </Button>
        
      </Block>
      <TouchableOpacity onPress={() => this.setState({ showTerms: true })}>
      <Icon.SimpleLineIcons name="arrow-down" size={18} color="#9DA3B4" style={{marginHorizontal:"46%",marginBottom:0,padding:0,justifyContent:"center",textAlign:"center"}}/>
      </TouchableOpacity>
      
        </Cardcar>
))}*/}
    
     

       
   </View>
   
    );
  }
}
Rider1.defaultProps = {
  categories: mocks.categories
};
export default Rider1;

const styles = StyleSheet.create({
 
  container:{
    		flex:1,
    		
      },
      text:{marginLeft:"1%",marginTop:0,color:"gray"},
     
      categories: {
        flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base * 2,
        
      },
      tag: {
        borderColor: theme.colors.gray,
        paddingHorizontal: theme.sizes.base,
        marginRight: theme.sizes.base * 0.8,
        marginLeft: theme.sizes.base * 0.8,
        borderLeftWidth:0,
        borderRightWidth:0,
        marginBottom:0,backgroundColor:"gray",
        borderBottomWidth:StyleSheet.hairlineWidth,
        marginTop:"3%"
      },

      tag1:{
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor: theme.colors.gray,
        marginTop:"3%",
        justifyContent:"space-between",
        width:"95%",
        marginLeft:"2.5%",
        shadowColor:"white",
        elevation:0.1,
        shadowOffset:{width:0,height:2},
      },
      avatar:{
        height: theme.sizes.base * 2,
        width: theme.sizes.base * 2,
        borderRadius: theme.sizes.radius*10,
        backgroundColor:"#f5f5f5",
        justifyContent:"center",
        marginRight:"3%"
      },
         
      sp1:
      {
        marginLeft:"10%"
     },
      alt:{flexDirection:"row"},
      button:
      {width:"70%",
      backgroundColor:"white",
      },
      image:{
        width:"100%",
        height:"100%",
      
    },
    imageContainer:{
      //borderRadius:150,
      borderRadius:Dimensions.get('window').width*0.7/ 2,
      borderWidth:3,
      // width:300,
      // height:300,
      marginLeft:Dimensions.get('window').width*0.33,
      width:Dimensions.get('window').width*0.3,
      height:Dimensions.get('window').width*0.3, //FOR MAKING IT SQUARE
      borderColor:"black",
      overflow:"hidden",justifyContent:"center",
      marginVertical:Dimensions.get('window').height / 50
  
    },
      dest:{ backgroundColor:theme.colors.gray2,height:30,borderWidth:0.5, marginLeft:5,marginRight:5 ,marginBottom:5,
        borderRadius:15,marginTop:8, backgroundColor:"white" , width:"95%", padding:8, bottom:0, borderColor:"gray"}
});
