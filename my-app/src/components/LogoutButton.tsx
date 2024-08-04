"use client";
export const dynamic = 'force-dynamic'
import { Keluar } from "@/actions/auth";
export default  function Logout() {
  return (
    <button
      onClick={async () => {
        Keluar();
      }}
    >
      Logout
    </button>
  );
}
