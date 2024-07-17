import React, {useState, useEffect} from "react";
import { View, Text, Image,TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

import Linhas from "./Linhas";
import Promocoes from "./Promocoes";
import Menubar from "@/components/Menubar";

type paramsProps = {
    idUsr: string;
    name: string;
    title: string;
}

export default function Produtos(){
    const navigation = useNavigation();
    const router = useRouter();
    const { idUsr, name, title } = useLocalSearchParams<paramsProps>();

    const [carshop, setCarShop] = useState([]);
    const [count, setCount] = useState(0);

    function handleCarShopping(){
        //router.push(`/screens/LisProLinha?id=${id}&name=${name}` as any );   
    }


//<Pagination pages={pages} setCurrentPage={setCurrentPage} setNewPage={setNewPage} pagInitial={pagDefault} />


    return(
        <View className="flex-1 w-full h-full bg-slate-900" >            
            <Menubar user={idUsr} nomUser={name} sysTitle={title} />
            <Linhas />
            <Promocoes />
        </View>
    )
}



