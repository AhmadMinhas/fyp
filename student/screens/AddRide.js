import StarRating from 'react-native-star-rating';
 import React ,{Component} from 'react'
 import {View,Image,StyleSheet,Alert} from 'react-native'
import { Block,Text,Button } from '../components';
import {theme} from '../constants'
import * as Icon from "@expo/vector-icons";
import navigation from '../navigation';


 //........................................................//

 class CustomStarExample extends Component {
 
    constructor(props) {
      super(props);
      this.state = {
        starCount: 0
      };
    }
   
    onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
    }

    
   
    render() {
 

      return (
        <View style={{flex:1,width:"100%",marginTop:"5%"}}>
        <Block>
        <Text  style={{textAlign:"center",fontFamily:"alpha_echo",fontSize:30}}>Trip Completed</Text>
       <View style={{alignItems:"center",width:"100%",marginVertical:"5%"}}><Icon.MaterialIcons
        name='done'
        color="white" onPress={this.onButtonPress}
        size={35}
        style={{width:"10%",borderWidth:1,borderRadius:350,backgroundColor:"#6cd979",borderColor:"white"}}
      />
      </View> 
        <Text h1 style={{textAlign:"center"}}>Thanks for the payment</Text>
        <View style={{alignItems:"center",width:"100%",marginVertical:"5%"}}>
        <Text h1 blue>Rs 150</Text>
        </View>
      
        <View style={{alignItems:"center",marginVertical:"5%"}}>
        <Image style={styles.avatar} source={require("../assets/images/pro.png")} />
        </View>
        <View style={{alignItems:"center",width:"100%",marginVertical:"5%"}}>
        <Text h1 blue semibold>Person Name</Text>
        </View>
        <View style={{ marginLeft:"26%",width:"50%"}}>
        <StarRating
          disabled={false}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          starSize={35}
          
          rating={this.state.starCount}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
          fullStarColor={'#FFD700'}
        /></View>

        <View style={{marginVertical:"10%" }}>
        <Text h1 blue center semibold>Have a good Day Rider's name! </Text>
        </View>
        <View style={{width:"100%", alignItems:"center"}}>
        <Button style={{ height: 50, backgroundColor: "green",paddingHorizontal:"5%"}}onPress={()=>{Alert.alert('','Your response has been submited. Thanks.',
        [
          {
            text: "OK",
            onPress: () =>{this.props.navigation.navigate('Home')}
             
          }
          
        ],)}}>
        <Block flex={false} row style={{justifyContent:"space-around"}}>
        <Icon.AntDesign
        name='doubleright'
        color="white" onPress={this.onButtonPress}
        size={24}/>
        <Text h2 style={{marginLeft:"2%",color:"white"}}>Submit Feedback</Text>
        </Block>
        </Button>
        </View>
        </Block>
        </View>
      );
    }
  }
   
  export default CustomStarExample

  const styles=StyleSheet.create({
    avatar:{
        height: theme.sizes.base * 6,
        width: theme.sizes.base * 6,
        borderRadius: theme.sizes.radius*10,
        backgroundColor:"#f5f5f5",
        justifyContent:"center",
       

    }
  })