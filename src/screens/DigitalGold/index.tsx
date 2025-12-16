import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from '../../components/common/Header';
import {store} from '../../store';
import {digitalGoldPay} from '../../QueryStore/Services/Home';
import FullScreenLoader from '../../components/FullScreenLoader';
import {useFocusEffect} from '@react-navigation/native';

const DigitalGold = () => {
  const [amount, setAmount] = useState('');
  const [weight, setWeight] = useState(0);
  const [pricePerGram, setPricePerGram] = useState(0);
  const {userId} = store.getState().auth;
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  useEffect(() => {
    if (!amount) {
      getGoldWeight('0');
      return;
    }
    const debounceTimer = setTimeout(() => {
      getGoldWeight(amount);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [amount]);

  useFocusEffect(
    React.useCallback(() => {
      getGoldWeight('0');
      setAmount('');
    }, []),
  );

  const getGoldWeight = (value: string) => {
    setLoading(true);
    digitalGoldPay({
      query: {
        u_id: userId,
        amount: value,
        payment_method: 'ccavenue',
      },
    })
      .then((res: any) => {
        setWeight(Number(res.gold_grams));
        setPricePerGram(Number(res.gold_rate));
        setPaymentUrl(res.payment_url);
      })
      .catch((err: any) => {
        setWeight(0);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBuy = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter amount');
      return;
    }

    if (!paymentUrl) {
      Alert.alert('Error', 'Payment URL not available');
      return;
    }

    Alert.alert(
      'Confirm Purchase',
      `You are buying ${weight} grams of digital gold at ₹ ${pricePerGram} per gram for a total of ₹ ${amount}.\n\n Proceed to payment?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Proceed to Pay',
          onPress: async () => {
            const supported = await Linking.canOpenURL(paymentUrl);
            if (supported) {
              Linking.openURL(paymentUrl);
            } else {
              Alert.alert('Error', 'Unable to open payment page');
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <Header heading="Digital Gold" cart={false} />
      <View style={styles.container}>
        {loading && <FullScreenLoader />}
        <Text style={styles.heading}>Buy Digital Gold</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Current Gold Price</Text>
          <Text style={styles.price}>₹ {`${pricePerGram} / gram`} </Text>

          <Text style={styles.label}>Enter Amount (₹)</Text>
          <View style={styles.inputView}>
            <Text style={styles.RsText}>₹</Text>
            <TextInput
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>Gold You Will Get</Text>
          <Text style={styles.weight}>{weight} grams</Text>

          <TouchableOpacity style={styles.button} onPress={handleBuy}>
            <Text style={styles.buttonText}>Buy Digital Gold</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Description */}
        <Text style={styles.description}>
          Digital gold purchased can be used to buy real gold in the future.
          Selling of digital gold is currently not available.
        </Text>
      </View>
    </>
  );
};

export default DigitalGold;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    color: '#555',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#C89B3C',
  },
  inputView: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  RsText: {
    fontWeight: '800',
    fontSize: 24,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
  },
  weight: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#C89B3C',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 20,
    textAlign: 'center',
  },
});
