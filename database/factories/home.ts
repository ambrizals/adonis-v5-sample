import Factory from '@ioc:Adonis/Lucid/Factory'
import Home from 'App/Models/Home'

export const HomeFactory = Factory.define(Home, ({ faker }) => {
  return {
    name: faker.name.firstName(),
  }
}).build()
