import useEmblaCarousel from "embla-carousel-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useBanners } from "@/hooks/use-banners"
import type { Banner } from "@/types/banner.type"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const BannerCarousel = () => {
    const { banners, isLoading } = useBanners()
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        dragFree: false,
        containScroll: "trimSnaps",
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback((api: any) => {
        setPrevBtnDisabled(!api.canScrollPrev())
        setNextBtnDisabled(!api.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on("reInit", onSelect)
        emblaApi.on("select", onSelect)
    }, [emblaApi, onSelect])

    const containerPadding = "pl-[max(1.25rem,calc((100vw-82.5rem)/2+1.25rem))] pr-7"

    if (isLoading) return (
        <div>
            <div className="max-w-7xl mx-auto px-5">
                <Skeleton className="h-4 w-40" />
            </div>
            <div className={`flex gap-7 my-5 overflow-hidden ${containerPadding}`}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="flex-[0_0_360px] h-32 rounded-xl" />
                ))}
            </div>
        </div>
    )

    return (
        <div className="relative group">
            <div className="max-w-7xl mx-auto px-5 flex justify-between items-end">
                <h2 className="font-semibold text-lg">Temukan promo menarik</h2>

                {/* Navigation Buttons */}
                <div className="flex gap-2 mb-1">
                    <Button
                        variant="outline"
                        className="size-8 disabled:opacity-30"
                        onClick={scrollPrev}
                        disabled={prevBtnDisabled}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8 disabled:opacity-30"
                        onClick={scrollNext}
                        disabled={nextBtnDisabled}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>

            <div ref={emblaRef} className="overflow-hidden">
                <div className={`flex my-5 gap-7 ${containerPadding}`}>
                    {banners.map((banner: Banner) => (
                        <div key={banner.banner_name} className="flex-[0_0_360px] min-w-0">
                            <img
                                src={banner.banner_image}
                                alt={banner.banner_name}
                                className="w-full h-auto object-cover rounded-xl"
                            />
                        </div>
                    ))}
                    <div className="flex-[0_0_1px] min-w-px" />
                </div>
            </div>
        </div>
    )
}

export default BannerCarousel
