// OTP Validation and Utility Functions

export const validateOtpFormat = (otp: string): boolean => {
  // Check if OTP is exactly 4 digits
  return /^\d{4}$/.test(otp);
};

export const formatOtpForDisplay = (otp: string): string => {
  // Format OTP with spaces for better readability
  return otp.replace(/(\d)(?=(\d{2})+$)/g, '$1 ');
};

export const generateMockOtp = (): string => {
  // Generate a random 4-digit OTP for testing
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const maskEmail = (email: string): string => {
  if (!email) return '';
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;
  
  const maskedUsername = username.length > 2 
    ? username.substring(0, 2) + '*'.repeat(username.length - 2)
    : username;
  return `${maskedUsername}@${domain}`;
};

export const formatCountdown = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const calculateAttemptsRemaining = (currentAttempts: number, maxAttempts: number): number => {
  return Math.max(0, maxAttempts - currentAttempts);
};

export const isOtpExpired = (sentTime: number, expiryMinutes: number = 5): boolean => {
  const now = Date.now();
  const expiryTime = sentTime + (expiryMinutes * 60 * 1000);
  return now > expiryTime;
}; 