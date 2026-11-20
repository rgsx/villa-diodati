'use strict';
// Villa Diodati: plain JavaScript (source.js)

const path = require('path');
const { EventEmitter } = require('events');

const LETTERS = 4; // Walton to Mrs Saville, from Archangel
const CABLE = /^come\s+(?<name>[a-z]+)\b/gi;

class Writer extends EventEmitter {
  static #count = 0;
  #faith = 100;

  constructor(name, { city = 'Archangel', rank } = {}) {
    super();
    this.name = name;
    this.city = city;
    this.rank = rank ?? 'captain';
    Writer.#count++;
  }

  get faith() {
    return this.#faith;
  }

  static get count() {
    return Writer.#count;
  }

  watch(hours = 8) {
    this.#faith -= hours * 1.5;
    if (this.#faith < 10) throw new Error(`${this.name} can watch no longer\n`);
    this.emit('watch', { hours, faith: this.#faith });
    return this;
  }
}

function* nights(max) {
  for (let i = 0; i < max; i++) yield i % 2 === 0 ? 'storm' : 'calm';
}

async function cable(who, words = []) {
  const [first, ...rest] = words;
  const result = await Promise.resolve({ who, first, rest });
  return result?.who?.name ?? 'nobody';
}

const options = { connections: { compression: false, retries: 3 }, root: path.join(__dirname, 'arctic') };
delete options.connections.retries;

const walton = new Writer('Walton', { city: 'Archangel' });
console.log(typeof walton, walton instanceof Writer, 'city' in walton, void 0);

for (const hour of nights(4)) {
  if (hour === 'calm') continue;
  console.log(hour, CABLE.test('come victor'));
}

switch (Writer.count) {
  case 1:
    cable(walton, ['Geneva', 'Mer de Glace']).then((name) => console.log(name));
    break;
  default:
    break;
}

module.exports = { Writer, cable, LETTERS, options };
