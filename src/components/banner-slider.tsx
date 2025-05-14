// 'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '../lib/utils.ts';

interface BannerSlide {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  color: string;
  percentage?: number;
}

interface BannerSliderProps {
  slides: BannerSlide[];
  autoSlideInterval?: number;
}

export default function BannerSlider({
  slides,
  autoSlideInterval = 5000,
}: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides, isTransitioning]);

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning || slideIndex === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(slideIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // 트랜지션 종료 후 상태 업데이트
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  // 자동 슬라이드 설정/해제
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, autoSlideInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide, autoSlideInterval, isPlaying]);

  return (
    <div className="relative w-full h-[350px] group overflow-hidden">
      {/* 슬라이드 이미지 컨테이너 */}
      <div
        className="w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0">
            <img
              src={slide.imageUrl || '/images/data-visualization.png'}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* 좌우 화살표 */}
      <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer items-center justify-center hover:bg-black/40 z-10">
        <ChevronLeft onClick={prevSlide} size={24} />
      </div>
      <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer items-center justify-center hover:bg-black/40 z-10">
        <ChevronRight onClick={nextSlide} size={24} />
      </div>

      {/* 재생/일시정지 버튼 */}
      <div
        className="absolute bottom-4 right-4 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-colors z-10"
        onClick={togglePlayPause}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </div>

      {/* 하단 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={cn(
              'w-3 h-3 rounded-full cursor-pointer transition-all',
              currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}
