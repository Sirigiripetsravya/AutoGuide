import React from 'react';
import { BarChart, FileText, Users, Clock } from 'lucide-react';

const stats = [
  {
    name: 'Total Documents',
    value: '2,345',
    icon: FileText,
    change: '+12.3%',
  },
  {
    name: 'Active Users',
    value: '573',
    icon: Users,
    change: '+8.2%',
  },
  {
    name: 'Processing Time',
    value: '1.2s',
    icon: Clock,
    change: '-15.1%',
  },
  {
    name: 'Success Rate',
    value: '98.5%',
    icon: BarChart,
    change: '+2.3%',
  },
];

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden rounded-lg border shadow-sm"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};