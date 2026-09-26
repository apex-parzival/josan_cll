/**
 * Shared helpers for the contact form and the chatbot.
 */

export const MAX_IMAGE_BYTES = 3 * 1024 * 1024

export function isEmailFormat(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// Keep digits only; drop a leading +1 country code so a pasted "+1 (403) 123-4567" still fits
export function toTenDigitPhone(value) {
  let digits = value.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
  return digits.slice(0, 10)
}

// Returns an error message, or '' if the file is an acceptable project photo
export function imageFileError(file) {
  if (file.size > MAX_IMAGE_BYTES) return 'File size exceeds the 3MB limit. Please upload a smaller image.'
  if (!file.type.startsWith('image/')) return 'Only image files (PNG, JPG, JPEG, WEBP) are supported.'
  return ''
}

// Resolves to the file's base64 content (without the data-URL prefix), as the email API expects
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = error => reject(error)
  })
}
