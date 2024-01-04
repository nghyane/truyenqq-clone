import sql from '../services/db'
import { DataTypes, Model } from 'sequelize'
import { MangaStatus, type MangaAttributes } from '../types/MangaTypes'

class Manga extends Model<MangaAttributes> {
    public id!: number
    public title!: string
    public views!: number
    public chapters!: number
    public status!: MangaStatus
    public description!: string
    public image!: string
}

Manga.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    chapters: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: MangaStatus.ONGOING,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: DataTypes.STRING,
}, {
    sequelize: sql,
    modelName: 'mangas',
})


Manga.afterCreate((manga) => {
    console.log(`Created manga ${manga.title}`)
})

export const getManga = async (id: number) => {
    return await Manga.findByPk(id)
}

export default Manga;

