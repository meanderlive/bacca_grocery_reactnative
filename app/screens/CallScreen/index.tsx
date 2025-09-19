import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import MainLayout from "../../components/MainLayout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles";
import { MediumText, TitleText } from "../../components/MyText";
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'

const CallScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [mute, setMute] = useState(false);
    const [speakerOn, setSpeakerOn] = useState(false);

    return (
        <MainLayout onBack={navigation.goBack}>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'flex-end',}}>
                    <View
                        style={{
                            width: 150,
                            height: 150,
                            backgroundColor: COLORS.white,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center', borderWidth: 2, borderColor: 'black'
                        }}>
                        <Image style={{ width: '100%', height: '100%' }}
                            source={require('../../../assets/images/DeliveryBoyImg.png')}
                        />
                    </View>
                </View>

                <MediumText style={{ alignSelf: 'center', marginTop:20 }}>MSPL Store</MediumText>
                <TitleText style={{ color: 'gray', alignSelf: 'center' }}>02:02</TitleText>

                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center',marginTop:100 }}>
                    <TouchableOpacity onPress={()=>setSpeakerOn(!speakerOn)}
                      style={[styles.icons,{backgroundColor:speakerOn ? COLORS.primary : 'white'}]}>
                        <Feather name="volume-2" size={34} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={[styles.icons, { backgroundColor: COLORS.primary }]}>
                        <Entypo name="cross" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>setMute(!mute)}
                    style={[styles.icons,{backgroundColor:mute ? COLORS.primary : 'white'}]}>
                        <Feather name="mic-off" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </MainLayout>
    )
}

export default CallScreen;

const styles = StyleSheet.create(
    {
        icons: {
            height: 65,
            width: 65,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: 'black', alignItems: 'center', justifyContent: 'center'

        }
    }
)