import {use} from "react";

const mockCompanyData = {
  '1': { name: 'TechCorp', industry: 'Software' },
  '2': { name: 'Business Ltd.', industry: 'Consulting' },
};

export default function CompanyProfile({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = use(params);
  const company = mockCompanyData[id as keyof typeof mockCompanyData];

  if (!company) return <div className="p-10">Company not found</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <p>Industry: {company.industry}</p>
    </div>
  );
}
