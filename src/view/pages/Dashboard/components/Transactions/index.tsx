import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";

export function Transactions() {
  const { areValuesVisible } = useTransactionsController();
  return (
    <div className="bg-gray-100 rounded-2xl h-full w-full px-4 py-8 md:p-10 flex flex-col">
      <header>
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
            <ChevronDownIcon className="text-gray-900" />
          </button>

          <button>
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6 relative">
          <Swiper
            slidesPerView={3}
            centeredSlides
          >
            <SliderNavigation />
            {MONTHS.map((month, index) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <SliderOption isActive={isActive} month={month} index={index} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl gap-4">
          <div className="flex-1 flex items-center gap-3">
            <CategoryIcon type="expense" />

            <div>
              <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
              <span className="text-sm text-gray-600">04/06/2023</span>
            </div>
          </div>

          <span
            className={cn(
              "text-red-800 tracking-[-0.5px] font-medium",
              !areValuesVisible && 'blur-sm'
            )}
          >- {formatCurrency(100.00)}</span>
        </div>

        <div className="flex items-center justify-between bg-white p-4 rounded-2xl gap-4">
          <div className="flex-1 flex items-center gap-3">
            <CategoryIcon type="income" />

            <div>
              <strong className="font-bold tracking-[-0.5px] block">Salário</strong>
              <span className="text-sm text-gray-600">04/06/2023</span>
            </div>
          </div>

          <span
            className={cn(
              "text-green-800 tracking-[-0.5px] font-medium",
              !areValuesVisible && 'blur-sm'
            )}
          >{formatCurrency(1000.00)}</span>
        </div>
      </div>
    </div>
  )
}