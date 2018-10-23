const archiver = require('archiver')

class Archiver {
  /**
   * 
   * @param {string} format the archive format. Accepted values: `zip`, `tar`
   * @param {Object} options archive creation options
   */
  constructor(...params) {
    this.archive = archiver(...params);
  }
  
  file(...params) {
    this.archive.file(...params);
  }

  append(...params) {
    this.archive.append(...params);
  }

  directory(...params) {
    this.archive.directory(...params);
  }

  async archive() {
    return new Promise((resolve, reject) => {
      this.archive.on('end', resolve);
      this.archive.on('error', reject);
      /**@todo handle warnings */
    });
  }
}

module.exports = Archiver;