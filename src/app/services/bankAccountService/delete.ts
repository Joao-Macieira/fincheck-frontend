import { httpClient } from "../httpClient";

export async function remove(bankAcocuntId: string) {
  const { data } = await httpClient.delete(`/bank-accounts/${bankAcocuntId}`);

  return data;
}
