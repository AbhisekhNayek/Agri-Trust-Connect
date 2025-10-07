// src/components/forms/ClaimFormModal.tsx
//@ts-nocheck
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Camera, MapPin, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GreenLeafLoader } from "@/components/ui/GreenLeafLoader"

interface ClaimFormData {
  claimType: string
  cropType: string
  areaAffected: string
  description: string
  photos: File[]
}

interface ClaimFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ClaimFormData) => void
}

const CLAIM_TYPES = [
  "Crop Damage",
  "Weather Loss",
  "Pest Damage",
  "Disease",
  "Fire",
  "Flood",
  "Other",
]

const CROP_TYPES = [
  "Rice",
  "Wheat",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Vegetables",
  "Fruits",
  "Other",
]

const buttonGlowVariants = {
  hover: {
    boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
    scale: 1.05,
    transition: { duration: 0.3 },
  },
}

export function ClaimFormModal({ isOpen, onClose, onSubmit }: ClaimFormModalProps) {
  const [formData, setFormData] = useState<ClaimFormData>({
    claimType: "",
    cropType: "",
    areaAffected: "",
    description: "",
    photos: [],
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ClaimFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ClaimFormData, string>> = {}
    if (!formData.claimType) newErrors.claimType = "Please select a claim type"
    if (!formData.cropType) newErrors.cropType = "Please select a crop type"
    if (!formData.areaAffected || parseFloat(formData.areaAffected) <= 0)
      newErrors.areaAffected = "Please enter a valid area"
    if (!formData.description || formData.description.length < 10)
      newErrors.description = "Description must be at least 10 characters"
    if (formData.photos.length === 0) newErrors.photos = "Please upload at least one photo"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ClaimFormData, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleInputChange("photos", [...formData.photos, ...files])
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    handleInputChange("photos", newPhotos)
  }

  const verifyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        () => {
          alert("Unable to verify location. Please enable GPS.")
        }
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      // Create FormData for multipart form submission
      const submissionData = new FormData()
      submissionData.append("claimType", formData.claimType)
      submissionData.append("cropType", formData.cropType)
      submissionData.append("areaAffected", formData.areaAffected)
      submissionData.append("description", formData.description)
      formData.photos.forEach((photo, index) => {
        submissionData.append(`photos`, photo)
      })
      if (location) {
        submissionData.append("latitude", location.latitude.toString())
        submissionData.append("longitude", location.longitude.toString())
      }

      // Send to API
      const response = await fetch("/api/claims/submit", {
        method: "POST",
        body: submissionData,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit claim")
      }

      // Call onSubmit callback
      onSubmit(formData)

      // Reset form
      setFormData({
        claimType: "",
        cropType: "",
        areaAffected: "",
        description: "",
        photos: [],
      })
      setLocation(null)
      onClose()
    } catch (error) {
      console.error("Error submitting claim:", error)
      alert(error.message || "Failed to submit claim. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div
            className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
            aria-hidden="true"
          />
          {isSubmitting && <GreenLeafLoader />}
          <motion.div
            className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md shadow-lg ${isSubmitting ? "hidden" : "block"}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-emerald-800/50 bg-emerald-900/50 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">File New Claim</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-emerald-400 transition-colors hover:bg-emerald-800/20 hover:text-emerald-300"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Claim Type */}
              <div className="space-y-2">
                <Label htmlFor="claimType" className="text-emerald-200">
                  Claim Type <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.claimType}
                  onValueChange={(value) => handleInputChange("claimType", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 focus:border-emerald-500 focus:ring-emerald-500">
                    <SelectValue placeholder="Select claim type" />
                  </SelectTrigger>
                  <SelectContent className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100">
                    {CLAIM_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.claimType && (
                  <p className="text-sm text-red-400">{errors.claimType}</p>
                )}
              </div>

              {/* Affected Area */}
              <div className="space-y-2">
                <Label className="text-emerald-200">
                  Affected Area <span className="text-red-400">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="number"
                      placeholder="Area (hectares)"
                      value={formData.areaAffected}
                      onChange={(e) => handleInputChange("areaAffected", e.target.value)}
                      className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                      step="0.01"
                      min="0"
                      disabled={isSubmitting}
                    />
                    {errors.areaAffected && (
                      <p className="mt-1 text-sm text-red-400">{errors.areaAffected}</p>
                    )}
                  </div>
                  <div>
                    <Select
                      value={formData.cropType}
                      onValueChange={(value) => handleInputChange("cropType", value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Crop Type" />
                      </SelectTrigger>
                      <SelectContent className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100">
                        {CROP_TYPES.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.cropType && (
                      <p className="mt-1 text-sm text-red-400">{errors.cropType}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-emerald-200">
                  Description <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the damage in detail..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-[100px] border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                  maxLength={500}
                  disabled={isSubmitting}
                />
                <div className="flex justify-between text-sm">
                  {errors.description && (
                    <p className="text-red-400">{errors.description}</p>
                  )}
                  <p className="ml-auto text-emerald-400">
                    {formData.description.length}/500
                  </p>
                </div>
              </div>

              {/* Evidence Upload */}
              <div className="space-y-2">
                <Label className="text-emerald-200">
                  Evidence <span className="text-red-400">*</span>
                </Label>
                <div className="rounded-lg border-2 border-dashed border-emerald-800/50 bg-emerald-900/50 p-8 text-center">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
                  <p className="mb-2 text-sm text-emerald-400">
                    Drop photos here or click to upload
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="photo-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300"
                      onClick={() => document.getElementById("photo-upload")?.click()}
                      disabled={isSubmitting}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Take Photo
                    </Button>
                  </label>
                </div>
                {errors.photos && (
                  <p className="text-sm text-red-400">{errors.photos}</p>
                )}
                {formData.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -right-2 -top-2 rounded-full bg-red-500/50 p-1 text-white hover:bg-red-600"
                          disabled={isSubmitting}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Location Verification */}
              <div className="rounded-lg border border-emerald-800/50 bg-emerald-800/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="font-semibold text-white">
                        {location ? "Location Verified" : "Verify Location"}
                      </p>
                      <p className="text-sm text-emerald-400">
                        {location
                          ? `Lat: ${location.latitude.toFixed(4)}, Lon: ${location.longitude.toFixed(4)}`
                          : "Click to verify GPS location"}
                      </p>
                    </div>
                  </div>
                  {location ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <motion.div variants={buttonGlowVariants} whileHover="hover">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={verifyLocation}
                        className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300"
                        disabled={isSubmitting}
                      >
                        Verify Now
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 border-emerald-800/50 text-emerald-400 hover:bg-emerald-800/20 hover:text-emerald-300"
                >
                  Cancel
                </Button>
                <motion.div variants={buttonGlowVariants} whileHover="hover">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-lg hover:from-green-700 hover:to-emerald-500 transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Claim"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}