import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link, useLocalSearchParams } from 'expo-router';

import {api} from '@/server/api';
import MosLinhas from './MosLinhas';

type Nav = {
    navigate: (value: string) => void;
}

type GruposProps = {
  grpId: string;
  grpDescricao: string;
}

type linhasProps = {
  lnhId: string;
  lnhDescricao: string;
  lnhUrlIcon: string;
}

const ListLinhas = ({ data }:any) => {
  const navigation = useNavigation<GruposProps>();
  
  const [linhas, setLinhas] = useState<Array<linhasProps>>([]);
  const { idUsr, name, title } = useLocalSearchParams()
  
  useEffect(() => {
     
    let idGrp = data.grpId;
     
    api({
      method: 'get',    
      url: `linhas/${idGrp}`,                 
    }).then(function(response) {
      setLinhas(response.data)
    }).catch(function(error) {
      alert(`Falha no acesso as categorias! Tente novamente.`);
    })
  }, []);

  return(
    <View className="flex flex-col bg-slate-900 ">
      <Text className='p-1 ml-2 text-yellow-500 text-[10px]'>{data.grpDescricao}</Text>
      <FlatList
        data={linhas}
        className='w-full h-24 ml-1 mb-0'
        horizontal={true}
        renderItem={({ item }) => <MosLinhas data={item} />}
        keyExtractor={(item) => item.lnhId}
      />     
    </View>
  )
}
  
export default ListLinhas;