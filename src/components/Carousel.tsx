import React, { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useIsMobile } from '@/utils/isMobile'

interface CarouselProps {
  children: React.ReactNode[]
  itemsPerSlide: number
  totalCount: number
}

export const Carousel: React.FC<CarouselProps> = ({ children, itemsPerSlide, totalCount }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const isMobile = useIsMobile()
  const effectiveItemsPerSlide = isMobile ? 1 : itemsPerSlide
  const totalPages = Math.ceil(totalCount / effectiveItemsPerSlide)

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  const buttonStyle =
    'absolute top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200 z-10'

  useEffect(() => {
    setCurrentPage(0)
  }, [isMobile])

  return (
    <div className="relative">
      <div className="overflow-hidden mx-10">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <div key={pageIndex} className="flex w-full flex-shrink-0">
              {children.slice(pageIndex * effectiveItemsPerSlide, (pageIndex + 1) * effectiveItemsPerSlide)}
            </div>
          ))}
        </div>
      </div>
      {currentPage > 0 && (
        <button onClick={prevPage} className={`${buttonStyle} left-0`} aria-label="Previous slide">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}
      {currentPage < totalPages - 1 && (
        <button onClick={nextPage} className={`${buttonStyle} right-0`} aria-label="Next slide">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
