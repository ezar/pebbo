export const PET_COLORS=[{id:'coral',name:'Coral',hex:'#fb7185'},{id:'mint',name:'Menta',hex:'#34d399'},{id:'sky',name:'Cielo',hex:'#38bdf8'},{id:'sun',name:'Sol',hex:'#fbbf24'}] as const;
export const PET_VARIANTS=[{id:'sprout',name:'Brote',ear:'leaf'},{id:'pebble',name:'Guijarro',ear:'round'},{id:'starlet',name:'Estrella',ear:'star'}] as const;
export const getPetColor=(id:string)=>PET_COLORS.find(c=>c.id===id)??PET_COLORS[0];
export const getPetVariant=(id:string)=>PET_VARIANTS.find(v=>v.id===id)??PET_VARIANTS[0];
