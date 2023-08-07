import { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";

type HandleApplyFiltersProps = {
  bankAccountId: string | undefined;
  year: number;
}

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const {
    transactions,
    isLoading,
    isInitialLoading,
    refetchTransactions,
  } = useTransactions(filters);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters(prevState => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleApplyFilters({ bankAccountId, year }: HandleApplyFiltersProps) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    filters,
    handleChangeFilters,
    handleApplyFilters,
  }
}
