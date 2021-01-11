import { Base } from '../interface/base';

export class Move {
    id: number;
    name: string;
    pp: number;
    effect: EffectEntries[]; // List.
    priority: number;
    crit_rate: number;
    flinch_chance: number;
    accuracy: number;
    power: number;
    type_name: string;
    category_name: string;
}

export class EffectEntries {
    effect: string;
    language: Base;
    short_effect: string;
}