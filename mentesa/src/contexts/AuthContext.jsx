import { createContext, useEffect, useState } from 'react'
import { auth, GoogleAuthProvider, signInWithPopup } from '../services/firebase'
import { getUser } from '../services/usersRequests'

export const AuthContext = createContext({})

export function AuthContextProvider(props) {
  const [user, setUser] = useState()

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
        role: undefined,
        email: email,
      })
      fetch(uid)
    }
  }
  return <AuthContext.Provider value={{ user, setUser, signInWithGoogle }}>{props.children}</AuthContext.Provider>
}
