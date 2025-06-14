import { useState, useEffect } from 'react';
import BannerSlider from '../components/banner-slider.tsx';
import { Badge } from '../components/ui/badge.tsx';
import { Button } from '../components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs.tsx';
import {
  Download,
  Eye,
  Clock,
  Cloud,
  Leaf,
  WormIcon as Virus,
  TrendingUp,
  Bookmark,
  Link,
} from 'lucide-react';
import { useNavigate, useOutlet, useOutletContext } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import type { OutletContextType } from '../types/OutletContextType.ts';

// const API_BASE_URL = "http://localhost:8082"
const API_BASE_URL = 'http://54.180.238.119:8080';

// 샘플 데이터 - 실제 구현 시 API에서 가져오는 데이터로 대체
const dataSummary = {
  total: 1248,
  categories: {
    climate: {
      count: 523,
      percentage: 42,
      color: '#3498db',
      icon: 'cloud-rain',
      name: '기후',
    },
    environment: {
      count: 412,
      percentage: 33,
      color: '#2ecc71',
      icon: 'tree',
      name: '환경',
    },
    disease: {
      count: 313,
      percentage: 25,
      color: '#e74c3c',
      icon: 'virus',
      name: '질병',
    },
  },
};

// 배너 슬라이드 데이터
const bannerSlides = [
  {
    id: 1,
    imageUrl: '/images/data-visualization.png',
    title: '데이터로 세상을 읽다',
    description: '기후 변화, 건강 이슈, 환경의 흐름을 시각화로 이해하세요',
    category: '데이터 시각화',
    color: '#3498db',
  },
  {
    id: 2,
    imageUrl: '/images/climate.png',
    title: '기후 데이터 분석',
    description: '대기 및 기상 데이터를 통해 기후 변화의 패턴을 파악하세요',
    category: '기후',
    color: '#3498db',
    percentage: 42,
  },
  {
    id: 3,
    imageUrl: '/images/environment.png',
    title: '환경 모니터링',
    description: '산림과 생태계 데이터로 환경 변화를 추적하세요',
    category: '환경',
    color: '#2ecc71',
    percentage: 33,
  },
  {
    id: 4,
    imageUrl: '/images/disease.png',
    title: '질병 연구 데이터',
    description: '의약품 및 질병 관련 데이터를 활용한 연구를 지원합니다',
    category: '질병',
    color: '#e74c3c',
    percentage: 25,
  },
];

// API 응답 타입 정의
interface DatasetTheme {
  datasetThemeId: number;
  theme: string;
  region: string | null;
  dataYear: string | null;
  fileType: string | null;
  id: number;
}

// type DownloadSet = {};
type DownloadSet = unknown;

interface Dataset {
  datasetId: number;
  organization: string;
  title: string;
  description: string | null;
  createdDate: string | null;
  updateDate: string | null;
  view: number | null;
  download: number | null;
  license: string | null;
  keyword: string | null;
  analysis: string | null;
  name: string;
  datasetTheme: DatasetTheme;
  downloadSet: DownloadSet[];
  trend: string | null;
}

interface CategoryRatio {
  count: number;
  ratio: number;
}

interface CategoryRatios {
  [key: string]: CategoryRatio;
}

type Trend = {
  id: number;
  rank: number;
  rankDate: string;
  trendStatus: '상승' | '하락' | '유지';
  dataset: {
    datasetId: number;
  };
};

// 카테고리 아이콘 컴포넌트
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'climate':
    case '기후':
      return <Cloud className="h-5 w-5 text-white" />;
    case 'environment':
    case '환경':
      return <Leaf className="h-5 w-5 text-white" />;
    case 'disease':
    case '질병':
      return <Virus className="h-5 w-5 text-white" />;
    default:
      return null;
  }
};

// 트렌드 배지 컴포넌트
const TrendBadge = ({ trend }: { trend: string }) => {
  if (trend === '상승') {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <TrendingUp className="h-3 w-3 mr-1" /> 상승
      </Badge>
    );
  } else if (trend === '하락') {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
        <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> 하락
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
        유지
      </Badge>
    );
  }
};

// 카테고리 ID에 따른 정보 매핑
const categoryMapping = {
  1: { name: '기후', color: '#3498db', category: 'climate' },
  2: { name: '환경', color: '#2ecc71', category: 'environment' },
  3: { name: '질병', color: '#e74c3c', category: 'disease' },
};

