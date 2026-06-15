import { Header } from "@/components/layout/Header/Header"
import { Footer } from "@/components/layout/Footer/Footer"
import { MobileCTABar } from "@/components/layout/MobileCTABar"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileCTABar />
    </>
  )
}
