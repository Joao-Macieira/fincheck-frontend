import { iconsMap } from "./iconsMap";

interface BankAccountTypeProps {
  type: keyof typeof iconsMap
}

export function BankAccountTypeIcon({ type }: BankAccountTypeProps) {
  const Icon = iconsMap[type];

  return <Icon />;
}
