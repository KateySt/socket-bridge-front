import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCompany } from '@/api/companies';
import CreateQuizModal from '@/component/CreateQuizModal/CreateQuizModal';
import {getCompanyQuizzes} from "@/api/quizzes";
/*
export default async function CompanyQuizzesPage({ params }: { params: { id: string, locale: string } }) {
  const cookieStore = await cookies();
  const user = JSON.parse(cookieStore.get("user")?.value ?? '{}');

  const company = await getCompany(params.id);
  const quizzes = await getCompanyQuizzes(params.id);

  if (!user || !company || !company.id) {
    redirect('/login');
  }

  const isAdmin = user.id === company.owner_id || company.admins?.includes(user.id);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Quizzes for {company.name}</h1>

      {isAdmin && (
        <CreateQuizModal companyId={company.id} ownerId={user.id} />
      )}

      {quizzes.length === 0 ? (
        <p>No quizzes available for this company.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz: any) => (
            <div key={quiz.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
              <p className="text-sm">Frequency: every {quiz.frequencyDays} days</p>
              <ul className="list-disc list-inside mt-2">
                {quiz.questions.map((q: any, index: number) => (
                  <li key={index}>
                    <strong>{q.text}</strong>
                    <ul className="list-circle ml-6">
                      {q.options.map((option: string, idx: number) => (
                        <li key={idx} className={q.correctAnswers.includes(option) ? 'font-bold text-green-600' : ''}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              {isAdmin && (
                <div className="flex gap-2 mt-4">
                  <EditQuizModal quiz={quiz} ownerId={user.id} />
                  <DeleteQuizModal
                    onDelete={async () => {
                      'use server';
                      await deleteQuiz(quiz.id, user.id);
                      redirect(`/companies/${params.id}/quizzes`);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
*/