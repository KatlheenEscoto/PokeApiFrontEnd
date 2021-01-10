import { Base } from '../interface/base';
export class ItemAll {
    attributes: Base[];
    baby_trigger_for?: any;
    category: Base;
    cost: number;
    effect_entries: Effectentry[];
    flavor_text_entries: Flavortextentry[];
    fling_effect?: any;
    fling_power?: any;
    game_indices: Gameindex[];
    held_by_pokemon: any[];
    id: number;
    machines: any[];
    name: string;
    names: Name[];
    sprites: Sprites;
}
  
interface Sprites {
    default: string;
}
    
interface Name {
    language: Base;
    name: string;
}
  
interface Gameindex {
    game_index: number;
    generation: Base;
}
  
interface Flavortextentry {
    language: Base;
    text: string;
    version_group: Base;
}
  
export class Effectentry {
    effect: string;
    language: Base;
    short_effect: string;
}
  
