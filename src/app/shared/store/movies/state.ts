import {Films, People, Species} from './models';

export interface State {
    films: Films[],
    people: People[],
    species: any
}