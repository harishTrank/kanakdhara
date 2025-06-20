import React from 'react';
import {Actionsheet, CheckIcon, HStack, Pressable, Text} from 'native-base';

import {Colors} from '../../../utils/Colors';
import {sortList} from '../../../data/ProductData';



export const SortModal: any = ({
  setSortValue,
  sort,
  onCloseSort,
  sortValue,
}: any) => {
  return (
    <>
      <Actionsheet isOpen={sort} onClose={onCloseSort}>
        <Actionsheet.Content bg={'#F7F7F7'}>
          {sortList.map((m: any, index: any) => (
            <Pressable
              w="100%"
              key={index}
              h={60}
              px={4}
              justifyContent="center"
              onPress={() => {
                onCloseSort(false);
                setSortValue(m.id);
              }}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text
                  fontSize="md"
                  fontWeight={'600'}
                  color={sortValue === m.id ? Colors.black : Colors.textColor}>
                  {m.name}
                </Text>
                {sortValue === m.id && <CheckIcon size="5" color="primary.400" />}
              </HStack>
            </Pressable>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
