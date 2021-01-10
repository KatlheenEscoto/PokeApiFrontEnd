import { Base } from '../interface/base';
export class MoveAll {
    accuracy: number;
    contest_combos: Contestcombos;
    contest_effect: Contesteffect;
    contest_type: Base;
    damage_class: Base;
    effect_chance?: any;
    effect_changes: any[];
    effect_entries: Effectentry[];
    flavor_text_entries: Flavortextentry[];
    generation: Base;
    id: number;
    machines: any[];
    meta: Meta;
    name: string;
    names: Name[];
    past_values: any[];
    power: number;
    pp: number;
    priority: number;
    stat_changes: any[];
    super_contest_effect: Contesteffect;
    target: Base;
    type: Base;
}
  
interface Name {
    language: Base;
    name: string;
}
  
interface Meta {
    ailment: Base;
    ailment_chance: number;
    category: Base;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: number;
    max_turns?: any;
    min_hits: number;
    min_turns?: any;
    stat_chance: number;
}
  
interface Flavortextentry {
    flavor_text: string;
    language: Base;
    version_group: Base;
}
  
export class Effectentry {
    effect: string;
    language: Base;
    short_effect: string;
}
  
interface Contesteffect {
    url: string;
}
  
interface Contestcombos {
    normal: Normal;
    super: Super;
}
  
interface Super {
    use_after?: any;
    use_before?: any;
}
  
interface Normal {
    use_after: Base[];
    use_before?: any;
}
  