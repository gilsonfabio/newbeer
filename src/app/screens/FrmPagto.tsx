import React, { useState, useEffect} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useLocalSearchParams, router} from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import { api } from '@/server/api';

export default function FrmPagto(){
    const local = useLocalSearchParams();

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

    }, []);

    function handlePagtoPix() {
        router.push(`/screens/PagtoPix?id=${local.id}&vlrPagar=${carVlrPagar}` as any ); 
    }

    return(
        <View className="flex-1 items-center bg-black">
            <View className="flex-row items-center w-full h-20 bg-amber-500 px-2">
                <TouchableOpacity onPress={() => router.back()} className="">
                    <View>                      
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                <View className="flex-row items-center w-full ml-16">
                    <Text className="text-yellow-300 text-xl font-bold">Escolha Forma de Pagto</Text>
                </View>    
            </View>            
            <View className="flex-col items-center w-full mt-14">
                <TouchableOpacity onPress={handlePagtoPix} className='w-full h-20 '>
                    <View className="flex items-center justify-center bg-gray-600 w-96 h-48 rounded-md">
                        <Text className="text-black text-2xl font-bold mb-3">Pagamento por PIX</Text>
                    </View>
                </TouchableOpacity>
            </View>    
            <View className="flex-col items-center w-full mt-40">
                <TouchableOpacity className='w-full h-20 '>
                    <View className="flex items-center justify-center bg-yellow-400 w-96 h-48 rounded-md">
                        <Text className="text-black font-bold text-2xl">Pagamento no Cartão</Text>
                    </View>
                </TouchableOpacity>
            </View>     
        </View>
    )
}


/* 
    axios({
    method: 'post',    
    url: `http://localhost:3333/authorize`,
    data: {
      lanUsrId: usrId,  
      lanMovId: params.movId,
      lanEquId: equId,
      lanValor: vlrAposta,   
    }
}).then(function(response) {
    setState({base64File: response.data.imagemQrcode});
    console.log(state)
}).catch(function(error) {
    console.log(error)
}) 

*/
