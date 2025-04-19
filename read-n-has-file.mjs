import { createHash } from 'bare-crypto'
import { readFile } from 'bare-fs/promises'

const hash = createHash('sha256')

// ensure you have a `package.json` file for this 
// test!
hash.update(await readFile('package.json'))

const digest = hash.digest('hex')
console.log(digest)

// run with `bare read-n-hash-file.mjs`
