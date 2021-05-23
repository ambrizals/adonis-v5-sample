import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Home from 'App/Models/Home'
import HomeCreateValidator from 'App/Validators/Home/HomeCreateValidator'
import HomeUpdateValidator from 'App/Validators/Home/HomeUpdateValidator'

export default class HomeController {
  public async index(ctx: HttpContextContract) {
    const home = await Home.all()
    return ctx.response.send({
      home,
    })
  }

  public async show(ctx: HttpContextContract) {
    const home = await Home.find(ctx.request.param('id'))
    return ctx.response.ok({
      home,
    })
  }

  /**
   * @method store
   * LUCID Implementation Example
   *
   * @param ctx
   * @returns HttpContextContract
   */
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

  /**
   * @method update
   * Database Transaction Implementation Example
   *
   * @param ctx
   * @returns HttpContextContract
   */
  public async update(ctx: HttpContextContract) {
    const id = ctx.request.param('id')
    const payload = await ctx.request.validate(HomeUpdateValidator)
    const trx = await Database.transaction()
    try {
      await trx.from('homes').where('id', id).update({
        name: payload.data.name,
      })
      await trx.commit()
      return ctx.response.ok({
        message: 'Diperbarui',
      })
    } catch (err) {
      await trx.rollback()
      return ctx.response.notImplemented({
        message: 'Tidak tersimpan',
      })
    }
  }
}
