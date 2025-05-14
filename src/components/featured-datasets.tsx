import { Badge } from '../components/ui/badge.tsx';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../components/ui/card.tsx';
import { Download, Eye, Bookmark } from 'lucide-react';

// 샘플 데이터
const featuredData = [
  {
    id: 1,
    title: '전국 미세먼지 농도 데이터',
    category: 'environment',
    categoryName: '환경',
    color: '#2ecc71',
    views: 1245,
    downloads: 532,
    updatedAt: '2023-04-15',
  },
  {
    id: 2,
    title: '코로나19 지역별 확진자 현황',
    category: 'disease',
    categoryName: '질병',
    color: '#e74c3c',
    views: 2341,
    downloads: 1205,
    updatedAt: '2023-04-18',
  },
  {
    id: 3,
    title: '한반도 기후변화 예측 모델',
    category: 'climate',
    categoryName: '기후',
    color: '#3498db',
    views: 876,
    downloads: 321,
    updatedAt: '2023-04-10',
  },
];

export default function FeaturedDatasets() {
  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">추천 데이터셋</h2>
        <a
          href="/datasets"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          모든 데이터셋 보기 →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredData.map((dataset) => (
          <Card key={dataset.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <Badge
                className="w-fit mb-2"
                style={{
                  backgroundColor: dataset.color,
                  color: 'white',
                }}
              >
                {dataset.categoryName}
              </Badge>
              <h3 className="font-semibold text-lg line-clamp-2">
                {dataset.title}
              </h3>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{dataset.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  <span>{dataset.downloads.toLocaleString()}</span>
                </div>
                <div>{dataset.updatedAt} 업데이트</div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <a
                href={`/datasets/${dataset.id}`}
                className="text-sm font-medium hover:underline"
              >
                상세 보기
              </a>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
                  <Download className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
                  <Bookmark className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
