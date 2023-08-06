import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/services/bankAccountService";

export function useAccountController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
  } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginnig: true,
    isEnd: false,
  });

  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!data) {
      return 0;
    }

    return data.reduce((total, account) => total += account.currentBalance, 0)
  }, [data]);

  return {
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading: isFetching,
    accounts: data ?? [],
    setSliderState,
    toggleValueVisibility,
    openNewAccountModal,
    currentBalance,
  }
}
