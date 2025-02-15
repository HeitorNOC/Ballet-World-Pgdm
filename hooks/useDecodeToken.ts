// hooks/useDecodedToken.ts
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getToken } from '@/hooks/useSecureStorage'

type DecodedToken = {
  sub: string
  email: string
  userType: 'student' | 'professor' | 'admin'
  iat?: number
  exp?: number
}

export function useDecodedToken() {
  const [decoded, setDecoded] = useState<DecodedToken | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAndDecode() {
      const token = await getToken()
      if (token) {
        const result = jwtDecode<DecodedToken>(token)
        setDecoded(result)
      }
      setLoading(false)
    }
    fetchAndDecode()
  }, [])

  return { decoded, loading }
}
