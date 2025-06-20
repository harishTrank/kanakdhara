import React, {FC} from 'react';
import {Box, Button, HStack, Modal, Text} from 'native-base';

import {
  genderList,
  medalList,
  occasionList,
  purityList,
  weightList,
} from '../../../data/ProductData';
import {Colors} from '../../../utils/Colors';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const FilterModal: FC<Props> = ({open, onClose}) => {
  return (
    <>
      <Modal isOpen={open} onClose={onClose} safeAreaTop={true}>
        <Modal.Content w={'100%'} mb={0} mt={'auto'}>
          <Modal.CloseButton />
          <Modal.Header fontWeight={'600'} fontSize={'md'} color={'black'}>
            Filter By
          </Modal.Header>
          <Modal.Body>
            <Text fontWeight={'600'} fontSize={'md'} color={'black'}>
              Metal & Stone
            </Text>
            <HStack flexWrap={'wrap'} py={2} alignItems={'center'}>
              {medalList.map(m => (
                <Box
                  px={2}
                  py={1}
                  mr={3}
                  mb={2}
                  borderWidth={1}
                  borderRadius={100}
                  borderColor={Colors.textColor}>
                  <Text
                    fontWeight={'600'}
                    fontSize={'xs'}
                    color={Colors.textColor}>
                    {m}
                  </Text>
                </Box>
              ))}
            </HStack>
            <Text fontWeight={'600'} fontSize={'md'} color={'black'}>
              Purity
            </Text>
            <HStack py={2} flexWrap={'wrap'} alignItems={'center'}>
              {purityList.map(m => (
                <Box
                  px={2}
                  py={1}
                  mr={3}
                  mb={2}
                  borderWidth={1}
                  borderRadius={100}
                  borderColor={Colors.textColor}>
                  <Text
                    fontWeight={'600'}
                    fontSize={'xs'}
                    color={Colors.textColor}>
                    {m}
                  </Text>
                </Box>
              ))}
            </HStack>
            <Text fontWeight={'600'} fontSize={'md'} color={'black'}>
              Weight
            </Text>
            <HStack py={2} flexWrap={'wrap'} alignItems={'center'}>
              {weightList.map(m => (
                <Box
                  px={2}
                  py={1}
                  mr={3}
                  mb={2}
                  borderWidth={1}
                  borderRadius={100}
                  borderColor={Colors.textColor}>
                  <Text
                    fontWeight={'600'}
                    fontSize={'xs'}
                    color={Colors.textColor}>
                    {m}
                  </Text>
                </Box>
              ))}
            </HStack>
            <Text fontWeight={'600'} fontSize={'md'} color={'black'}>
              Occasion
            </Text>
            <HStack py={2} flexWrap={'wrap'} alignItems={'center'}>
              {occasionList.map(m => (
                <Box
                  px={2}
                  py={1}
                  mr={3}
                  mb={2}
                  borderWidth={1}
                  borderRadius={100}
                  borderColor={Colors.textColor}>
                  <Text
                    fontWeight={'600'}
                    fontSize={'xs'}
                    color={Colors.textColor}>
                    {m}
                  </Text>
                </Box>
              ))}
            </HStack>
            <HStack
              justifyContent={'space-between'}
              alignItems={'center'}
              my={2}>
              <Button w={'48%'} variant="outline" borderColor={'primary.400'}>
                Clear
              </Button>
              <Button w={'48%'} variant="solid">
                Apply
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
