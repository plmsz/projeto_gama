import { createContext, useEffect, useState } from 'react'
import { auth, GoogleAuthProvider, signInWithPopup, signOut } from '../services/firebase'
import toast from '../components/Toast'
import { getUser } from '../services/usersRequests'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({})

export function AuthContextProvider(props) {
  const [user, setUser] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async (userId) => {
      const [profile] = await getUser(userId)
      setUser((prev) => ({ ...prev, role: profile?.role }))
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google account')
        }
        setUser({
          userId: uid,
          name: displayName,
          avatar: photoURL,
          email: email,
        })
        fetch(uid)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    const result = await signInWithPopup(auth, provider)

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google account')
      }
      const fetch = async (uid) => {
        const [profile] = await getUser(uid)
        if (profile.length > 0) {
          setUser((prev) => ({ ...prev, role: profile?.role }))
        }
      }
      setUser({
        userId: uid,
        name: displayName,
        avatar: photoURL,
        role: undefined || 'professional',
        email: email,
      })
      fetch(uid)
    }
  }

  async function closeSessionFromGoogle() {
    try {
      await signOut(auth)
      toast.messageSuccess('Até breve!')
      setUser()
      setTimeout(() => navigate('/'), 500)
    } catch (error) {
      console.log(error)
      toast.messageError('Opa! Um erro inesperado aconteceu')
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signInWithGoogle, closeSessionFromGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}
