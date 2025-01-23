export interface CourseEntity{
    _id?:string;
    title?: string;
    description?: string;
    categoryRef?: string;
    instructorRef?: string;
    language?: Language;
    level?: Level;
    pricing?: Pricing;

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