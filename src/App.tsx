import { useEffect, useState } from "react";
import "./App.css";
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizItem,
  QuizType,
  Steps,
} from "./types/quiz.type";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { QuizSetQuestionsQty } from "./features/QuizSetQuestionsQty";
import { QuizSetCategory } from "./features/QuizSetCategory";
import { QuizPlay } from "./features/QuizPlay";
import BubbleImg from "./assets/bubble.png";
import { QuizAPI } from "./api/quiz-api";
import { QuizSetDifficulty } from "./features/QuizSetDifficulty";
import { QuizScore } from "./features/QuizScore";

export default function App() {
  const [quizCategories, setQuizCategories] = useState<QuizCategory[]>([]);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Mutiple,
  });

  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [step, setStep] = useState<Steps>(Steps.SetQtyQuestions);
  const [history, setHistory] = useState<boolean[]>([]);

  useEffect(() => {
    (async () => {
      setQuizCategories([
        { id: "", name: "A bit of everything" },
        ...(await QuizAPI.fetchQuizCategories()),
      ]);
    })();
  }, []);

  const header = (
    <Flex pt={5} justifyContent="center">
      <Heading size="2xl">TunggQuiz</Heading>
    </Flex>
  );

  const renderStep = () => {
    switch (step) {
      case Steps.SetQtyQuestions:
        return (
          <QuizSetQuestionsQty
            onNext={(qty: number) => {
              setQuizParams({ ...quizParams, amount: qty });
              setStep(Steps.SetCategory);
            }}
          />
        );
      case Steps.SetCategory:
        return (
          <QuizSetCategory
            onNext={async (categoryId: string) => {
              setQuizParams({ ...quizParams, category: categoryId });
              setStep(Steps.SetDifficulty);
            }}
            categories={quizCategories}
          />
        );
      case Steps.SetDifficulty:
        return (
          <QuizSetDifficulty
            onNext={async (difficulty: QuizDifficulty) => {
              const params: FetchQuizParams = {
                ...quizParams,
                difficulty:
                  difficulty === QuizDifficulty.Mixed ? "" : difficulty,
              };
              setQuizParams(params);
              const quizResp = await QuizAPI.fetchQuiz(params);
              if (quizResp.length === 0) {
                alert("No quiz found with these parameters, restarting game");
                setStep(Steps.SetQtyQuestions);
              } else {
                setQuizItems(quizResp);
                setStep(Steps.Play);
              }
            }}
          />
        );
      case Steps.Play:
        return (
          <QuizPlay
            onFinished={(history: boolean[]) => {
              setHistory(history);
              setStep(Steps.Score);
            }}
            questions={quizItems}
          />
        );
      case Steps.Score:
        return (
          <QuizScore
            history={history}
            onNext={() => {
              setStep(Steps.SetQtyQuestions);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {header}
      <Image
        src={BubbleImg}
        transform={'scaleX(-1)'}
        zIndex={-1}
        position="fixed"
        left={-120}
        top={10}
        display={['none', 'none', 'hidden']}
      />
      <Image
        src={BubbleImg}
        zIndex={-1}
        position="fixed"
        right={-120}
        top={200}
      />
      {renderStep()}
    </Box>
  );
}
