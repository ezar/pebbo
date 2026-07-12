export type PetStage='baby';
export type PetNeed='hunger'|'happiness'|'hygiene'|'energy'|'health';
export type PetStatus={hunger:number;happiness:number;hygiene:number;energy:number;health:number};
export type Pet={id:string;name:string;createdAt:string;lastUpdatedAt:string;variantId:string;colorId:string;stage:PetStage;status:PetStatus;asleep:boolean};
export type PetAction='feed'|'play'|'clean'|'sleep'|'wake';
export type EmotionalState='happy'|'sleeping'|'hungry'|'sad'|'messy'|'tired'|'poorly'|'calm';
