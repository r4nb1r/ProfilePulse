interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="px-4 sm:px-0 mb-8">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  );
};

export default PageHeader;
