import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import ChakraSlider from "../components/Slider";
import { useState } from "react";

const DEFAULT_QTY = 10;

interface Props {
  onNext: (questionQty: number) => void;
}

export function QuizSetQuestionsQty(p: Props) {
  const [questionQty, setQuestionQty] = useState<number>(DEFAULT_QTY);
  return (
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2' direction={"column"}>
        <Heading as="h1" fontSize={"3xl"} mx={5} mt={200} mb={20}>
          How many questions?
        </Heading>
        <Box minWidth={[250, 350, 500]} mx={5}>
          <ChakraSlider
            onChange={setQuestionQty}
            defaultValue={DEFAULT_QTY}
            min={5}
            max={30}
            step={5}
          />
        </Box>
      </Flex>

      <Flex mt={"60"} position={"fixed"} right={['35%', '35%', 150]} top={"50%"}>
        <Button
          onClick={() => p.onNext(questionQty)}
          rightIcon={<ArrowForwardIcon />}
        >
          Set category
        </Button>
      </Flex>
    </>
  );
}
