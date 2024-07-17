import React, { useState, useEffect} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useLocalSearchParams, router} from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import { api } from '@/server/api';

type enderecosProps = {
    endId: number;
    endCliId: number;
    endLogradouro: string;
    endNumero: string;
    endComplemento: string;
    endBairro: string;
    endCidade: string;
    endEstado: string;
    endCep: number;
    endLatitude: number;
    endLongitude: number;
    endLatitudeDelta: number;
    endLongitudeDelta: number;
    endStatus: string;
    cliNome: string;
    cliEmail: string; 
    cliCelular: string;
    baiDescricao: string;
    cidDescricao: string;
}

export default function EscEntrega(){
    const [usuario, setUsuario] = useState<Array<enderecosProps>>([]);
    const local = useLocalSearchParams();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');

    useEffect(() => {
    
        let idUsr = local.idUsr;
        api({
            method: 'get',    
            url: `busAddress/${idUsr}`,                 
        }).then(function(response) {
            setUsuario(response.data)      
            setNome(response.data[0].cliNome)
            setEmail(response.data[0].cliEmail)
            setCelular(response.data[0].cliCelular)
            setLogradouro(response.data[0].endLogradouro)
            setNumero(response.data[0].endNumero)
            setComplemento(response.data[0].endComplemento)
            setBairro(response.data[0].baiDescricao)
            setCidade(response.data[0].cidDescricao)                                            
        }).catch(function(error) {
            alert(`Falha no acesso ao usuário! Tente novamente.`);
        })       
                                  
    }, []);

    function handleLocalizacao() {
        router.push(`/screens/FrmPagto?id=${local.id}` as any ); 
    }

    function handleNewLocalizacao() {
        router.push(`/screens/NewAddress?id=${local.id}` as any ); 
    }

    return(
        <View className="flex-1 items-center bg-slate-800">
            <View className="flex-row items-center w-full h-20 bg-amber-500 px-2">
                <TouchableOpacity onPress={() => router.back()} className="">
                    <View>                      
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                <View className="flex-row items-center w-full ml-32">
                    <Text className="text-black text-xl font-semibold ">Escolha Entrega</Text>
                </View>    
            </View>        
            <View className="flex w-full items-center justify-center mt-8 mb-8">
                <Text className="text-xl text-yellow-400 font-semibold ">Escolha endereço para entrega</Text>
            </View>    
            <View className="flex-col items-center w-full mt-4 ">
                <TouchableOpacity onPress={handleLocalizacao} >
                    <View className="flex items-center justify-center bg-gray-300 w-96 h-48 rounded-md">
                        <Text className="text-black text-xl font-bold mb-3">Seu último endereço</Text>
                        <Text className="text-black text-xl font-bold">{logradouro}</Text>
                        <Text className="text-black text-xl font-bold">{numero}</Text>
                        <Text className="text-black text-xl font-bold">{complemento}</Text>
                        <Text className="text-black text-xl font-bold">{bairro}</Text>
                        <Text className="text-black text-xl font-bold">{cidade}</Text>
                    </View>
                </TouchableOpacity>
            </View>    
            <View className="flex-col items-center w-full mt-40">
                <TouchableOpacity onPress={handleNewLocalizacao} className='w-full h-20 '>
                    <View className="flex items-center justify-center bg-amber-500 w-96 h-48 rounded-md">
                        <Text className="text-white font-bold text-2xl">Nova Localização</Text>
                    </View>
                </TouchableOpacity>
            </View>     
        </View>
    )
}

