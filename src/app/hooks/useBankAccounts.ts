import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../services/bankAccountService";

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountService.getAll,
    staleTime: Infinity,
  });

  return {
    accounts: data ?? [],
    isFetching
  }
}
