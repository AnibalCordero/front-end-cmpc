import { useAutoLogout } from "@/hooks/useAutoLogout";
import { Header } from "./Header";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  useAutoLogout();
  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>{children}</main>
    </>
  );
};
