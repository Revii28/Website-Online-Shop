export const dynamic = 'force-dynamic'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function ProtectedComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("accessToken");
  if (!token) {
    return redirect("/login");
  }
  return children
}
