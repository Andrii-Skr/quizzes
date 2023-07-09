type Categories = { trivia_categories: Category[] };

type Questions = { results: CategoryQuestion[] };

export type Category = { id: number; name: string };

export type CategoryQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("https://opentdb.com/api_category.php", {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed fetch");
  const categories = (await res.json()) as Categories;
  return categories.trivia_categories;
}

export async function getCategoryQuestions(
  idCategory: number,
  idAmount = 10
): Promise<CategoryQuestion[]> {
  const res = await fetch(`https://opentdb.com/api.php?amount=${idAmount}&category=${idCategory}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed fetch");
  const questions = (await res.json()) as Questions;
  return questions.results;
}
