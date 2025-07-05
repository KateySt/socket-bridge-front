import {serverApiRequest} from "@/lib/axios";

export async function createQuiz(quiz) {
  return await serverApiRequest({
    method: 'POST',
    url: '/quizzes',
    data: quiz,
  });
}

export async function getCompanyQuizzes(id: string) {
  return await serverApiRequest({
    method: 'GET',
    url: `/company/${id}/quizzes`,
  });
}
