import React,{Component} from 'react'
import {View,Text,StyleSheet,FlatList,TextInput,ScrollView,Linking,Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { theme, mocks } from "../constants";
class Destination extends Component {

    constructor (props) {
        super (props);
        this.state = {
            text:'',
       destinations : [
        {
          name: "Bahria Town, Lahore",
          longitude:"74.1768",
          latitude:"31.3695"
        },
        {
          name: "EME DHA Society",
          longitude:"74.2106",
          latitude:"31.4392"
        },
        {
          name: "PASCO Housing Society",
          longitude:"74.2216",
          latitude:"31.4538"
        },
        {
          name: "Eden Canal Villas",
          longitude:"74.2304",
          latitude:"31.4591"
        },
        {
          name: "Thokar Niaz Baig",
          longitude:"74.2385",
          latitude:"31.4914"
        },
        {
          name: "Awan Town",
          longitude:"74.2634",
          latitude:"31.5070"
        },
        {
          name: "Allama Iqbal Town",
          longitude:"74.2845",
          latitude:"31.5124"
        },
        {
          name: "Sabzazar",
          longitude:"74.2701",
          latitude:"31.5209"
        },
        {
          name: "Icchra",
          longitude:"74.3183",
          latitude:"31.5313"
        },
        {
          name: "Wahdat Colony",
          longitude:"74.3074",
          latitude:"31.5153"
        },
        {
          name: "Gulshan E Ravi",
          longitude:"74.2796",
          latitude:31.5522
        },
        {
          name: "Riwaz Garden",
          longitude:"74.3038",
          latitude:"31.5601"
        },
        {
          name: "Band Road",
          longitude:"74.2988",
          latitude:"31.5336"
        },
        {
          name: "Islam Pura",
          longitude:"74.2986",
          latitude:"31.5643"
        },
        {
          name: "Bilal Gang",
          longitude:"74.3012",
          latitude:"31.5803"
        },
        {
          name: "Johar Town",
          longitude:"74.2728",
          latitude:"31.4697"
        },
        {
            name: "Karim Park",
            longitude:"74.2986",
            latitude:"31.5894"
          },
          {
            name: "Data Nagar",
            longitude:"74.3221",
            latitude:"31.5979"
          },
          {
            name: "Shad Bagh",
            longitude:"74.3397",
            latitude:"31.6001"
          },
          {
            name: "Wapda Town",
            longitude:"74.2644",
            latitude:"31.4312"
          },
          {
            name: "Harbanspura",
            longitude:"74.4262",
            latitude:"31.5761"
          },
          {
            name: "Mughal Pura",
            longitude:"74.3586",
            latitude:"31.5690"
          },
          {
            name: "Fortress Stadium",
            longitude:"74.3667",
            latitude:"31.5315"
          }
          

      ],
      
      hasFocusa: true,
      destinations1 :  [
        {
          name: "Bahria Town, Lahore",
          longitude:"74.1768",
          latitude:"31.3695"
        },
        {
          name: "EME DHA Society",
          longitude:"74.2106",
          latitude:"31.4392"
        },
        {
          name: "PASCO Housing Society",
          longitude:"74.2216",
          latitude:"31.4538"
        },
        {
          name: "Eden Canal Villas",
          longitude:"74.2304",
          latitude:"31.4591"
        },
        {
          name: "Thokar Niaz Baig",
          longitude:"74.2385",
          latitude:"31.4914"
        },
        {
          name: "Awan Town",
          longitude:"74.2634",
          latitude:"31.5070"
        },
        {
          name: "Allama Iqbal Town",
          longitude:"74.2845",
          latitude:"31.5124"
        },
        {
          name: "Sabzazar",
          longitude:"74.2701",
          latitude:"31.5209"
        },
        {
          name: "Icchra",
          longitude:"74.3183",
          latitude:"31.5313"
        },
        {
          name: "Wahdat Colony",
          longitude:"74.3074",
          latitude:"31.5153"
        },
        {
          name: "Gulshan E Ravi",
          longitude:"74.2796",
          latitude:31.5522
        },
        {
          name: "Riwaz Garden",
          longitude:"74.3038",
          latitude:"31.5601"
        },
        {
          name: "Band Road",
          longitude:"74.2988",
          latitude:"31.5336"
        },
        {
          name: "Islam Pura",
          longitude:"74.2986",
          latitude:"31.5643"
        },
        {
          name: "Bilal Gang",
          longitude:"74.3012",
          latitude:"31.5803"
        },
        {
          name: "Johar Town",
          longitude:"74.2728",
          latitude:"31.4697"
        },
        {
            name: "Karim Park",
            longitude:"74.2986",
            latitude:"31.5894"
          },
          {
            name: "Data Nagar",
            longitude:"74.3221",
            latitude:"31.5979"
          },
          {
            name: "Shad Bagh",
            longitude:"74.3397",
            latitude:"31.6001"
          },
          {
            name: "Wapda Town",
            longitude:"74.2644",
            latitude:"31.4312"
          },
          {
            name: "Harbanspura",
            longitude:"74.4262",
            latitude:"31.5761"
          },
          {
            name: "Mughal Pura",
            longitude:"74.3586",
            latitude:"31.5690"
          },
          {
            name: "Fortress Stadium",
            longitude:"74.3667",
            latitude:"31.5315"
          }
          

      ],
      long:"",
      lat:"",
      item:{}
    };
    this.arrayholder = [];
  }
  setFocus3 = () => {
    this.setState ({hasFocusa: !this.state.hasFocusa});
  };

    componentDidMount() {
      console.log(this.state.destinations,"hmmmm")
      this.arrayholder=this.state.destinations
    }
         
    filterSearch (text) {
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.name.toUpperCase ()}`;
          const textData = text.toUpperCase ();
          return itemData.indexOf (textData) > -1;
        });
    
        this.setState ({
          destinations: newData,
          text: text,
        });
        if (text === '') {
          this.setState ({destinations: this.state.destinations1});
        }
      }
      done=(item)=>{
          this.setState({text:item.name, long:item.longitude,lat:item.latitude})
          this.props.navigation.navigate('Carpooling',{lat:item.latitude,long:item.longitude,locName:item.name})
          console.log(item)
      }
    render(){
 
return(
    <View style={styles.innerContainer}>
  
   <View style={{flexDirection:"row",borderRadius:20,borderWidth:StyleSheet.hairlineWidth,paddingVertical:"1%",alignItems:"center"}}>
   <View style={{justifyContent: 'center',}}>
     <Image
       style={{height: 15, resizeMode: 'contain', width: 58}}
       source={require ('../assets/search3.png')}
     />
   </View>
   <View style={{width: '85%'}}>
     <TextInput
       onChangeText={text => this.filterSearch (text)}
       value={this.state.text}
       placeholder="Search"
       onFocus={this.setFocus3}
       onBlur={() => {
         this.setState ({hasFocusa: !this.state.hasFocusa});
       }}
       style={{
         padding: 0,
         paddingHorizontal: 1,
        justifyContent:"center",
         fontSize: 17,
         fontFamily: 'OpenSans-Bold',
       }}
     />
   </View>
 </View>
  
   
   <FlatList
   data={this.state.destinations}
   renderItem={({item, index}) => (
       <TouchableOpacity
       onPress={()=>{this.done(item)}} 
       style={{borderBottomWidth:StyleSheet.hairlineWidth,
        padding:"2%"}}>
        <Text style={{fontSize:20,fontFamily:"OpenSans-Bold",color:"gray"}}>{item.name}</Text></TouchableOpacity>
   )}
   keyExtractor={index=>index}
   /> 
   </View>
)
}
}

export default Destination
const styles=StyleSheet.create({
    touch2: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#049CEB',
        borderWidth: 1,
        borderRadius: 45,
        paddingHorizontal: 0,
        paddingVertical: '2%',
        marginBottom: '3%',
        marginHorizontal: '1%',
      
      },
      innerContainer: {
        marginHorizontal: "2%",
        marginVertical: "3%",
       flex:1,
        backgroundColor: '#FFFFFF',
      },
      card: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        marginHorizontal: '1%',
        borderRadius: 45,
        paddingVertical: '2%',
        marginBottom: '3%',
      
      },   
})