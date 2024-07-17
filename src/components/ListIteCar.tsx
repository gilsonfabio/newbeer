import React, { useState, useEffect} from 'react';
import { TouchableOpacity, View, Text, Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { api } from '@/server/api';

export interface ProductsProps {
  itePedId: number;
  itePedItem: string;
  itePedProId: number;
  itePedQtde: number;
  itePedVlrUnit: number;
  itePedVlrTotal: number;
}

const width = Dimensions.get('window').width - 5; 

const ListIteCar = ({ data }:any) => {

  const [countItens, setCountItens] = useState(0);

  const onPressAdd = () => {    
    let qtdProd = 1;
    api.post('adiprocar', {   
      itePedId: data.itePedId,
      itePedItem: data.itePedItem,
      itePedProId: data.itePedProId,
      itePedQtde: data.itePedQtde,
      itePedVlrUnit: data.itePedVlrUnit,
      itePedVlrTotal: data.itePedVlrTotal,
    }).then(() => {
        alert('Produto adicionado com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })  
    
  }

  const onPressSub = () => {    
    let qtdProd = 1;
    api.post('subprocar', {      
      itePedId: data.itePedId,
      itePedItem: data.itePedItem,
      itePedProId: data.itePedProId,
      itePedQtde: data.itePedQtde,
      itePedVlrUnit: data.itePedVlrUnit,
      itePedVlrTotal: data.itePedVlrTotal,
    }).then(() => {
        alert('Produto subtraido com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })  
  }

  return (
    <View className='flex-col items-center justify-center w-[96%] h-20 mt-2 bg-slate-300 rounded-md'>
      <View className='flex-row w-full items-center justify-between'>
        <Text className='w-[60%] ml-2 font-semibold'>{data.prdDescricao}</Text>
        <Text className='w-[10%]'>{data.itePedQtde}</Text>
        <Text className='w-[16%] mr-2'>R$ {data.itePedVlrTotal}</Text>
        <View className='flex items-center justify-center w-[10%] h-10 bg-green-500 mr-1 rounded-r-md'>
          <TouchableOpacity onPress={onPressAdd}>  
            <AntDesign name="pluscircleo" size={24} color='white' />
          </TouchableOpacity>
        </View>   
      </View>  
      <View className='flex-row w-full items-center justify-between'>  
        <Text className='w-[86%] ml-2 mr-2'>{data.prdReferencia}</Text>
        <View className='flex items-center justify-center w-[10%] h-10 bg-red-500 mr-1 rounded-r-md'>
          <TouchableOpacity onPress={onPressSub}>  
            <AntDesign name="minuscircleo" size={24} color='white' />
          </TouchableOpacity>
        </View>   
      </View>
    </View>  
  );
};

export default ListIteCar;
