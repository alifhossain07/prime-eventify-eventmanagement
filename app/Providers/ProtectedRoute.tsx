// app/ProtectedRoute.tsx
"use client";
import { useRouter, usePathname } from "next/navigation";

import { useContext, useEffect } from "react";

import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  //@ts-expect-error:myLifeMyRules
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      Swal.fire({
        icon: "warning",
        title: "You Must Sign In First",
        showConfirmButton: true,
        confirmButtonText: "Go to Sign In",
      }).then(() => {
        router.push(`/sign-in?redirect=${pathname}`);
      });
    }
  }, [user, pathname, router]);

  if (user === null) {
    return null; // Prevent rendering while redirecting
  }

  return <>{children}</>;
}
