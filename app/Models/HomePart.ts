import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Home from './Home'

export default class HomePart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Home)
  public Home: BelongsTo<typeof Home>

  @column()
  public homeId: number

  @column()
  public name: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
