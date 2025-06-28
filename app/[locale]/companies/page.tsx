const mockCompanies = [
    { id: 1, name: 'TechCorp' },
    { id: 2, name: 'Business Ltd.' },
];

export default function CompaniesPage() {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4">Companies</h1>
            <ul className="menu bg-base-100 w-56 rounded-box">
                {mockCompanies.map(company => (
                    <li key={company.id}>
                        <a href={`/companies/${company.id}`}>{company.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
