"use client";

import { useEffect } from "react";

export function FaqJump() {
  useEffect(() => {
    window.location.replace("/#faq");
  }, []);

  return (
    <p className="px-5 py-16 text-sm text-muted sm:px-8">Opening FAQ…</p>
  );
}
