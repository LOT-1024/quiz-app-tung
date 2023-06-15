/* @todo Add a description */

import { QuizCategory } from "../types/quiz.type";
import {
  Button,
  Box,
  Flex,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface Props {
  categories: QuizCategory[];
  onNext: (categoryId: string) => void;
}
export function QuizSetCategory(p: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );

  const radioCardList = p.categories.map((category) => {
    return (
      <GridItem key={category.id}>
        <Radio value={category.id.toString()}>{category.name}</Radio>
      </GridItem>
    );
  });

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading as="h1" fontSize={"3xl"} mx={5} mt={{ md: 100 }} mb={10}>
          Which topic?
        </Heading>
        <RadioGroup mb={150}
          onChange={(categoryId: string) => {
            setSelectedCategoryId(categoryId);
          }}
          value={selectedCategoryId}
        >
          <Box overflowY="auto" maxHeight={500} minWidth={300} mx={4}>
            <SimpleGrid columns={[1, 3, 4]} mt={"30"} gap={4}>
              {radioCardList}
            </SimpleGrid>
          </Box>
        </RadioGroup>
      </Flex>

      <Flex mt={"60"} position={"fixed"} right={['35%', '35%', 150]} top={"50%"}>
        <Button
          onClick={() => p.onNext(selectedCategoryId)}
          rightIcon={<ArrowForwardIcon />}
        >
          Set difficulty
        </Button>
      </Flex>
    </>
  );
}
