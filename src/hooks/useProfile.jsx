import { useState, useEffect } from 'react'
import { db } from '../lib/supabaseClient'
import { useAuth } from './useAuth'

export const useProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  // Fetch profile on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { profile: userProfile, error } = await db.users.getCurrentUserProfile()
      
      if (error) {
        console.error('Error fetching profile:', error)
        setError(error.message)
      } else {
        setProfile(userProfile)
      }
    } catch (err) {
      console.error('Error in fetchProfile:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await db.users.updateProfile(user.id, {
        ...updates,
        updated_at: new Date().toISOString()
      })
      
      if (error) {
        console.error('Error updating profile:', error)
        setError(error.message)
        return { error }
      } else {
        // Refresh profile data
        await fetchProfile()
        return { data }
      }
    } catch (err) {
      console.error('Error in updateProfile:', err)
      setError(err.message)
      return { error: err }
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (profileData) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await db.users.createProfile({
        id: user.id,
        ...profileData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      
      if (error) {
        console.error('Error creating profile:', error)
        setError(error.message)
        return { error }
      } else {
        // Refresh profile data
        await fetchProfile()
        return { data }
      }
    } catch (err) {
      console.error('Error in createProfile:', err)
      setError(err.message)
      return { error: err }
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    createProfile,
    refreshProfile: fetchProfile
  }
} 