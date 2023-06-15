// Http requests
interface FetchQuizParams {
    amount: number
    category: string 
    difficulty: QuizDifficulty | ""
    type: QuizType
}
interface FetchQuizResp {
    response_code: number;
    results: QuizItemResp[];
}
interface FetchQuizCatogiesResp {
    trivia_categories: QuizCategoryResp[];
}
// Model
interface QuizItemResp {
    category: number;
    type: QuizType;
    difficulty: QuizDifficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuizItem extends Omit<QuizItemResp, 'category'> {
    category :  string
}


interface QuizCategoryResp {
    id: number ;
    name: string;
}


interface QuizCategory extends Omit<QuizCategoryResp, 'id'>{
    id: string ;
    name: string;
}

enum QuizDifficulty {
    Mixed = "mixed",
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}
enum QuizType {
    Mutiple = "multiple",
    Boolean = "boolean"
}

enum Steps {
    SetQtyQuestions,
    SetCategory,
    SetDifficulty,
    Play,
    Score
}


export type { FetchQuizParams, FetchQuizResp, FetchQuizCatogiesResp, QuizItem,QuizCategory  }
export { Steps, QuizType, QuizDifficulty }