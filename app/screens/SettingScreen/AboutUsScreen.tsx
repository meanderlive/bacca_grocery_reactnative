import React from 'react';
import {ScrollView} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { SmallText} from '../../components/MyText';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';

const AboutUsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="About Us" onBack={navigation.goBack}>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 15,
        }}>
        <SmallText style={{marginTop: 25}}>
          Egestas nunc neque sed lobortis tellus, sociis justo felis. Id amet
          orci auctor diam dolor et metus. Fringilla nulla mauris fermentum,
          nisl diam diam. Urna maecenas id non enim massa id quis magna.
          Vulputate sapien elit habitasse elementum nibh aliquam sed. Nisi
          aliquet mus commodo interdum nisi, faucibus. Aliquet lectus ipsum
          massa viverra urna egestas.
        </SmallText>
        <SmallText style={{marginVertical: 10}}>
          Libero vulputate porta nisl tortor vitae. Proin pellentesque
          parturient ac euismod tortor malesuada pellentesque. Turpis leo
          blandit tristique eu phasellus viverra. Faucibus neque, urna nunc quis
          id. In luctus sagittis vitae aliquet. Felis dolor in sit arcu ut enim
          dis. Nibh molestie cursus euismod lacus leo, arcu magna enim blandit.
        </SmallText>
        <SmallText>
          At adipiscing bibendum ultricies vitae at scelerisque dui turpis et.
          Aliquam lorem dui aliquet leo sed mauris, amet, at. At volutpat vel
          eget leo. Integer rhoncus odio massa arcu condimentum. Ac laoreet id
          malesuada vel metus egestas lacinia.
        </SmallText>
      </ScrollView>
    </MainLayout>
  );
};

export default AboutUsScreen;
