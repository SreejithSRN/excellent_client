export interface CourseEntity{
    _id?:string;
    title?: string;
    description?: string;    
    categoryRef?: Category;
    instructorRef?: Instructor; 
    language?: Language;
    level?: Level;
    pricing?: Pricing;
    lessons?:Lesson[];
    isBlocked?:boolean;
    thumbnail?:string
    isPassed?:boolean
    mark?:number
    isTestCompleted?:boolean

}

export enum Language{
    English="english",
    Hindi="hindi",
    Malayalam="malayalam"
}
export enum Level {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'expert'
}
interface Pricing {
    amount?: number;
    type?: PricingType;
}
export enum PricingType {
    Free = 'free',
    Paid = 'paid'
}

export interface Lesson { 
    _id?:string;  
    lessonNumber?: string,
    title?: string;
    description?: string; 
    video?: File|string;
    duration?: string;    
}

export interface Instructor {
    firstName?: string;
    lastName?: string;
    name?: string;
    _id?: string
  }
  export interface Category {
    name?: string;
  }
  

  export interface CourseFilterEntity {
    level?:string
    search?: string;
    category?: string;
    pricing?: string
    minPrice?: number;
    maxPrice?: number;
    sort?: string
  }
  
  