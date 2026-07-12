export type ElapsedTime={realMs:number;gameHours:number};
export const calculateElapsedTime=(fromIso:string,toIso:string,timeScale=1):ElapsedTime=>{const from=Date.parse(fromIso);const to=Date.parse(toIso);const realMs=Number.isFinite(from)&&Number.isFinite(to)?Math.max(0,to-from):0;return{realMs,gameHours:(realMs/3_600_000)*timeScale};};
