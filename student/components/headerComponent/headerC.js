
import {FontAwesome, AntDesign} from "@expo/vector-icons"
import React from "react";
import { Text, Image } from "react-native";
import { Header, Left, Body, Right, Button} from "native-base";

import styles from "./HeaderComponentStyles";

export const HeaderComponent =  ()=>{
	return (
		<Header style={{backgroundColor:"#455a64"}}  AandroidStatusBarColor="#455a64">
			<Left>
				<Button transparent>
					<FontAwesome name="bars" style={styles.icon} />
				</Button>
			</Left>
			<Body>
					<Text style={styles.headerText}>Taxi </Text>
				
			</Body>

			<Right>
				<Button transparent>
					<FontAwesome name="gift" style={styles.icon} />
				</Button>
			</Right>
		</Header>
	);
}

export default HeaderComponent;