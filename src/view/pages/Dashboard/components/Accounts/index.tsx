import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountController } from './useAccountController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';

export function Accounts() {
  const {
    sliderState,
    windowWidth,
    areValuesVisible,
    setSliderState,
    toggleValueVisibility,
  } = useAccountController();

  return (
    <div className="bg-teal-900 rounded-2xl h-full w-full px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="tracking-[-0.5px] text-white block">
          Saldo total
        </span>
        <div className="flex items-center gap-2">
          <strong
            className={cn(
              "text-2xl tracking-[-1px] text-white",
              !areValuesVisible && 'blur-md'
            )}
          >
            {formatCurrency(1000)}
          </strong>
          <button className=" h-8 w-8 flex items-center justify-center" onClick={toggleValueVisibility}>
            <EyeIcon open={!areValuesVisible} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
            onSlideChange={swiper => {
              setSliderState({
                isBeginnig: swiper.isBeginning,
                isEnd: swiper.isEnd,
              })
            }}
          >
            <div
              className="flex items-center justify-between mb-4"
              slot='container-start'
            >
              <strong className="text-white tracking-[-1px] text-lg font-bold">
                Minhas contas
              </strong>

              <AccountSliderNavigation isBeginning={sliderState.isBeginnig} isEnd={sliderState.isEnd} />
            </div>

            <SwiperSlide>
              <AccountCard
              balance={1000.23}
              color="#7950f2"
              name="Nubank"
              type="CHECKING"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
              balance={1000.23}
              color="#333"
              name="XP"
              type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
              balance={1000.23}
              color="#0f0"
              name="Carteira"
              type="CASH"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}
