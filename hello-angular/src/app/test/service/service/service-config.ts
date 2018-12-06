export class ServiceConfig {
    id: number = 0;
    description: string = '';

    constructor({
        id,
        description
    }){
        this.id = id;
        this.description = description;
    }
}