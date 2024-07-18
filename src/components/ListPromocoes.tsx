import React from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions, Pressable} from 'react-native';
import {Link, router, useLocalSearchParams } from "expo-router";

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

type promocoesProps = {
  idItePrm: string;
  itePrmId: string; 
  itePrmSeq: number; 
  itePrmProId: number; 
  itePrmPreVenda: number; 
  itePrmPrePromocao: number;
  prmDescricao: string; 
  prmInicio: string; 
  prmFinal: string;
  prmStatus: string; 
  prdDescricao: string; 
  prdReferencia: string;
  prdUrlPhoto: string;
}

type paramsProps = {
  idUsr: string;
  name: string;
  title: string;
}

const ListPromocoes = ({ data }:any) => {
  
  function handleDetalhes(){
    setTimeout(() => {
      handleGetToken()
    }, 1000)        
  }

  const { idUsr, name, title } = useLocalSearchParams<paramsProps>();
  
  const handleGetToken = async () => {
    //const token = await AsyncStorage.getItem('auth.token');
    
    //if (!token) {
    //    navigation.navigate('SignIn')
    //}else {
    //    navigation.navigate(data.srvLink)
    //}        
  }

  return (
    <Link href={{pathname: "/Prodetalhes/[id]", params: { id: data.itePrmProId, idUsr, name, title}}} asChild>
    <TouchableOpacity>
      <View className='flex-col w-full h-80 mt-3 mr-3 items-center justify-center'>
        <View className='flex w-52 h-72 rounded-md mt-2 ml-1 mb-5 shadow-lg border-4 bg-white border-gray-300'>
          <Image source={{uri: `https://thumbs2.imgbox.com/${data.prdUrlPhoto}`}} resizeMode="contain" className='ml-3 mt-1 w-40 h-40' />
          <View className='w-full h-8'>
            <Text className='mt-2 ml-1 text-yellow-900 text-md font-semibold'>{data.prdDescricao}</Text>
          </View>
          <View className='w-full h-11'>
            <Text className='mt-1 ml-1 text-yellow-900 text-xs font-normal'>{data.prdReferencia}</Text>
          </View>
          <View className='flex flex-row w-full h-10 bg-red-800 items-center'>
            <Text className='mt-1 ml-1 mr-2 text-white text-xl font-bold'>R$ {data.itePrmPrePromocao.toFixed(2)}</Text>
            <Text className='mt-3 text-white text-xs font-bold'>/cada</Text>
          </View>
        </View>             
      </View>  
    </TouchableOpacity>
    </Link>
  );
};
  
export default ListPromocoes;

//<a href="https://imgbox.com/sQ3RNM2d" target="_blank"><img src="https://thumbs2.imgbox.com/48/f9/sQ3RNM2d_t.jpg" alt="image host"/></a>
//https://thumbs2.imgbox.com/46/1a/cUX7JcEE_t.jpg