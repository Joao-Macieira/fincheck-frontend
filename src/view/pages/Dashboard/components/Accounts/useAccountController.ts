import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";

export function useAccountController() {
  const windowWidth = useWindowWidth();

  const [sliderState, setSliderState] = useState({
    isBeginnig: true,
    isEnd: false,
  });

  return {
    sliderState,
    windowWidth,
    setSliderState,
  }
}
