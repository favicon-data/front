// "use client"

import { useEffect, useState } from 'react';
import { Cloud, Droplets, Leaf, WormIcon as Virus } from 'lucide-react';

interface CategoryData {
  count: number;
  percentage: number;
  color: string;
  icon: string;
}

interface DataSummary {
  total: number;
  categories: {
    climate: CategoryData;
    environment: CategoryData;
    disease: CategoryData;
  };
}

interface DataBannerProps {
  data: DataSummary;
}

export default function DataBanner({ data }: DataBannerProps) {
  const [animatedPercentages, setAnimatedPercentages] = useState({
    climate: 0,
    environment: 0,
    disease: 0,
  });

  useEffect(() => {
    // 애니메이션 효과를 위한 타이머 설정
    const timer = setTimeout(() => {
      setAnimatedPercentages({
        climate: data.categories.climate.percentage,
        environment: data.categories.environment.percentage,
        disease: data.categories.disease.percentage,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [data]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud-rain':
        return <Cloud className="h-5 w-5" />;
      case 'tree':
        return <Leaf className="h-5 w-5" />;
      case 'virus':
        return <Virus className="h-5 w-5" />;
      default:
        return <Droplets className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">데이터 현황</h2>
            <p className="text-gray-600">
              총{' '}
              <span className="font-semibold">
                {data.total.toLocaleString()}
              </span>
              개의 데이터셋
            </p>
          </div>

          <div className="flex space-x-6">
            {Object.entries(data.categories).map(([key, category]) => (
              <div key={key} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: category.color }}
                  >
                    {getIcon(category.icon)}
                  </div>
                  <span className="font-medium capitalize">{key}</span>
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: category.color }}
                >
                  {category.percentage}%
                </div>
                <div className="text-sm text-gray-500">
                  {category.count.toLocaleString()}개
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div
              className="transition-all duration-1000 ease-out"
              style={{
                width: `${animatedPercentages.climate}%`,
                backgroundColor: data.categories.climate.color,
              }}
            />
            <div
              className="transition-all duration-1000 ease-out"
              style={{
                width: `${animatedPercentages.environment}%`,
                backgroundColor: data.categories.environment.color,
              }}
            />
            <div
              className="transition-all duration-1000 ease-out"
              style={{
                width: `${animatedPercentages.disease}%`,
                backgroundColor: data.categories.disease.color,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
