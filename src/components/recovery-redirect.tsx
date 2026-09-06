"use client";

import { useEffect } from "react";

// Supabase recovery emails can land on the site root with implicit-flow
// tokens in the URL fragment (Site URL fallback). Nothing on the landing
// page consumes them — forward the whole hash to the reset form.
export default function RecoveryRedirect() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      window.location.replace(`/update-password${hash}`);
    }
  }, []);

  return null;
}
