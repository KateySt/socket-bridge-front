import {cookies} from "next/headers";
import {getCompany} from "@/api/companies";
import CreateQuizModal from "@/component/CreateQuizModal/CreateQuizModal";
import {deleteQuiz, getAverageScore, getCompanyQuizzes} from "@/api/quizzes";
import EditQuizModal from "@/component/EditQuizModal/EditQuizModal";
import {redirect} from "next/navigation";
import DeleteQuizModal from "@/component/DeleteQuizModal/DeleteQuizModal";
import TakeQuizModal from "@/component/TakeQuizModal/TakeQuizModal";
import Stars from "@/component/Stars/Stars";

export default async function CompanyQuizzesPage({params,searchParams}: { params: Promise<{ id: string; locale: string }>, searchParams: Promise<{ page?: string; }>; }) {
  const {id} = await params;
  const {page} = await searchParams;
  const cookieStore = await cookies();
  const user = JSON.parse(cookieStore.get("user")?.value ?? "{}");
  const company = await getCompany(id);
  const {quizzes} = await getCompanyQuizzes(id, Number(page??0));

  const {averageScore} = await getAverageScore(user.id, id);
  const isAdmin = user.id === company.owner_id || company.admin_ids.includes(user.id);
  const totalPages = quizzes.total_pages;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Quizzes for {company.name}</h1>
      {!isAdmin && (
        <div className="mb-6">
          <p className="text-lg font-medium">Your average score:</p>
          <div className="flex items-center gap-2">
            <Stars score={averageScore}/>
            <span className="text-sm text-gray-500">({averageScore.toFixed(1)} / 10)</span>
          </div>
        </div>
      )}
      {isAdmin && (
        <CreateQuizModal companyId={company.id} ownerId={user.id}/>
      )}
      {quizzes.content.length === 0 ? (
        <p>No quizzes available for this company.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.content.map((quiz: any) => (
            <div key={quiz.id} className="border p-4 rounded shadow bg-white text-primary">
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
              <p className="text-sm">Frequency: every {quiz.frequency_days} days</p>

              <ul className="list-disc list-inside mt-2">
                {quiz.questions.map((q: any, index: number) => (
                  <li key={index}>
                    <strong>{q.text}</strong>
                  </li>
                ))}
              </ul>
              {isAdmin && (
                <div className="flex gap-2 mt-4">
                  <EditQuizModal quiz={quiz} ownerId={user.id} companyId={company.id}/>
                  <DeleteQuizModal
                    action={async () => {
                      "use server";
                      await deleteQuiz(quiz.id, user.id);
                      redirect(`/companies/${id}/quizzes`);
                    }}
                  />
                </div>
              )}

              {!isAdmin && (
                <TakeQuizModal
                  quiz={quiz}
                  userId={user.id}
                  companyId={company.id}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <a
            key={idx}
            href={`?page=${idx}`}
            className={`btn btn-sm ${idx === page ? "btn-primary" : "btn-outline"}`}
          >
            {idx + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
