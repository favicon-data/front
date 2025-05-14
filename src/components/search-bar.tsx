import { Button } from '../components/ui/button.tsx';
import { Input } from '../components/ui/input.tsx';
import { Search } from 'lucide-react';

// import '../index.css';

export default function SearchBar() {
  return (
    <div className="relative">
      <div className="flex">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            className="pl-10 py-6 text-base rounded-l-lg rounded-r-none border-r-0"
            placeholder="검색어를 입력하세요"
          />
        </div>
        <Button className="px-6 rounded-l-none bg-gray-800 hover:bg-gray-700">
          검색
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="text-sm text-gray-500">인기 검색어:</span>
        <Button variant="outline" size="sm" className="text-xs py-0 h-6">
          미세먼지
        </Button>
        <Button variant="outline" size="sm" className="text-xs py-0 h-6">
          기후변화
        </Button>
        <Button variant="outline" size="sm" className="text-xs py-0 h-6">
          코로나19
        </Button>
        <Button variant="outline" size="sm" className="text-xs py-0 h-6">
          수질오염
        </Button>
      </div>
    </div>
  );
}
