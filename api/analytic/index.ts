import {serverApiRequest} from "@/lib/axios";

export async function getRatingCompany(companyId: string) {
  return await serverApiRequest({
    method: "GET",
    url: "/analytics/rating",
    headers: {
      "companyId": companyId
    }
  });
}

export async function getQuizScoresOverTime(id: string) {
  return await serverApiRequest({
    method: "GET",
    url: "/analytics/avg-by-user",
    headers: {
      "X-User-Id": id,
    }
  });
}

export async function getLastCompletions(id: string, companyId: string) {
  return await serverApiRequest({
    method: "GET",
    url: "/analytics/last-completions",
    headers: {
      "companyId": companyId,
      "X-User-Id": id,
    }
  });
}

export async function getCompanyUsersLastTests(id: string, companyId: string) {
  return await serverApiRequest({
    method: "GET",
    url: "/analytics/company-users-last-tests",
    headers: {
      "companyId": companyId,
      "X-User-Id": id,
    }
  });
}

export async function getAvgByAllUser() {
  return await serverApiRequest({
    method: "GET",
    url: "/analytics/avg-by-all-user"
  });
}

export async function getAvgByQuiz() {
  return await serverApiRequest({
    method: "GET",
    url: "/analytics/avg-by-quiz"
  });
}