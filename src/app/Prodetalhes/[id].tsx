import React, { useState, useEffect} from 'react'
import { View, Text, Image } from "react-native"
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { api } from '@/server/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRouter, useLocalSearchParams, Link } from "expo-router";

type produtoProps = {
    prdId: string;
    prdDescricao: string;
    prdReferencia: string;
    prdGrupo: number;
    prdLinha: number;
    prdCstUnitario: number;
    prdVdaUnitario: number;
    prdQtdEstoque: number;
    prdDscPermitido: number;
    prdStatus: string;
    prdUrlPhoto: string;
}

export default function Prodetalhes(){
    const [produtos, setProdutos] = useState<Array<produtoProps>>([]);
    const local = useLocalSearchParams();

    const [prdUrlPhoto, setPrdUrlPhoto] = useState('');
    const [prdDescricao, setPrdDescricao] = useState('');
    const [prdReferencia, setPrdReferencia] = useState('');
    const [prdVdaUnitario, setPrdVdaUnitario] = useState('');

    const [atualiza, setAtualiza] = useState(0);
    const [qtde, setQtde] = useState(0);
    const [vlrTotal, setVlrTotal] = useState(0);


    const navigation = useNavigation();
    const router = useRouter();
    //const { id, usrId } = useLocalSearchParams()

    const [carshop, setCarShop] = useState([]);
    const [count, setCount] = useState(0);
        
    useEffect(() => {
        
        let idUsrCar = local.idUsr;    
        api.get(`searchCar/${idUsrCar}`).then(resp => { 
            setCarShop(resp.data.pedId)
            setCount(resp.data.pedQtdtotal)
        }).catch(() => {
            alert('Erro no cadastro!');
        })        
        
        let idPro = local.id;
        api({
            method: 'get',    
            url: `searchPro/${idPro}`,                 
        }).then(function(response) {
            setProdutos(response.data)
            setPrdUrlPhoto(response.data.prdUrlPhoto)
            setPrdDescricao(response.data.prdDescricao)
            setPrdReferencia(response.data.prdReferencia)
            setPrdVdaUnitario(response.data.prdVdaUnitario)
            
            setQtde(qtde + 1)
            setVlrTotal(response.data.prdVdaUnitario)
        
        }).catch(function(error) {
            alert(`Falha no acesso ao produto! Tente novamente.`);
        })       
                                  
    }, []);

    useEffect(() => {               
        
        let idUsrCar = local.idUsr;    
        api.get(`searchCar/${idUsrCar}`).then(resp => { 
            setCarShop(resp.data.pedId)
            setCount(resp.data.pedQtdtotal)
        }).catch(() => {
            alert('Erro no cadastro!');
        })        
        
        let idPro = local.id;
        api({
            method: 'get',    
            url: `searchPro/${idPro}`,                 
        }).then(function(response) {
            setProdutos(response.data)
            setPrdUrlPhoto(response.data.prdUrlPhoto)
            setPrdDescricao(response.data.prdDescricao)
            setPrdReferencia(response.data.prdReferencia)
            setPrdVdaUnitario(response.data.prdVdaUnitario)
            
            setQtde(qtde + 1)
            setVlrTotal(response.data.prdVdaUnitario)
        
        }).catch(function(error) {
            alert(`Falha no acesso ao produto! Tente novamente.`);
        })    
    }, [atualiza]);

    function handleAdiciona(){
        setQtde(qtde + 1 )
        setVlrTotal(vlrTotal + parseInt(prdVdaUnitario))
    }

    function handleSubtrair(){
        setQtde(qtde - 1 )
        setVlrTotal(vlrTotal - parseInt(prdVdaUnitario))
    }

    const onPress = () => {    
        let qtdProd = 1;
        let dataAtual = new Date()
        let desconto = 0;
        let cupom = "";
    
        let entrega = 1;
        let taxEntrega = 0;
        let frmPagto = 1;
    
        api.post('newprocar', {
            pedData: new Date(),
            pedCliId: local.idUsr, 
            pedQtdTotal: qtdProd, 
            pedVlrTotal: vlrTotal, 
            pedCupom: cupom, 
            pedVlrPagar: vlrTotal,
            pedEndEntrega: entrega,
            pedVlrTaxEntrega: taxEntrega, 
            pedFrmPagto: frmPagto,
            itePedProId: local.id, 
            itePedQtde: qtdProd, 
            itePedVlrUnit: prdVdaUnitario, 
        }).then(() => {
            alert('Produto separado com sucesso!')
            setAtualiza(atualiza + 1)
        }).catch(() => {
            alert('Erro no cadastro!');
        })  
    }

    return(
        <View className="flex-1 bg-slate-900 items-center">
            <View className='flex-row w-full h-24 bg-amber-500 items-center justify-between'>
                <TouchableOpacity onPress={() => router.back()} className="">
                    <View className='ml-2'>                      
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <Text className="text-amber-500 text-2xl font-bold">Detalhes</Text>
                <Link href={{pathname: "/CarShopping/[id]", params: {id: carshop, usrId: local.idUsr}}} asChild> 
                    <TouchableOpacity >
                        <View className="flex-col">
                            <View className="flex-row w-6 h-6 ml-1 items-center rounded-full bg-red-600 ">
                                <Text className="ml-1 text-white font-semibold">{count}</Text>
                            </View>            
                            <FontAwesome name="shopping-cart" size={26} color="black" className="mr-5 -mt-2 "/>
                        </View>
                    </TouchableOpacity>
                </Link>
            </View>
            <View className='flex w-full items-center'>
                <View className='flex items-center w-full mt-5 ml-2 mb-5 '>
                    <Image source={{uri: `https://thumbs2.imgbox.com/${prdUrlPhoto}`}} resizeMode="contain" className='mt-5 ml-3 w-64 h-80' />
                </View>
                <View className='flex w-full h-40 bg-slate-900 '>

                </View>
                <View className='w-full'>
                    <Text className='mt-2 ml-3 text-white text-2xl font-semibold'>{prdDescricao}</Text>
                </View>
                <View className='w-full'>
                    <Text className='mt-1 ml-3 text-white text-md font-normal'>{prdReferencia}</Text>
                </View>
                <View className='flex-row w-full'>
                    <Text className='mt-1 ml-3 mr-2 text-white text-2xl font-bold'>R$ {prdVdaUnitario}</Text>
                    <Text className='mt-4 text-white text-xs font-bold'>/cada</Text>
                </View>    
            </View>
            <View className='flex-row items-center w-96 h-20'>
                <TouchableOpacity className='w-20' onPress={handleSubtrair}> 
                    <View className='flex items-center justify-center w-20 h-10 bg-red-700 rounded-l-lg'>
                        <Text className='text-white text-3xl font-bold'>-</Text>
                    </View>
                </TouchableOpacity>
                <View className='flex items-center justify-center w-56 h-10 bg-gray-300'>
                    <Text className='text-slate-900 '>{qtde} - {vlrTotal}</Text>
                </View>
                <TouchableOpacity className='w-20' onPress={handleAdiciona}> 
                    <View className='flex items-center justify-center w-20 h-10 bg-green-500 rounded-r-lg'>
                        <Text className='text-white text-3xl font-bold'>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className='flex-row items-center w-96 h-20'>
                <TouchableOpacity className='w-96' onPress={onPress}> 
                    <View className='flex items-center justify-center w-96 h-14 bg-amber-500 rounded-lg'>
                        <Text className='text-amber-100 text-xl font-bold'>Confirmar</Text>
                    </View>
                </TouchableOpacity>
            </View>    
        </View>
    )
}