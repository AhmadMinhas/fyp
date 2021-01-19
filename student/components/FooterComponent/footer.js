import React from "react";
import { Text } from "react-native";
import { Footer, FooterTab, Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./footerStyle";


export const FooterComponent =  ()=>{

	//tab bar items
	const tabs = [{
		title:"TaxiCar",
		subTitle:"",
		icon:"car"
		
	},
{
		title:"Home",
		subTitle:"",
		icon:"home"
	}];

	return (
		<Footer>
			<FooterTab style={styles.footerContainer} >

				{
					tabs.map((obj, index)=>{
						return (
							<Button key={index}>
								<Icon size={20} name={obj.icon} color={(index === 0) ? "#455a94" : "grey"} />
								<Text style={{fontSize:12, color:(index === 0) ? "#455a94" : "grey"}}>{obj.title}</Text>
								<Text style={styles.subText}>{obj.subTitle}</Text>
							</Button>

						)
					})
				}

			</FooterTab>
		</Footer>
	);
}

export default FooterComponent;