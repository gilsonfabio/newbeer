import React from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link, useLocalSearchParams } from 'expo-router';

type Nav = {
    navigate: (value: string) => void;
}

type linhasProps = {
  lnhId: number;
  lnhDescricao: string;
  lnhUrlIcon: string;
}

const MosLinhas = ({ data }:any) => {
  const navigation = useNavigation<linhasProps>();
  
  const { idUsr, name, title } = useLocalSearchParams();

  const handleProLinha = async () => {
    //const token = await AsyncStorage.getItem('auth.token');
    
    //if (!token) {
    //    navigation.navigate('SignIn')
    //}else {
    //    navigation.navigate(data.srvLink)
    //}        
  }
  
  return (
    <>
      <Link href={{pathname: "/LinProdutos/[id]", params: { idUsr, name, title, id: data.lnhId}}} asChild>
        <TouchableOpacity>
          <View className=''>
            <View className='flex items-center w-24 h-20 rounded-lg mt-0 ml-1 border border-amber-700 bg-amber-50'>
              <Image source={{uri: `https://thumbs2.imgbox.com/${data.lnhUrlIcon}`}} resizeMode="contain" className='mt-2 w-12 h-12' />
              <Text className='mt-2 text-amber-700 text-[10px] font-semibold'>{data.lnhDescricao}</Text>
            </View>             
          </View>  
        </TouchableOpacity>
      </Link>  
    </>
  );
};
  
export default MosLinhas;