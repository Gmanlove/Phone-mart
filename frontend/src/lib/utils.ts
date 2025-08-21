// Utility to combine class names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Utility to extract Cloudinary public ID from a Cloudinary URL
export function extractCloudinaryPublicId(url: string) {
  if (!url) return null;
  // Handles URLs like: https://res.cloudinary.com/demo/image/upload/v1234567890/folder/filename.jpg
  // Returns: folder/filename (without extension)
  try {
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?(?:\?.*)?$/);
    if (matches && matches[1]) {
      // Remove file extension if present
      return matches[1].replace(/\.[a-zA-Z0-9]+$/, "");
    }
    return null;
  } catch {
    return null;
  }
}

// Format number as Nigerian Naira currency string, e.g. ₦1,234.56
export function formatCurrency(amount: number) {
  try {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 2 }).format(amount)
  } catch {
    // Fallback
    return `₦${amount.toFixed(2)}`
  }
}
