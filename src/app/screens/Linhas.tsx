import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView} from "react-native"
import {useLocalSearchParams, Link } from "expo-router";

import {api} from '@/server/api';
import ListLinhas from '@/components/ListLinhas';

type GruposProps = {
    grpId: string;
    grpDescricao: string;
}

export default function Linhas() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { idUsr, name, title } = useLocalSearchParams();

    const [grupos, setGrupos] = useState<Array<GruposProps>>([]);

    useEffect(() => {
        api({
            method: 'get',    
            url: `grupos`,                 
        }).then(function(response) {
            setGrupos(response.data)            
        }).catch(function(error) {
            alert(`Falha no acesso aos grupos! Tente novamente.`);
        })
        
    }, []);

    return(
        <View className="flex flex-col items-center bg-slate-900 ">            
            <FlatList
                data={grupos}
                className='w-full ml-1 mb-0'
                horizontal={false}
                renderItem={({ item }) => <ListLinhas data={item} />}
                keyExtractor={(item) => item.grpId}
            />     
        </View>
    )
}