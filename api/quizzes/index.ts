import {serverApiRequest} from "@/lib/axios";

export async function createQuiz(quiz: any) {
  return await serverApiRequest({
    method: "POST",
    url: "/quizzes",
    data: quiz,
  });
}

export async function getCompanyQuizzes(id: string) {
  return await serverApiRequest({
    method: "GET",
    url: `/company/${id}/quizzes`,
  });
}

export async function updateQuiz(quiz: any, id: string) {
  return await serverApiRequest({
    method: "PUT",
    url: `/quizzes/${id}`,
    data: quiz,
  });
}

export async function deleteQuiz(quizId: string, id: string) {
  return await serverApiRequest({
    method: "DELETE",
    url: `/quizzes/${id}`,
    data: quizId,
  });
}

export async function quizAttempt(quiz: any) {
  return await serverApiRequest({
    method: "POST",
    url: "/quizzes/attempt",
    data: quiz,
  });
}

export async function getAverageScore(id: string, companyId: string) {
  return await serverApiRequest({
    method: "GET",
    url: "/quizzes/average-score",
    headers: {
      "X-User-Id": id,
      "companyId": companyId
    }
  });
}
