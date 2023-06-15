import { useEffect, useState } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface Props {
  durationSec: number;
  onFinished: () => void;
}
let timer: NodeJS.Timer;
export const Timer = (p: Props) => {
  const [progress, setProgress] = useState(p.durationSec);

  useEffect(() => {
    if (progress <= 0) {
      p.onFinished();
      clearInterval(timer);
    }
  }, [progress]);

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress
      max={p.durationSec}
      value={progress}
      borderRadius="0 4px 4px 0"
    >
      <CircularProgressLabel fontWeight={"bold"}>
        {progress}
        {"'"}
      </CircularProgressLabel>
    </CircularProgress>
  );
};
