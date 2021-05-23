import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Home from 'App/Models/Home'
import HomeCreateValidator from 'App/Validators/Home/HomeCreateValidator'

export default class HomeController {
  public async index(ctx: HttpContextContract) {
    const home = await Home.all()
    return ctx.response.send({
      home,
    })
  }

  public async store(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(HomeCreateValidator)
    const home = await Home.create({
      name: payload.data.name,
    })
    if (home.$isPersisted) {
      return ctx.response.ok({
        message: 'Rumah berhasil ditambah',
      })
    } else {
      return ctx.response.internalServerError({
        message: 'Terjadi kesalahan',
      })
    }
  }
}
