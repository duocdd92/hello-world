export interface Hero{
    id: number;
    name: string;
    age?: number;
    address?: string[],
    isFlyingHero: boolean;
}

export interface Address{
    city: string;
    street: number;
}