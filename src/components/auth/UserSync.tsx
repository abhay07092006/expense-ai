"use client";

import { useEffect } from "react";

import { ensureUserExists } from "@/actions/user.actions";

export default function UserSync() {
  useEffect(() => {
    ensureUserExists();
  }, []);

  return null;
}