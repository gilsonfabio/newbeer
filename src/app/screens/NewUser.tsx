import React, { useState} from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native"
import { router } from "expo-router";

import { isAxiosError } from "axios"
import { api } from '@/server/api'
import { Link } from "expo-router";

export default function NewUser(){
    const [nome, setCliNome] = useState('');
    const [cpf, setCliCpf] = useState('');
    const [password, setCliPassword] = useState('');
    const [nascimento, setCliNascimento] = useState('');
    const [celular, setCliCelular] = useState('');
    const [email, setCliEmail] = useState('');

    async function handleSignIn() {
        try {
          const response = await api.post(`/newuser`, {
            nome, 
            cpf, 
            nascimento, 
            email, 
            celular, 
            password            
          })                    
        } catch (error) {
          if (isAxiosError(error)) {
            return Alert.alert(error.response?.data)
          }
          Alert.alert("Não foi possível realizar cadastro.")
        }
        router.back();
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
                        INFORME DADOS P/ CADASTRO
                    </Text>
                </View>    
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe seu nome" 
                    onChangeText={setCliNome} 
                    value={nome} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe seu cpf" 
                    onChangeText={setCliCpf} 
                    value={cpf} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe seu nascimento" 
                    onChangeText={setCliNascimento} 
                    value={nascimento} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe seu celular" 
                    onChangeText={setCliCelular} 
                    value={celular} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    placeholder="Informe seu email" 
                    onChangeText={setCliEmail} 
                    value={email} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-3 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe sua Senha" 
                    onChangeText={setCliPassword} 
                    value={password} 
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
