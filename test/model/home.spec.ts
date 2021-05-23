import Database from '@ioc:Adonis/Lucid/Database'
import Home from 'App/Models/Home'
import HomePart from 'App/Models/HomePart'
import test from 'japa'

test.group('Test Database Transaction', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  test('Make sure model is work', async () => {
    const home = new Home()
    home.name = 'Rumah Bambang'
    await home.save()
  })

  test('Make sure model transaction is work', async (assert) => {
    await Database.transaction(async (trx) => {
      const home = new Home()
      home.useTransaction(trx)
      home.name = 'Rumah Ambri'
      await home.save()

      const part = new HomePart()
      part.name = 'Taman Kucing'

      await home.related('part').save(part)
      await trx.transaction()

      assert.equal(part.homeId, home.id)
    })
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
