import { Base } from '../interface/base';

export class PokemonAll {
    abilities: Ability[];
    base_experience: number;
    forms: Base[];
    game_indices: Gameindex[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    species: Base;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
  }
  
export class Type {
    slot: number;
    type: Base;
}
  
export class Stat {
    base_stat: number;
    effort: number;
    stat: Base;
}
  
export class Sprites {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
    other: any;
    versions: any;
}

export class Move {
    move: Base;
    version_group_details: Versiongroupdetail[];
}
  
export interface Versiongroupdetail {
    level_learned_at: number;
    move_learn_method: Base;
    version_group: Base;
}

export class Gameindex {
    game_index: number;
    version: Base;
}
  
export class Ability {
    ability: Base;
    is_hidden: boolean;
    slot: number;
}