// 카테고리 이름에 따른 색상 매핑
const categoryColorMapping: { [key: string]: string } = {
  기후: '#3498db',
  환경: '#2ecc71',
  질병: '#e74c3c',
};

// 카테고리 이름에 따른 영문 카테고리 매핑
const categoryNameMapping: { [key: string]: string } = {
  기후: 'climate',
  환경: 'environment',
  질병: 'disease',
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [animatedPercentages, setAnimatedPercentages] = useState<{
    [key: string]: number;
  }>({});
  const [totalDatasets, setTotalDatasets] = useState<number>(0);
  const [categoryRatios, setCategoryRatios] = useState<CategoryRatios>({});
  const [topDatasets, setTopDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 추천 데이터 클릭시 링크 연결 구현
  const [click, isClicked] = useState(false);
  const navigate = useNavigate();
  const listClick = (datasetId: string) => {
    isClicked(true);
    // const dId = e.currentTarget.dataset.datasetId;
    navigate(`/detail/${datasetId}`);
  };
  // API에서 추천 데이터셋 가져오기
  useEffect(() => {
    const fetchTopDatasets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/data-set/top9`);
        const data = await response.json();
        if (data.status === 'error') {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        setTopDatasets(data.data);
      } catch (err) {
        console.error('Error fetching top datasets:', err);
        setError('데이터를 불러오는데 문제가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopDatasets();
  }, []);
  //북마크 기능
  const [loading, setLoading] = useState(false);
  const { fetchBookmarkList, isLoggedIn } =
    useOutletContext<OutletContextType>();

  const handleAddBookmark = async (
    datasetId: string,
    onSuccess?: () => void
  ) => {
    // 로그인 여부 체크
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/users/scrap/${datasetId}`, {
        method: 'POST',
        credentials: 'include', // 세션/쿠키 인증 필요시
        // headers: { 'Authorization': `Bearer ${token}` }, // 토큰 인증 필요시
      });

      // }
      if (!response.ok) throw new Error('북마크 추가 실패');
      alert('북마크에 추가되었습니다!');
      fetchBookmarkList(); // 북마크 리스트 즉시 새로고침
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('북마크 추가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 메인 카드에서 다운로드 기능
  // 다운로드 버튼 클릭 시 CSV 다운로드

  const handleDownload = async (datasetId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/data-set/download/${datasetId}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error('다운로드 실패');
      }
      const blob = await response.blob();
      // 파일명 추출 (Content-Disposition 헤더에서)
      let filename = 'dataset.csv';
      const disposition = response.headers.get('Content-Disposition');
      if (disposition && disposition.indexOf('filename=') !== -1) {
        filename = decodeURIComponent(
          disposition.split('filename=')[1].replace(/['"]/g, '')
        );
      }
      // 파일 다운로드 처리
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('CSV 다운로드에 실패했습니다.');
    }
  };
  // 데이터셋 총 개수 가져오기
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/data-set/count`);
        const data = await response.json();
        if (data.status === 'error') {
          throw new Error('데이터셋 수를 불러오는데 실패했습니다.');
        }
        setTotalDatasets(data.data);
      } catch (err) {
        console.error('Error fetching dataset count:', err);
      }
    };

    fetchTotalCount();
  }, []);

  // 카테고리별 비율 가져오기
  useEffect(() => {
    const fetchCategoryRatios = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/data-set/ratio`);
        const data = await response.json();
        if (data.status === 'error') {
          throw new Error('카테고리 비율을 불러오는데 실패했습니다.');
        }
        setCategoryRatios(data.data);

        // 애니메이션을 위한 초기 비율 설정
        const initialPercentages: { [key: string]: number } = {};
        Object.keys(data.data).forEach((category) => {
          initialPercentages[
            categoryNameMapping[category] || category.toLowerCase()
          ] = 0;
        });
        setAnimatedPercentages(initialPercentages);

        // 애니메이션 효과
        setTimeout(() => {
          const animatedValues: { [key: string]: number } = {};
          Object.entries(data.data).forEach(([category, info]) => {
            const categoryKey =
              categoryNameMapping[category] || category.toLowerCase();
            animatedValues[categoryKey] = (info as CategoryRatio).ratio;
          });
          setAnimatedPercentages(animatedValues);
        }, 300);
      } catch (err) {
        console.error('Error fetching category ratios:', err);
      }
    };

    fetchCategoryRatios();
  }, []);

  // 활성 탭에 따른 데이터셋 필터링
  const filteredDatasets =
    activeTab === 'all'
      ? topDatasets
      : topDatasets.filter((dataset) => {
          const themeId = dataset.datasetTheme?.datasetThemeId;
          if (themeId === 1 && activeTab === 'climate') return true;
          if (themeId === 2 && activeTab === 'environment') return true;
          if (themeId === 3 && activeTab === 'disease') return true;
          return false;
        });

  // API 데이터를 UI에 맞게 변환하는 함수
  const mapDatasetToUI = (dataset: Dataset) => {
    const themeId = dataset.datasetTheme?.datasetThemeId || 1;
    const categoryInfo =
      categoryMapping[themeId as keyof typeof categoryMapping] ||
      categoryMapping[1];

    // 카테고리별 이미지 매핑
    let categoryImage = '/images/climate.jpg';
    if (themeId === 2) categoryImage = '/images/environment.jpg';
    if (themeId === 3) categoryImage = '/images/disease.jpg';

    return {
      id: dataset.datasetId,
      title: dataset.title,
      category: categoryInfo.category,
      categoryName: categoryInfo.name,
      color: categoryInfo.color,
      views: dataset.view || 0,
      downloads: dataset.download || 0,
      updatedAt: dataset.updateDate || '날짜 정보 없음',
      image: categoryImage,
      description: dataset.description || `${dataset.title} 데이터셋입니다.`,
      tags: [
        dataset.name,
        categoryInfo.name,
        dataset.organization?.split('.')[0] || '',
      ],
      trend: dataset.trend || '유지', // 기본값
    };
  };

  // 오늘 날짜 데이터 트렌드 가져오기
  useEffect(() => {
    const fetchTrends = async () => {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식

      try {
        const response = await fetch(
          `${API_BASE_URL}/trend/daily?date=${formattedDate}`
        );
        const datas = await response.json();

        if (datas.status === 'error') {
          throw new Error('트렌드 데이터를 불러오는데 실패했습니다.');
        }
        const trendData: Trend[] = datas.data;

        // 각 topDatasets에 trend 매핑
        setTopDatasets((prev) =>
          prev.map((dataset) => {
            const matchedTrend = trendData.find(
              (t) => t.dataset.datasetId === dataset.datasetId
            );
            return {
              ...dataset,
              trend: matchedTrend?.trendStatus || '유지', // '상승', '하락', '유지'
            };
          })
        );
      } catch (err) {
        console.error('트렌드 데이터 오류:', err);
      }
    };

    if (topDatasets.length > 0) {
      fetchTrends();
    }
  }, [topDatasets]);

  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/data-set/stats`);
        const datas = await response.json();
        if (datas.status === 'error') {
          throw new Error('데이터 개요 가져오기 실패');
        }
        const raw = datas.data;
        const parsed = Object.entries(raw).map(([ym, val]) => {
          const month = parseInt(ym.split('-')[1]) + '월';
          return { month, value: val['개수'] };
        });
        setStats(parsed);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);
  const maxValue = Math.max(...stats.map((i) => i.value), 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-0 py-8">
        {/* 히어로 섹션 - 슬라이드 배너로 변경 */}
        <div className="mb-10 w-full">
          <BannerSlider slides={bannerSlides} />
        </div>

        {/* 데이터 현황 - 대시보드 스타일 */}
        <section className="px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              전체 데이터 현황
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 데이터 요약 카드 */}
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl text-green-800">
                  데이터 현황
                </CardTitle>
                <CardDescription>
                  전체 데이터 개수 및 카테고리별 비율
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 mb-1">전체 데이터 개수</p>
                  <p className="text-4xl font-bold text-green-800">
                    {totalDatasets.toLocaleString()}개
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(categoryRatios).map(([category, info]) => {
                    const categoryKey =
                      categoryNameMapping[category] || category.toLowerCase();
                    const color = categoryColorMapping[category] || '#3498db';

                    return (
                      <div key={category} className="flex items-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white shadow-sm"
                          style={{ backgroundColor: color }}
                        >
                          <CategoryIcon category={category} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{category}</span>
                            <span className="font-medium">{info.ratio}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${
                                  animatedPercentages[categoryKey] || 0
                                }%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl text-green-800">
                  월별 증가 추이
                </CardTitle>
                <CardDescription>최근 6개월 데이터 증가 현황</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64 flex items-end justify-between px-6">
                  {stats.map((item) => {
                    const heightPercent = Math.max(
                      10,
                      (item.value / maxValue) * 90
                    );
                    return (
                      <div
                        key={item.month}
                        className="flex flex-col items-center w-1/6"
                      >
                        <div
                          className="w-8 bg-green-600 rounded-t-md transition-all duration-1000"
                          style={{
                            height: `${heightPercent * 2}px`,
                            opacity: 0.7,
                            boxShadow: '0 2px 8px rgba(56,161,105,0.08)',
                          }}
                        ></div>
                        <div className="mt-2 text-sm text-gray-600">
                          {item.month}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 카테고리 카드 */}
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl text-green-800">
                  카테고리 분석
                </CardTitle>
                <CardDescription>카테고리별 데이터 분포</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(categoryRatios).map(([category, info]) => {
                    const color = categoryColorMapping[category] || '#3498db';

                    return (
                      <div
                        key={category}
                        className="p-4 rounded-lg flex items-center justify-between transition-all hover:shadow-md cursor-pointer"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white shadow-sm"
                            style={{ backgroundColor: color }}
                          >
                            <CategoryIcon category={category} />
                          </div>
                          <div>
                            <p className="font-medium">{category}</p>
                            <p className="text-sm text-gray-600">
                              {/* {info.count.toLocaleString()}개 데이터셋 */}
                              {info && info.count != null
                                ? `${info.count.toLocaleString()}개 데이터셋`
                                : '데이터셋 없음'}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="hover:bg-white px-3 py-1 rounded text-sm font-semibold"
                          style={{ color: color, border: `1px solid ${color}` }}
                          onClick={() => {
                            // 쿼리 파라미터로 카테고리명 전달
                            navigate(
                              `/list?category=${encodeURIComponent(category)}`
                            );
                          }}
                        >
                          보기
                        </button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 추천 데이터셋 - 대시보드 스타일 */}
        <section className="px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">추천 데이터</h2>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-white border border-gray-200 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
              >
                전체
              </TabsTrigger>
              <TabsTrigger
                value="climate"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                기후
              </TabsTrigger>
              <TabsTrigger
                value="environment"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                환경
              </TabsTrigger>
              <TabsTrigger
                value="disease"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                질병
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="text-center py-10">데이터를 불러오는 중...</div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredDatasets.map((dataset) => {
                    const uiData = mapDatasetToUI(dataset);
                    return (
                      <Card
                        key={uiData.id}
                        className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        data-dataset-id={dataset.datasetId}
                      >
                        <div className="relative h-48">
                          <img
                            src={uiData.image || '/placeholder.svg'}
                            alt={uiData.title}
                            className="w-full h-full object-cover"
                            style={{ aspectRatio: '16/9' }} // 16:9 비율 추가
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge
                              className="mb-2 font-medium"
                              style={{
                                backgroundColor: uiData.color,
                                color: 'white',
                              }}
                            >
                              {uiData.categoryName}
                            </Badge>
                            <h3 className="text-lg font-bold text-white line-clamp-2">
                              {uiData.title}
                            </h3>
                          </div>
                        </div>
                        <CardContent
                          className="pt-4"
                          onClick={() => listClick(String(dataset.datasetId))}
                        >
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {uiData.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {uiData.tags.filter(Boolean).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{uiData.updatedAt}</span>
                            </div>
                            <TrendBadge trend={uiData.trend} />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between px-4 py-3 border-t">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{uiData.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              <span>{uiData.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() =>
                                handleDownload(String(dataset.datasetId))
                              }
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() =>
                                handleAddBookmark(String(dataset.datasetId))
                              }
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* 다른 탭 콘텐츠도 동일한 방식으로 구현 */}
            <TabsContent value="climate" className="mt-0">
              {isLoading ? (
                <div className="text-center py-10">데이터를 불러오는 중...</div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredDatasets.map((dataset) => {
                    const uiData = mapDatasetToUI(dataset);
                    return (
                      <Card
                        key={uiData.id}
                        className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        data-dataset-id={dataset.datasetId}
                      >
                        <div className="relative h-48">
                          <img
                            src={uiData.image || '/placeholder.svg'}
                            alt={uiData.title}
                            className="w-full h-full object-cover"
                            style={{ aspectRatio: '16/9' }} // 16:9 비율 추가
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge
                              className="mb-2 font-medium"
                              style={{
                                backgroundColor: uiData.color,
                                color: 'white',
                              }}
                            >
                              {uiData.categoryName}
                            </Badge>
                            <h3 className="text-lg font-bold text-white line-clamp-2">
                              {uiData.title}
                            </h3>
                          </div>
                        </div>
                        <CardContent className="pt-4" onClick={listClick}>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {uiData.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {uiData.tags.filter(Boolean).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{uiData.updatedAt}</span>
                            </div>
                            <TrendBadge trend={uiData.trend} />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between px-4 py-3 border-t">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{uiData.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              <span>{uiData.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() =>
                                handleDownload(String(dataset.datasetId))
                              }
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() =>
                                handleAddBookmark(String(dataset.datasetId))
                              }
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="environment" className="mt-0">
              {isLoading ? (
                <div className="text-center py-10">데이터를 불러오는 중...</div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredDatasets.map((dataset) => {
                    const uiData = mapDatasetToUI(dataset);
                    return (
                      <Card
                        key={uiData.id}
                        className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        data-dataset-id={dataset.datasetId}
                      >
                        <div className="relative h-48">
                          <img
                            src={uiData.image || '/placeholder.svg'}
                            alt={uiData.title}
                            className="w-full h-full object-cover"
                            style={{ aspectRatio: '16/9' }} // 16:9 비율 추가
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge
                              className="mb-2 font-medium"
                              style={{
                                backgroundColor: uiData.color,
                                color: 'white',
                              }}
                            >
                              {uiData.categoryName}
                            </Badge>
                            <h3 className="text-lg font-bold text-white line-clamp-2">
                              {uiData.title}
                            </h3>
                          </div>
                        </div>
                        <CardContent className="pt-4" onClick={listClick}>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {uiData.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {uiData.tags.filter(Boolean).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{uiData.updatedAt}</span>
                            </div>
                            <TrendBadge trend={uiData.trend} />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between px-4 py-3 border-t">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{uiData.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              <span>{uiData.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() =>
                                handleDownload(String(dataset.datasetId))
                              }
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() =>
                                handleAddBookmark(String(dataset.datasetId))
                              }
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="disease" className="mt-0">
              {isLoading ? (
                <div className="text-center py-10">데이터를 불러오는 중...</div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredDatasets.map((dataset) => {
                    const uiData = mapDatasetToUI(dataset);
                    return (
                      <Card
                        key={uiData.id}
                        className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        data-dataset-id={dataset.datasetId}
                      >
                        <div className="relative h-48">
                          <img
                            src={uiData.image || '/placeholder.svg'}
                            alt={uiData.title}
                            className="w-full h-full object-cover"
                            style={{ aspectRatio: '16/9' }} // 16:9 비율 추가
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge
                              className="mb-2 font-medium"
                              style={{
                                backgroundColor: uiData.color,
                                color: 'white',
                              }}
                            >
                              {uiData.categoryName}
                            </Badge>
                            <h3 className="text-lg font-bold text-white line-clamp-2">
                              {uiData.title}
                            </h3>
                          </div>
                        </div>
                        <CardContent className="pt-4" onClick={listClick}>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {uiData.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {uiData.tags.filter(Boolean).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{uiData.updatedAt}</span>
                            </div>
                            <TrendBadge trend={uiData.trend} />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between px-4 py-3 border-t">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{uiData.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              <span>{uiData.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() =>
                                handleDownload(String(dataset.datasetId))
                              }
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() =>
                                handleAddBookmark(String(dataset.datasetId))
                              }
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button
              className="bg-green-700 hover:bg-green-800 text-white"
              onClick={() => {
                // 쿼리 파라미터로 카테고리명 전달
                navigate('/list');
              }}
            >
              전체 데이터 보기
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
