import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Homes extends BaseSchema {
  protected tableName = 'homes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('name')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
