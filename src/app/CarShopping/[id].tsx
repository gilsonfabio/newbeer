import React from 'react';
import { useState, useEffect } from 'react';
import Moment from 'moment';
import { Link, useLocalSearchParams, router} from 'expo-router';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import ListIteCar from '../../components/ListIteCar';
import { AntDesign } from '@expo/vector-icons';

import { api } from '@/server/api';

export interface CarProps {
  pedId: number;
  pedData: string;
  pedCliId: number;
  pedQtdTotal: number;
  pedVlrTotal: number;
  pedCupom: number;
  pedVlrPagar: number;
  pedStatus: number;
  cliNome: string;
}

export interface ProductsProps {
  itePedId: number;
  itePedItem: string;
  itePedProId: string;
  itePedQtde: number;
  itePedVlrUnit: number;
  itePedVlrTotal: number;
  proDescricao: string;
  proReferencia: string;
  proUrlPhoto: string;
}

export interface numberCarProps {
  carId: number;
}

const CarShopping = () => {
  const local = useLocalSearchParams();

  const [car, setCar] = useState<Array<CarProps>>([]); 
  const [items, setItems] = useState<Array<ProductsProps>>([]); 
  const [atualiza, setAtualiza] = useState(0);

  const [idCar, setIdCar] = useState(0);
  const [carData, setCarData] = useState('');
  const [carHora, setCarHora] = useState('');
  const [carUser, setCarUser] = useState(0);
  const [carQtdTotal, setCarQtdTotal] = useState(0);
  const [carVlrTotal, setCarVlrTotal] = useState(0);
  const [carDesTotal, setCarDesTotal] = useState(0);
  const [carCodCupom, setCarCodCupom] = useState(0);
  const [carVlrPagar, setCarVlrPagar] = useState(0);
  const [carStatus, setCarStatus] = useState('');
  const [usrNome, setUsrNome] = useState('');

  let desTitle = 'Produtos';

  useEffect(() => {
    let carId = local.id;
    api.get(`headerCar/${carId}`).then(response => { 
        setIdCar(response.data.pedId);
        setCarData(response.data.pedData);
        setCarUser(response.data.pedCliId);
        setCarQtdTotal(response.data.pedQtdTotal);
        setCarVlrTotal(response.data.pedVlrTotal);
        setCarCodCupom(response.data.pedCupom);
        setCarVlrPagar(response.data.pedVlrPagar);
        setCarStatus(response.data.pedStatus);
        setUsrNome(response.data.cliNome);
    })
    api.get(`itemscar/${carId}`).then(resp => { 
      setItems(resp.data);
    })  
  }, []);

  function handleProdutos() {
    console.log(carUser, ' - ', usrNome, ' - ', desTitle )
    router.push(`/screens/Produtos?idUsr=${carUser}&name=${usrNome}&title=${desTitle}` as any );            
  }

  function handleEntrega() {
    router.push(`/screens/EscEntrega?id=${local.id}&idUsr=${carUser}` as any );              
  }

  return (
    <View className='flex-1 w-full items-center bg-slate-800'>
      <View className="flex-row items-center w-full h-20 bg-amber-500 px-2">
        <TouchableOpacity onPress={() => router.back()} className="">
          <View>                      
            <AntDesign name="arrowleft" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <View className="flex-row items-center w-full ml-32">
          <Text className='text-back font-semibold'>Lista de Compras: {local.id}</Text>
        </View>    
      </View> 
      <View className='flex-row w-[96%] h-20 bg-slate-400 items-center justify-between mt-3 rounded-md'>
        <Text className='ml-2 text-white text-xl font-semibold'>Nro Pedido: {idCar}</Text>
        <Text className='mr-2 text-white text-xl font-semibold'>Data: {Moment(carData).format('DD-MM-YYYY')}</Text>
      </View>    
      <View className='flex-col w-[96%] h-10 mt-3'>
        <Text className='ml-2 text-yellow-400 text-xl font-semibold'>Itens do Pedido:</Text>
      </View>  
      <FlatList
        data={items}
        numColumns={1}
        keyExtractor={(item) => item.itePedProId}
        renderItem={({ item }) => <ListIteCar data={item} />}
      />
      <View>
        <Text className='flex items-center text-red-500 text-xl font-bold'>Valor total do pedido...{Intl.NumberFormat('en-US', {style: 'currency', currency: 'BRL'}).format(carVlrTotal)}</Text>
      </View>
      <View className='flex-row w-full px-2 gap-2 justify-between '>
        <View className='flex-row items-center justify-center w-[40%] h-14 bg-green-500 rounded-lg '>
          <TouchableOpacity  onPress={handleProdutos} >
            <Text className='text-black font-semibold'>Retornar aos Produtos</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center justify-center w-[40%] h-14 bg-yellow-500 rounded-lg '>
          <TouchableOpacity  onPress={handleEntrega} >
            <Text className='text-black font-semibold'>Finaliza Compra</Text>
          </TouchableOpacity>
        </View>
      </View>  
      <StatusBar style="light" />
    </View>
  );
};


export default CarShopping;