import { useState, useEffect, useRef } from 'react';
import { Link, useLocalSearchParams } from "expo-router"
import { View, Text, ImageBackground, Image, Platform  } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

export default function Home(){
    const { post } = useLocalSearchParams();

    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return(
        <View className="flex-1 w-full h-full items-center justify-center">
            <ImageBackground source={require('@/assets/images/banner.jpg')} alt="" className="w-full h-full opacity-65" />
            <View className="flex w-full h-full items-start absolute">
                <View className="flex-col items-center w-full h-36 mt-10">
                    <Image className="w-48 h-48 mt-1" source={require('@/assets/images/logowhite.png')} />
                </View>
                <Text className="text-yellow-800 text-5xl font-bold mt-28 ml-3 mb-3">A melhor </Text>
                <Text className="text-yellow-800 text-5xl font-bold ml-3 mb-3">rede social, sempre</Text>
                <Text className="text-yellow-800 text-5xl font-bold ml-3 mb-3">vai ser uma rodada</Text>
                <Text className="text-yellow-800 text-5xl font-bold ml-3 mb-3">de cerveja com os</Text>
                <Text className="text-yellow-800 text-5xl font-bold ml-3 mb-3">amigos!</Text>
                <View className="flex-col items-center w-full h-10">
                <Link href={{pathname: "./screens/Login", params: { expoPushToken}}} asChild>
                    <TouchableOpacity>
                        <View className="flex items-center justify-center bg-yellow-400 w-96 h-14 mt-40 rounded-lg shadow-lg shadow-yellow-500/50">
                            <Text className="text-black text-md font-semibold uppercase ">Vamos bebemorar hoje</Text>
                        </View>
                    </TouchableOpacity>
                    </Link>
                </View>    
            </View>
        </View>    
    )
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here', test: { test1: 'more data' } },
      },
      trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        //console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

