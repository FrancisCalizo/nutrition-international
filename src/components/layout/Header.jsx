export default function Header({ children }) {
  return (
    <div className="fixed top-0 left-[270px] right-0 h-[80px] bg-[#f3f4f6] flex justify-between items-center px-8 z-2 border-b border-[#e5e7eb]">
      {children}
    </div>
  );
}
