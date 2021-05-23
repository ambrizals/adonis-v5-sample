import { HomeFactory } from 'Database/factories/home'
import test from 'japa'
// import { JSDOM } from 'jsdom'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Home Route', (group) => {
  group.before(async () => {
    await HomeFactory.createMany(10)
  })

  test('Make sure home list is accessible', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/').expect(200)
    assert.isAbove(body.home.length, 0)
  })

  test('Make sure user can create a home', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/')
      .send({
        data: {
          name: 'Rumah Saya',
        },
      })
      .expect(200)
    assert.equal(body.message, 'Rumah berhasil ditambah')
  })

  test('Make sure user can modify a home data', async () => {
    await supertest(BASE_URL)
      .put('/1')
      .send({
        data: {
          name: 'Rumah siapa',
        },
      })
      .expect(200)
  })

  test('Make sure user can access home data', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/1').expect(200)
    assert.equal(body.home.name, 'Rumah siapa')
  })
})
