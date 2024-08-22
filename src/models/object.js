export default class Object{
    title;
    id;
    description;
    images;
    releaseDate;
    state;
    constructor(id,title,description,images,releaseDate,state) {
        this.releaseDate = releaseDate;
        this.state = state;
        this.id = id;
        this.title = title;
        this.description = description;
        this.images = images;
    }

}