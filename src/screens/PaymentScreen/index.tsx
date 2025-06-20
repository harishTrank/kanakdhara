import React, {FC} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {store} from '../../store';

const PaymentScreen: FC<any> = ({route}: any) => {
  const {userId} = store.getState().auth;
  console.log(
    1111111,
    `https://www.kanakdhara.co/checkout/order-pay/${route?.params?.id}/?pay_for_order=true&key=${route?.params?.order_key}&user_id=${userId}&order_id=${route?.params?.id}`,
  );
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScreenHeader heading={'Payment Process'} />
      <WebView
        source={{
          uri: `https://www.kanakdhara.co/checkout/order-pay/${route?.params?.id}/?pay_for_order=true&key=${route?.params?.order_key}&user_id=${userId}&order_id=${route?.params?.id}`,
        }}
        style={{flex: 1, width: '100%', height: '100%'}}
        incognito={true}
      />
    </View>
  );
};

export default PaymentScreen;
