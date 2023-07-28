import { useAuth } from "../../../app/hooks/useAuth"
import { Button } from "../../components/Button";

export function Dashboard() {
  const { signout } = useAuth();
  return (
    <>
      <h1>Dashboard page</h1>
      <Button onClick={signout}>Sair</Button>
    </>
  )
}
