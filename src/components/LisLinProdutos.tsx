import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = {
    navigate: (value: string) => void;
}

type paramsProps = {
  idUsr: string;
  name: string;
  title: string;
}

type produtoProps = {
  prdId: string;
  prdDescricao: string;
  prdReferencia: string;
  prdGrupo: number;
  prdLinha: number;
  prdCstUnitario: number;
  prdVdaUnitario: number;
  prdQtdEstoque: number;
  prdDscPermitido: number;
  prdStatus: string;
  prdUrlPhoto: string;
}

const LisLinProdutos = ({ data }:any) => {
  const navigation = useNavigation<produtoProps>();
  
  const { idUsr, name, title } = useLocalSearchParams<paramsProps>();

  return (
    <SafeAreaView >     
      <Link href={{pathname: "/Prodetalhes/[id]", params: { id: data.prdId, idUsr, name, title}}} asChild>
        <TouchableOpacity>
          <View className='flex-row w-full px-2 items-center'>
            <View className='flex-row w-full h-28 rounded-md shadow-lg border bg-white border-amber-500'>
              <View className='flex-col w-20 h-28 items-center ml-3'>
                <Image source={{uri: `https://thumbs2.imgbox.com/${data.prdUrlPhoto}`}} resizeMode="contain" width={80} height={100}/>
              </View>
              <View className='flex-col w-full ml-3'>
                <Text className='ml-1 text-slate-900 text-md font-semibold'>{data.prdDescricao}</Text>
                <Text className='ml-1 text-slate-900 text-xs font-normal'>{data.prdReferencia}</Text>
                <View className='flex-row w-full mt-4'>
                  <Text className='mt-3 ml-1 mr-2 text-slate-900 text-xl font-bold'>R$ {data.prdVdaUnitario.toFixed(2)}</Text>
                  <Text className='mt-5 text-slate-900 text-xs font-bold'>/cada</Text>
                </View>  
              </View>
            </View>
          </View>     
        </TouchableOpacity>
      </Link>  
    </SafeAreaView>
  );
};
  
export default LisLinProdutos;