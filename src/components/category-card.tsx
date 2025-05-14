import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Cloud, Leaf, WormIcon as Virus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  count: number;
  percentage: number;
  color: string;
  icon: string;
}

export default function CategoryCard({
  name,
  count,
  percentage,
  color,
  icon,
}: CategoryCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud-rain':
        return <Cloud className="h-6 w-6" />;
      case 'tree':
        return <Leaf className="h-6 w-6" />;
      case 'virus':
        return <Virus className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const getTitle = (name: string) => {
    switch (name) {
      case 'climate':
        return '기후';
      case 'environment':
        return '환경';
      case 'disease':
        return '질병';
      default:
        return name;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: color }}
          >
            {getIcon(icon)}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{getTitle(name)}</h3>
            <p className="text-sm text-gray-500">
              {count.toLocaleString()}개 데이터셋
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-500">전체 데이터 중</span>
          <span className="font-medium" style={{ color }}>
            {percentage}%
          </span>
        </div>
        <Progress
          value={percentage}
          className="h-2 transition-all"
          // indicatorClassName="transition-all"
          style={{ backgroundColor: color }}
        />
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          to={`/category/${name}`}
          className="text-sm font-medium hover:underline"
          style={{ color }}
        >
          모든 {getTitle(name)} 데이터 보기 →
        </Link>
      </CardFooter>
    </Card>
  );
}
