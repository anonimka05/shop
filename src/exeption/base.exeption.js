class BaseExeption extends Error {
  constructor() {
    super();
    this.isExeption = true;
  }
}

module.exports=  BaseExeption