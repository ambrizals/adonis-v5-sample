import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class HomeParts extends BaseSchema {
  protected tableName = 'home_parts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('home_id').unsigned().references('id').inTable('homes')
      table.string('name')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
