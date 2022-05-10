import { BinaryEngine } from '@prisma/engine-core'
import { ClientEngineType, getClientEngineType } from '@prisma/sdk'
import path from 'path'

describe('BinaryEngine', () => {
  test('should error correctly with invalid flags', async () => {
    // Skip for Node-API library
    // TODO Better scoping when to run this test so this conditional is not necessary
    if (getClientEngineType() === ClientEngineType.Library) {
      return
    }

    try {
      const engine = new BinaryEngine({
        flags: ['--flag-that-does-not-exist'],
        inlineSchema: '',
      })
      await engine.start()
    } catch (e) {
      expect(e.message).toMatch(` Found argument '--flag-that-does-not-exist' which wasn't expected`)
    }
  })
})
