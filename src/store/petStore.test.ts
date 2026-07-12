import { describe, expect, it, beforeEach } from 'vitest';import { usePetStore } from './petStore';
beforeEach(()=>{localStorage.clear();usePetStore.setState({pet:null});});
describe('pet store persistence',()=>{it('recupera el estado persistido',()=>{usePetStore.getState().createNewPet('Nube','sprout','sky');const saved=usePetStore.getState().pet;expect(saved?.name).toBe('Nube');const raw=localStorage.getItem('pebbo-pet-v1');expect(raw).toContain('Nube')});});
