import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountController } from './useAccountController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts() {
  const {
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading,
    accounts,
    setSliderState,
    toggleValueVisibility,
  } = useAccountController();

  return (
    <div className="bg-teal-900 rounded-2xl h-full w-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner className='text-teal-950/50 fill-white w-10 h-10' />
        </div>
      )}

      {!isLoading && (
        <>
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
            {accounts.length === 0 && (
              <>
                <div
                  className="mb-4"
                >
                  <strong className="text-white tracking-[-1px] text-lg font-bold">
                    Minhas contas
                  </strong>
                </div>

                <button
                  className='mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white hover:bg-teal-950/5 transition-colors'
                >
                  <div className='w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center'>
                    <PlusIcon className='w-6 h-6' />
                  </div>
                  <span className='font-medium tracking-[-0.5px] block w-32 text-center'>
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
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
            )}

          </div>
        </>
      )}
    </div>
  )
}
