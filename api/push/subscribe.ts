import type { VercelRequest, VercelResponse } from '@vercel/node';
type PushSubscriptionLike={endpoint:string;keys?:{p256dh?:string;auth?:string}};
const isSub=(v:unknown):v is PushSubscriptionLike=>typeof v==='object'&&v!==null&&typeof (v as PushSubscriptionLike).endpoint==='string';
export default function handler(req:VercelRequest,res:VercelResponse){if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});const subscription=(req.body as {subscription?:unknown})?.subscription;if(!isSub(subscription))return res.status(400).json({error:'invalid_subscription'});return res.status(202).json({ok:true,message:'Subscription validated. Persist it in production storage before scheduled reminders.'});}
