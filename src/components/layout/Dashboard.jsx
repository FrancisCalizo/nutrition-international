import { styles } from "../../assets/styles";

export default function Dashboard({ children }) {
  return (
    <main className="flex-1 ml-[270px] mt-[80px] p-8 overflow-y-auto h-[calc(100vh-80px)]">
      {children}
    </main>
  );
}
