import { createContext, useEffect, useState } from 'react'
import { auth, GoogleAuthProvider, signInWithPopup } from '../services/firebase'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({})

export function AuthContextProvider(props) {
  const [user, setUser] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google account')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
        navigate('/')
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
      const { displayName, photoURL, uid } = result.user
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google account')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  async function closeSessionFromGoogle() {
    try {
      await auth.signOut()
      alert('Logout successfull')
      navigate('/sign-in')
    } catch (error) {
      alert('logout error', error)
    }
  }

  return <AuthContext.Provider value={{ user, signInWithGoogle, closeSessionFromGoogle }}>{props.children}</AuthContext.Provider>
}
