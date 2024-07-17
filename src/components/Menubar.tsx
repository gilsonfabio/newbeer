import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRouter, Link } from "expo-router";

import { api } from "@/server/api";

type userProps = {
    user?: string;
    nomUser?: string;
    sysTitle?: string;
}

export default function Menubar({user, nomUser, sysTitle}: userProps){
    const navigation = useNavigation();
    const router = useRouter();

    const [carshop, setCarShop] = useState([]);
    const [count, setCount] = useState(0);
    
    useEffect(() => {

        let idUsrCar = user;    
        api.get(`searchCar/${idUsrCar}`).then(resp => { 
            setCarShop(resp.data.pedId)
            setCount(resp.data.pedQtdtotal)
        }).catch(() => {
            alert(`Erro no cadastro CarShopping!${idUsrCar}`);
        })
                          
    }, []);

    return(
        <View>
            <View className="flex-col bg-amber-500 items-center justify-between w-full h-28 ">                
                <View className='flex-row items-center justify-between '>
                    <Image className="w-14 h-12 mt-3" source={require('@/assets/images/logo.png')} />
                    <View className="mt-5">
                        <Text className="text-black text-md font-semibold">Olá,{nomUser}</Text>
                    </View>
                </View>
                <View className="flex-row w-full items-center justify-between px-2">    
                    <TouchableOpacity onPress={() => router.back()} className="">
                        <View>                      
                            <AntDesign name="arrowleft" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    <Text className='text-md text-black font-semibold'>{sysTitle}</Text>
                    <TouchableOpacity onPress={() => {}} >
                        <View>                      
                            <AntDesign name="rocket1" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    <Link href={{pathname: "/CarShopping/[id]", params: {id: carshop, usrId: 1}}} asChild> 
                        <TouchableOpacity >
                            <View className="flex-col">
                                <View className="flex-row w-6 h-6 ml-2 items-center rounded-full bg-red-600 ">
                                    <Text className="ml-1 text-black font-semibold">{count}</Text>
                                </View>            
                                <FontAwesome name="shopping-cart" size={26} color="white" className="mr-5 -mt-2 "/>
                            </View>
                        </TouchableOpacity>
                    </Link>      
                </View>           
            </View>
        </View>
    )
}


/*
interface pagesProps {
    pages?: number;
    setCurrentPage?: any;
    setNewPage?: any;
    pagInitial?: number;
}

const Pagination = ({pages, setCurrentPage, setNewPage, pagInitial}:pagesProps) => {
*/