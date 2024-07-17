import React, { useState, useEffect, useRef} from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native"
import { router, useNavigation, useRouter, useLocalSearchParams } from "expo-router";

import { isAxiosError } from "axios"
import { api } from '@/server/api'
import { Link } from "expo-router";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     
    const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { expoPushToken } = params;

    let title = 'Produtos';
     
    async function handleSignIn() {
        try {
          const response = await api.post(`/signIn`, {
            email,
            password,
          })
          let id = response.data.id;  
          let nomCliente = response.data.name;
          router.push(`/screens/Produtos?idUsr=${id}&name=${nomCliente}&title=${title}` as any );          
        } catch (error) {
          if (isAxiosError(error)) {
            return Alert.alert(error.response?.data)
          }
          Alert.alert("Não foi possível entrar.")
        }
    }

    async function handleCadastro() {
        router.push(`/screens/NewUser`);          
    }

    return(
        <View className="flex-1 items-center bg-slate-900 ">
            <View className="flex-col w-full h-1/4 items-center mt-10">
                <View className="flex-col items-center h-full">
                    <Image className="w-56 h-40 mt-5" source={require('@/assets/images/logo.png')} />
                </View>                             
            </View>
            <View className="flex-col w-full h-2/3 items-center text-white">
                <View className="flex items-center mt-6 mb-6">
                    <Text className='text-yellow-400 text-2xl font-bold'>
                        LOGIN
                    </Text>
                </View>    
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-6 rounded-md p-2" 
                    placeholder="Informe seu email" 
                    onChangeText={setEmail} 
                    value={email} 
                />
                <TextInput 
                    className="border border-yellow-300 bg-slate-50 text-black w-[90%] h-14 mb-6 rounded-md p-2" 
                    secureTextEntry 
                    placeholder="Informe sua Senha" 
                    onChangeText={setPassword} 
                    value={password} 
                />
                <View className='flex items-center w-full p-10 '>
                    <TouchableOpacity onPress={handleSignIn} className='w-full h-20 '>
                        <View className="flex items-center justify-center bg-yellow-400 w-96 h-12 rounded-md">
                            <Text className="text-black font-bold text-md">Entrar</Text>
                        </View>
                    </TouchableOpacity>                      
                </View> 
                <View className='flex items-center w-full p-10 '>
                    <TouchableOpacity onPress={handleCadastro} className='w-full h-20 '>
                        <View className="flex items-center justify-center w-96 h-12 rounded-md">
                            <Text className="text-yellow-400 font-bold text-md">Não tenho cadastro</Text>
                            <Text>Your expo push token: {expoPushToken}</Text>
                        </View>
                    </TouchableOpacity>                      
                </View>   
            </View>
        </View>    
    )
}
