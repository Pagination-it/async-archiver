const archiver = require('archiver')
const { createWriteStream } = require('fs');

class Archive {
  /**
   * 
   * @param {string} format the archive format. Accepted values: `zip`, `tar`
   * @param {Object} options archive creation options
   */
  constructor(out, ...params) {
    this.archive = archiver(...params);
    const output = createWriteStream(out);
    this.archive.pipe(output);
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

  async finalize() {
    return new Promise((resolve, reject) => {
      this.archive.on('end', resolve);
      this.archive.on('error', reject);
      /**@todo handle warnings */
      this.archive.finalize();
    });
  }
}

module.exports = Archive;