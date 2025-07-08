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
