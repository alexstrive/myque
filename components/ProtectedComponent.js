import { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const ProtectedPage = ({ children, redirect }) => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session && redirect) {
      router.replace('/')
    }
  }, [session])

  return session ? children : <div></div>
}

export default ProtectedPage
