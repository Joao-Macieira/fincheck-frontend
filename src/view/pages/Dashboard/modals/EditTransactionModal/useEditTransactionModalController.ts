import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";

const schema = z.object({
  value: z.union([
    z.string().nonempty('Informe o valor'),
    z.number(),
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.category?.id,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    }
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => (
    categoriesList.filter(category => category.type === transaction?.type)
  ), [categoriesList, transaction]);

  const { isLoading, mutateAsync } = useMutation(transactionService.update);

  const {
    isLoading: isLoadingRemove,
    mutateAsync: removeTransaction,
  } = useMutation(transactionService.remove);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(transaction!.type === 'EXPENSE' ? 'Despesa editada com sucesso!' : 'Receita editada com sucesso!');
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao editar a despesa cadastrada com sucesso!'
          : 'Erro ao editar a receita cadastrada com sucesso!'
      );
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(`A ${transaction!.type === 'EXPENSE' ? 'despesa' : 'receita'} foi deletada com sucesso!`);
      onClose();
    } catch {
      toast.error(`Erro ao deletar a ${transaction!.type === 'EXPENSE' ? 'despesa' : 'receita'}`);
    }
  }


  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingRemove,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  }
}
