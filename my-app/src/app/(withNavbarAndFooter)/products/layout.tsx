import ProtectedComponent from "@/components/ProtectedComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ProtectedComponent>{children}</ProtectedComponent>
    </div>
  );
}
