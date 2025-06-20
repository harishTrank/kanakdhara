import React, {FC, useEffect, useState} from 'react';
import {Actionsheet, Box, Button, HStack, Pressable, Text} from 'native-base';

import {Colors} from '../../../utils/Colors';

type Props = {
  category: boolean;
  onCloseCategory: () => void;
  selectedCategory: (m: string) => void;
  categoryValue: string;
  categoryList: any;
};

export const CategoryModel: FC<Props> = ({
  category,
  selectedCategory,
  onCloseCategory,
  categoryValue,
  categoryList,
}: any) => {
  const [catergorySelection, setCategorySelection]: any = useState(categoryValue);
  useEffect(() => {
    if (categoryValue){
      setCategorySelection(categoryValue);
    }
  }, [categoryValue])
  return (
    <>
      <Actionsheet isOpen={category} onClose={onCloseCategory}>
        <Actionsheet.Content bg={'#F7F7F7'}>
          <>
            <Box w={'100%'} p={3} flexWrap={'wrap'} flexDirection={'row'}>
              {categoryList.map((m: any, index: any) => (
                <Pressable key={index} ml={2} p={1} onPress={() => setCategorySelection(m?.id)}>
                  <Text
                    fontSize="md"
                    fontWeight={'600'}
                    color={
                      catergorySelection === m?.id ? Colors.primary : Colors.textColor
                    }>
                    {m?.name}
                  </Text>
                </Pressable>
              ))}
            </Box>
            <HStack alignSelf={'flex-end'} my={2}>
              <Button
                onPress={() => selectedCategory(undefined)}
                w={'25%'}
                variant="outline"
                borderColor={'primary.400'}
                mr={2}>
                Clear
              </Button>
              <Button w={'25%'} variant="solid" onPress={() => selectedCategory(catergorySelection)}>
                Apply
              </Button>
            </HStack>
          </>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
