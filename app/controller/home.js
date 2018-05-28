'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async api() {
    this.ctx.body = 'hi, egg api';
  }
}

module.exports = HomeController;
