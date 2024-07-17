import React, { useState, useEffect} from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useLocalSearchParams, router} from 'expo-router';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

import { api } from '@/server/api';

type imgProps = {
    "base64File": string;
}

export default function PagtoPix(){
    const local = useLocalSearchParams();
    const [state, setState] = useState<imgProps>() as any;

    const [imgBase64, setImgBase64] = useState('*');
    const [linkQRCode, setLinkQRCode] = useState('');
    const [txid, setTxid] = useState('');

    useEffect(() => {
        axios({
            method: 'post',    
            url: `http://10.111.135.208:3333/authorize`,
            data: {
              lanUsrId: local.idUsr,  
              lanMovId: local.id,
              lanEquId: 1,
              lanValor: local.vlrPagar,   
            }
        }).then(function(response) {
            //setState({base64File: 'data:image/png;base64' + response.data.imagemQrcode});
            console.log(response.data)
            setImgBase64(response.data.imagemQrcode)
            setLinkQRCode(response.data.qrcode)
        }).catch(function(error) {
            console.log(error)
        })                                
    }, []);

    function handleConfirma() {
        api.post('cnfPedido', {      
            idPed: local.id 
        }).then(() => {
            alert('Pedido realizado com sucesso! Aguardando confirmação de pagamento.');
            router.push(`/screens/Produtos?idUsr=${local.id}&name=${local.name}&title=${local.title}` as any ); 
        }).catch(() => {
            alert('Erro no cadastro!');
        })  
    }

    return(
        <View className="flex-1 items-center bg-black">
            <View className="flex-row items-center w-full h-20 bg-amber-500 px-2">
                <TouchableOpacity onPress={() => router.back()} className="">
                    <View>                      
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                <View className="flex-row items-center w-full ml-32">
                    <Text className="text-yellow-300 text-xl font-bold">Forma de Pagto Pix</Text>
                </View>    
            </View>
            <View className="flex-row items-center w-full mt-3">
                <Text className="text-yellow-300 text-2xl font-bold">Valor da Compra: {local.vlrPagar}</Text>
            </View>             
            <View className="flex-col items-center justify-center w-full mt-16 ">
                <Image style={{width: 250, height: 250}} source={{uri: imgBase64 }} />
            </View> 
            <View className="flex-col items-center justify-center w-full mt-28">
                <Text className="text-md text-yellow-400 font-semibold mt-2 mb-2" >Copia e Cola:</Text>
                <Text className="flex items-center text-white text-sm w-full h-36">{linkQRCode}</Text>
            </View> 
            <View className='flex-row items-center justify-center w-[70%] h-14 bg-yellow-500 rounded-lg '>
                <TouchableOpacity  onPress={handleConfirma} >
                    <Text className='text-black font-semibold'>Confirma Compra</Text>
                </TouchableOpacity>
            </View>    
        </View>
    )
}


/* 
    source={this.props.url ? { uri: this.props.imgLink } : null}/>
    
    <img src={`${state.base64File}`} />

*/