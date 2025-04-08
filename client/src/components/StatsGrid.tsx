import { 
  BarChart, 
  CheckCircle, 
  Clock 
} from "lucide-react";

interface StatsGridProps {
  stats: {
    total: number;
    optimized: number;
    pending: number;
  };
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  const statItems = [
    {
      title: "Total Profiles",
      value: stats.total,
      icon: <BarChart className="h-6 w-6 text-white" />,
      bgColor: "bg-primary"
    },
    {
      title: "Optimized",
      value: stats.optimized,
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      bgColor: "bg-[#0891b2]" // Secondary color from design
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <Clock className="h-6 w-6 text-white" />,
      bgColor: "bg-[#f59e0b]" // Warning color from design
    },
  ];

  return (
    <div className="px-4 sm:px-0">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statItems.map((stat, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.bgColor} rounded-md p-3`}>
                  {stat.icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-500 truncate">
                      {stat.title}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-slate-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
