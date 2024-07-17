import React, { useState} from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native"
import { useLocalSearchParams, router } from "expo-router";
import { isAxiosError } from "axios"
import { api } from '@/server/api'
import { Link } from "expo-router";

export default function NewAddress(){
    const [endCliId, setEndCliId] = useState('');
    const [endLogradouro, setEndLogradouro] = useState('');
    const [endNumero, setEndNumero] = useState('');
    const [endComplemento, setEndComplemento] = useState('');
    const [endBairro, setEndBairro] = useState('');
    const [endCidade, setEndCidade] = useState('');
    const [endEstado, setEndEstado] = useState('');
    const [endCep, setEndCep] = useState('');
    const local = useLocalSearchParams();

    async function handleSignIn() {
        try {
          const response = await api.post(`/newuser`, {
            endCliId: local.id, 
            endLogradouro, 
            endNumero, 
            endComplemento, 
            endBairro, 
            endCidade, 
            endEstado, 
            endCep         
          })
          router.canGoBack();          
        } catch (error) {
          if (isAxiosError(error)) {
            return Alert.alert(error.response?.data)
          }
          Alert.alert("Não foi possível realizar cadastro.")
        }
    }

    return(
        <View className="flex-1 items-center bg-slate-900 ">
            <View className="flex-col w-full h-1/4 items-center mt-5">
                <View className="flex-col items-center h-full">
                    <Image className="w-32 h-32 mt-5" source={require('@/assets/images/logo.png')} />
                </View>                             
            </View>
            <View className="flex-col w-full h-2/3 items-center text-white">
                <View className="flex items-center mt-3 mb-3">
                    <Text className='text-yellow-400 text-2xl font-bold'>
                        INFORME DADOS NOVO ENDEREÇO
                    </Text>
                </View>    
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe seu endereço" 
                    onChangeText={setEndLogradouro} 
                    value={endLogradouro} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe numero" 
                    onChangeText={setEndNumero} 
                    value={endNumero} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe complemento" 
                    onChangeText={setEndComplemento} 
                    value={endComplemento} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe bairro" 
                    onChangeText={setEndBairro} 
                    value={endBairro} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe cidade" 
                    onChangeText={setEndCidade} 
                    value={endCidade} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe estado" 
                    onChangeText={setEndEstado} 
                    value={endEstado} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe cep" 
                    onChangeText={setEndCep} 
                    value={endCep} 
                />
                <View className='flex items-center w-full p-10 '>
                    <TouchableOpacity onPress={handleSignIn} className='w-full h-20 '>
                        <View className="flex items-center justify-center bg-yellow-400 w-96 h-12 rounded-md">
                            <Text className="text-black font-bold text-md">Salvar</Text>
                        </View>
                    </TouchableOpacity>                      
                </View>                   
            </View>
        </View>    
    )
}
