//C:\Users\19892\Desktop\automation\src\app\(main)\(pages)\workflows\editor\page.tsx
'use client'
import { useRouter } from "next/navigation"

const Page = ( ) => {
    const router = useRouter()

  return router.push("/workflows")

}

export default Page
