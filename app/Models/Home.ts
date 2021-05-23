import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import HomePart from './HomePart'

export default class Home extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => HomePart)
  public part: HasMany<typeof HomePart>

  @column()
  public name: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
