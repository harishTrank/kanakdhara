import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import {Colors} from '../../utils/Colors';

const FullScreenLoader = ({loading}: any) => {
  return (
    <Modal animationType="fade" transparent={true} visible={loading}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
      </View>
    </Modal>
  );
};

export default FullScreenLoader;
