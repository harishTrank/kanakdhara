import {Text as TextNative, View} from 'react-native';
import {Text} from 'native-base';
import {Colors} from '../../../utils/Colors';

const TextOneTwo = ({text1, text2}: any) => {
  return (
    <View
      style={{
        marginVertical: 25,
      }}>
      <Text
        fontWeight={'600'}
        fontSize={'lg'}
        textAlign={'center'}
        color={Colors.boldFont}>
        {text1}
      </Text>
      <TextNative
        style={{
          fontSize: 10,
          textAlign: 'center',
          fontFamily: 'Montserrat-Medium',
          color: Colors.smallFont,
        }}>
        {text2}
      </TextNative>
    </View>
  );
};

export default TextOneTwo;
