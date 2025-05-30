
export interface LoginFormData {
  email: string;
  password: string;
}

// Enums
export enum Role {
  Pending = "pending",
  Student = "student",
  Instructor = "instructor",
  Admin = "admin",
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Profession {
  Student = "student",
  Working = "working",
  NotWorking = "not working",
  Initial=""
}

export enum Qualification {
  SSLC = "sslc",
  PreDegree = "pre_degree",
  BachelorDegree = "bachelor_degree",
  PostGraduate = "post_graduate",
  MCA = "mca",
  BCA = "bca",
  Other = "other",
  Initial=""
}

// Interfaces
export interface Social {
  linkedin: string;
  github?: string;
  instagram?: string;
}

interface Contact {
  phone?: string;
  address?: string;
  social: Social;
}

interface Profile {
  avatar?: string |File;
  dateOfBirth?: string;
  gender?: Gender;
}

export interface SignupFormData {
  _id?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  name: string;
  profile: Profile; 
  contact: Contact; 
  profession?: Profession;
  qualification: Qualification; 
  role: Role; 
  profit?: string;
  isGAuth?: boolean;
  cv: File |string; 
  isVerified?: boolean;
  isRejected?: boolean;
  isRequested?: boolean;
  isOtpVerified?: boolean;
  isBlocked?: boolean;
  lastLoginDate?: Date;
  loginStreak?: number;
  weeklyLogins?: boolean[];
}



export interface Response {
  success: boolean;
  message?: string;
  data?: SignupFormData;
}

export interface Category{
  _id?:string,
  name:string,
  description:string,
  image:string,
  isBlocked?:boolean
}
