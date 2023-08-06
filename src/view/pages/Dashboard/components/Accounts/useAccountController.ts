import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
  } = useDashboard();

  const { accounts, isFetching } = useBankAccounts();

  const [sliderState, setSliderState] = useState({
    isBeginnig: true,
    isEnd: false,
  });

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total += account.currentBalance, 0)
  }, [accounts]);

  return {
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading: isFetching,
    accounts,
    setSliderState,
    toggleValueVisibility,
    openNewAccountModal,
    currentBalance,
  }
}
