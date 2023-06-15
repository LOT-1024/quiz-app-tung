import { useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  SliderMark,
} from "@chakra-ui/react";

interface Props {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onChange: (newValue: number) => void;
}
const ChakraSlider = (p: Props) => {
  const [value, setValue] = useState(p.defaultValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    p.onChange(newValue);
  };

  const renderMarks = () => {
    const marks = [];
    for (let i = p.min; i <= p.max; i += p.step) {
      marks.push(
        <SliderMark ml="-3" pt={4} key={i} value={i} fontSize={"xl"}>
          {i}
        </SliderMark>
      );
    }
    return marks;
  };
  return (
    <Slider
      value={value}
      min={p.min}
      max={p.max}
      step={p.step}
      onChange={handleChange}
      colorScheme="yellow"
      mb={"14"}
    >
      <SliderTrack h={3} borderRadius={20}>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <Box>{renderMarks()}</Box>
    </Slider>
  );
};

export default ChakraSlider;
