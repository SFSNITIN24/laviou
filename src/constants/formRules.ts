import { Rule } from "antd/es/form";

export const formRules = {
  email: [
    { required: true, message: "Email address is required" },
    { type: "email" as const, message: "Please enter a valid email address" },
    { 
      max: 254, 
      message: "Email address cannot exceed 254 characters" 
    },
  ],
  
  password: [
    { required: true, message: "Password is required" },
    { 
      min: 8, 
      message: "Password must be at least 8 characters long" 
    },
    {
      max: 128,
      message: "Password cannot exceed 128 characters"
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    },
  ],
  
  oldPassword: [
    { required: true, message: "Current password is required" },
    { 
      min: 8, 
      message: "Password must be at least 8 characters long" 
    },
  ],
  
  newPassword: [
    { required: true, message: "New password is required" },
    { 
      min: 8, 
      message: "Password must be at least 8 characters long" 
    },
    {
      max: 128,
      message: "Password cannot exceed 128 characters"
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    },
  ],
  
  confirmPassword: (passwordField: string = "newPassword"): Rule[] => [
    { required: true, message: "Please confirm your password" },
    ({ getFieldValue }: any) => ({
      validator(_: any, value: string) {
        if (!value || getFieldValue(passwordField) === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Passwords do not match"));
      },
    }),
  ],
  
  firstName: [
    { required: true, message: "First name is required" },
    { 
      min: 2, 
      message: "First name must be at least 2 characters long" 
    },
    { 
      max: 50, 
      message: "First name cannot exceed 50 characters" 
    },
    {
      pattern: /^[a-zA-Z\s'-]+$/,
      message: "First name can only contain letters, spaces, hyphens, and apostrophes"
    },
  ],
  
  lastName: [
    { required: true, message: "Last name is required" },
    { 
      min: 2, 
      message: "Last name must be at least 2 characters long" 
    },
    { 
      max: 50, 
      message: "Last name cannot exceed 50 characters" 
    },
    {
      pattern: /^[a-zA-Z\s'-]+$/,
      message: "Last name can only contain letters, spaces, hyphens, and apostrophes"
    },
  ],
  
  otp: [
    { required: true, message: "OTP is required" },
    { 
      len: 6, 
      message: "OTP must be exactly 6 digits" 
    },
    {
      pattern: /^\d{6}$/,
      message: "OTP must contain only numbers"
    },
  ],
  
  phone: [
    { required: true, message: "Phone number is required" },
    {
      pattern: /^\+?[\d\s\-\(\)]+$/,
      message: "Please enter a valid phone number"
    },
    {
      min: 10,
      message: "Phone number must be at least 10 digits"
    },
    {
      max: 20,
      message: "Phone number cannot exceed 20 characters"
    },
  ],
  
  username: [
    { required: true, message: "Username is required" },
    {
      min: 3,
      message: "Username must be at least 3 characters long"
    },
    {
      max: 30,
      message: "Username cannot exceed 30 characters"
    },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores"
    },
  ],
  
  url: [
    { required: true, message: "URL is required" },
    {
      type: "url" as const,
      message: "Please enter a valid URL"
    },
  ],
  
  number: (min?: number, max?: number): Rule[] => {
    const rules: Rule[] = [
      { required: true, message: "This field is required" },
      { type: "number" as const, message: "Please enter a valid number" },
    ];
    
    if (min !== undefined) {
      rules.push({ 
        type: "number" as const, 
        min, 
        message: `Value must be at least ${min}` 
      });
    }
    
    if (max !== undefined) {
      rules.push({ 
        type: "number" as const, 
        max, 
        message: `Value cannot exceed ${max}` 
      });
    }
    
    return rules;
  },
  
  required: (message: string = "This field is required"): Rule[] => [
    { required: true, message },
  ],
  
  minLength: (length: number, message?: string): Rule[] => [
    { 
      min: length, 
      message: message || `Must be at least ${length} characters long` 
    },
  ],
  
  maxLength: (length: number, message?: string): Rule[] => [
    { 
      max: length, 
      message: message || `Cannot exceed ${length} characters` 
    },
  ],
  
  pattern: (regex: RegExp, message: string): Rule[] => [
    { pattern: regex, message },
  ],
};
