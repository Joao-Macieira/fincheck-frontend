import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValueVisibility } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginnig: true,
    isEnd: false,
  });

  return {
    sliderState,
    windowWidth,
    areValuesVisible,
    setSliderState,
    toggleValueVisibility,
  }
}
