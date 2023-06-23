import Chance from 'chance'
import idify from './idify'

const chance = new Chance()

describe('idify ', () => {
  it('default', () => {
    expect(idify()).toEqual('')
  })

  it('should replace spaces', () => {
    const string = `${chance.word()} ${chance.word()}`
    expect(idify(' ')).toEqual('-')
    expect(idify(string)).not.toContain(' ')
  })

  it('should replace all spaces', () => {
    const string = `${chance.word()} ${chance.word()} ${chance.word()}`
    expect(idify(string)).not.toContain(' ')
    expect(idify('   ')).toEqual('---')
  })

  it('should stay lowercase', () => {
    const word = chance.word()
    expect(idify(word.toUpperCase())).toEqual(word.toLowerCase())
  })
})
