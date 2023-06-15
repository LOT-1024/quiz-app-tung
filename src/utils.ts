
export const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = [...array];
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
  };
