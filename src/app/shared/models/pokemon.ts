import { Base } from '../interface/base';

export class Pokemon {
    id: number;
    name: string;
    image: string;
    specie: string;
    stats: Stat[];
    types: Type[];
    moves: Move;
    abilities: Ability[];
    height: number;
    weight: number;
    species: string;
}

export class Stat {
    base_stat: number;
    effort: number;
    stat: Base;
}

export class Type {
    slot: number;
    type: Base;
}

export class Move {
    move: Base;
    version_group_details: VersionGroupDetails[];
}

export class VersionGroupDetails {
    level_learned_at: number;
    move_learn_method: Base[];
    version_group: Base;
}

export class Ability {
    ability: Base;
    is_hidden: boolean;
    slot: number;
}