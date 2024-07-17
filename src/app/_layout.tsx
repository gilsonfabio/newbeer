import React, { useEffect} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, router } from 'expo-router';
import * as Notifications from 'expo-notifications';

import '@/styles/global.css';

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

export default function Layout() {
  useNotificationObserver();
  return(
    <GestureHandlerRootView style={{flex:1}}>      
      <Slot />
    </GestureHandlerRootView>
  )
}
