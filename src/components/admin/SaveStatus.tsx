"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function SaveStatus({ saved, error }: { saved?: string; error?: boolean }) {
  const router = useRouter()

  useEffect(() => {
    if (saved) {
      toast.success("Content saved successfully")
      router.replace(window.location.pathname, { scroll: false })
    } else if (error) {
      toast.error("Failed to save content. Please try again.")
      router.replace(window.location.pathname, { scroll: false })
    }
  }, [saved, error, router])

  return null
}
