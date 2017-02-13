var expect = require('chai').expect
var G = require('../generatorics')

describe('Arithmetic functions', () => {
  it('factorial works', () => {
    expect(G.factorial(0)).to.equal(1)
    expect(G.factorial(1)).to.equal(1)
    expect(G.factorial(2)).to.equal(2)
    expect(G.factorial(3)).to.equal(6)
    expect(G.factorial(4)).to.equal(24)
    expect(G.factorial(5)).to.equal(120)
  })

  it('factoradic works', () => {
    expect(G.factoradic(0)).to.eql([ 0 ])
    expect(G.factoradic(1)).to.eql([ 0, 1 ])
    expect(G.factoradic(2)).to.eql([ 0, 0, 1 ])
    expect(G.factoradic(3)).to.eql([ 0, 1, 1 ])
    expect(G.factoradic(100)).to.eql([ 0, 0, 2, 0, 4 ])
    expect(G.factoradic(1337)).to.eql([ 0, 1, 2, 2, 0, 5, 1 ])
    expect(G.factoradic(9001)).to.eql([ 0, 1, 0, 0, 0, 3, 5, 1 ])
    expect(G.factoradic(3958174309503149571029856012)).to.eql([ 0, 1, 0, 2, 2, 3, 5, 5, 2, 2, 3, 7, 6, 1, 12, 14, 11, 12, 18, 0, 10, 2, 21, 12, 4, 21, 9 ])
  })

  it('P(n,r) works', () => {
    expect(G.P(10, 3)).to.equal(720)
    expect(G.P(10, 1)).to.equal(10)
    expect(G.P(10, 0)).to.equal(1)
    expect(G.P(10, 10)).to.equal(3628800)
  })

  it('C(n,r) works', () => {
    expect(G.C(10, 3)).to.equal(120)
    expect(G.C(10, 1)).to.equal(10)
    expect(G.C(10, 0)).to.equal(1)
    expect(G.C(10, 10)).to.equal(1)
  })

  it('higher level method for counting choices', () => {
    expect(G.choices(10, 3, { replace: true, ordered: true })).to.equal(1000)
    expect(G.choices(10, 3, { replace: true, ordered: false })).to.equal(220)
    expect(G.choices(10, 3, { replace: false, ordered: true })).to.equal(720)
    expect(G.choices(10, 3, { replace: false, ordered: false })).to.equal(120)
  })
})

describe('Combinations', () => {
  it('should get combinations of two from set of 3', () => {
    var members = [
      [ 1, 2 ],
      [ 1, 3 ],
      [ 2, 3 ]
    ]
    var answers = []
    for (var comb of G.combination([1, 2, 3], 2)) {
      answers.push(comb.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with size 1', () => {
    var members = [
      [ 1 ],
      [ 2 ],
      [ 3 ]
    ]
    var answers = []
    for (var comb of G.combination([1, 2, 3], 1)) {
      answers.push(comb.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with size 0', () => {
    for (var comb of G.combination([1, 2, 3], 0)) {
      expect(comb).to.eql([])
    }
  })

  it('should yield nothing if size is greater than array length', () => {
    for (var comb of G.combination([1, 2, 3], 4)) {
      throw new Error('Made a combination when it should not have')
    }
  })

  it('combinations should default to arr.length without size specified', () => {
    for (var comb of G.combination([1, 2, 3])) {
      expect(comb).to.eql([1, 2, 3])
    }
  })

  it('should work with strings', () => {
    var members = [
      [ 'a', 'b' ],
      [ 'a', 'c' ],
      [ 'a', 'd' ],
      [ 'b', 'c' ],
      [ 'b', 'd' ],
      [ 'c', 'd' ],
    ]
    var answers = []
    for (var comb of G.combination('abcd', 2)) {
      answers.push(comb.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('yields the same array each time', () => {
    var arr = [...G.combination([1, 2, 3], 2)]
    expect(arr).to.eql(Array(arr.length).fill(arr[0]))
  })

})

describe('Permutations', () => {

  it('should get permutations of 2 from a set of 3', () => {
    var members = [
      [ 1, 2 ],
      [ 1, 3 ],
      [ 2, 1 ],
      [ 2, 3 ],
      [ 3, 1 ],
      [ 3, 2 ]
    ]
    var answers = []
    for (var perm of G.permutation([1, 2, 3], 2)) {
      answers.push(perm.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with size 1', () => {
    var members = [
      [ 1 ],
      [ 2 ],
      [ 3 ]
    ]
    var answers = []
    for (var perm of G.permutation([1, 2, 3], 1)) {
      answers.push(perm.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with size 0', () => {
    for (var perm of G.permutation([1, 2, 3], 0)) {
      expect(perm).to.eql([])
    }
  })

  it('should yield nothing if size is greater than array length', () => {
    for (var perm of G.permutation([1, 2, 3], 4)) {
      throw new Error('Made a permutation when it should not have')
    }
  })

  it('permutations should default to arr.length without size specified', () => {
    var members = [
      [ 1, 2, 3 ],
      [ 1, 3, 2 ],
      [ 2, 1, 3 ],
      [ 2, 3, 1 ],
      [ 3, 2, 1 ],
      [ 3, 1, 2 ],
    ]
    var answers = []
    for (var perm of G.permutation([1, 2, 3])) {
      answers.push(perm.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with strings', () => {
    var members = [
      [ 'a', 'b' ],
      [ 'a', 'c' ],
      [ 'a', 'd' ],
      [ 'b', 'a' ],
      [ 'b', 'c' ],
      [ 'b', 'd' ],
      [ 'c', 'a' ],
      [ 'c', 'b' ],
      [ 'c', 'd' ],
      [ 'd', 'a' ],
      [ 'd', 'b' ],
      [ 'd', 'c' ],
    ]
    var answers = []
    for (var perm of G.permutation('abcd', 2)) {
      answers.push(perm.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with string without specifying length', () => {
    var members = [
      [ 'a', 'b', 'c' ],
      [ 'a', 'c', 'b' ],
      [ 'b', 'a', 'c' ],
      [ 'b', 'c', 'a' ],
      [ 'c', 'b', 'a' ],
      [ 'c', 'a', 'b' ]
    ]
    var answers = []
    for (var perm of G.permutation('abc')) {
      answers.push(perm.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('yields the same array each time', () => {
    var arr = [...G.permutation([1, 2, 3], 2)]
    expect(arr).to.eql(Array(arr.length).fill(arr[0]))
  })

})

describe('Base N', () => {

  it('should get number of 2 digits a set of 3', () => {
    var members = [
      [ 1, 1 ],
      [ 1, 2 ],
      [ 1, 3 ],
      [ 2, 1 ],
      [ 2, 2 ],
      [ 2, 3 ],
      [ 3, 1 ],
      [ 3, 2 ],
      [ 3, 3 ],
    ]
    var answers = []
    for (var perm of G.baseN([1, 2, 3], 2)) {
      answers.push(perm.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with size 1', () => {
    var members = [
      [ 1 ],
      [ 2 ],
      [ 3 ]
    ]
    var answers = []
    for (var perm of G.baseN([1, 2, 3], 1)) {
      answers.push(perm.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with size 0', () => {
    for (var perm of G.baseN([1, 2, 3], 0)) {
      expect(perm).to.eql([])
    }
  })

  it('baseN should default to arr.length without size specified', () => {
    var members = [
      [ 1, 1, 1 ],
      [ 1, 1, 2 ],
      [ 1, 1, 3 ],
      [ 1, 2, 1 ],
      [ 1, 2, 2 ],
      [ 1, 2, 3 ],
      [ 1, 3, 1 ],
      [ 1, 3, 2 ],
      [ 1, 3, 3 ],
      [ 2, 1, 1 ],
      [ 2, 1, 2 ],
      [ 2, 1, 3 ],
      [ 2, 2, 1 ],
      [ 2, 2, 2 ],
      [ 2, 2, 3 ],
      [ 2, 3, 1 ],
      [ 2, 3, 2 ],
      [ 2, 3, 3 ],
      [ 3, 1, 1 ],
      [ 3, 1, 2 ],
      [ 3, 1, 3 ],
      [ 3, 2, 1 ],
      [ 3, 2, 2 ],
      [ 3, 2, 3 ],
      [ 3, 3, 1 ],
      [ 3, 3, 2 ],
      [ 3, 3, 3 ],
    ]
    var answers = []
    for (var perm of G.baseN([1, 2, 3])) {
      answers.push(perm.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('yields the same array each time', () => {
    var arr = [...G.baseN([1, 2, 3])]
    expect(arr).to.eql(Array(arr.length).fill(arr[0]))
  })

})


describe('Power Set', () => {

  it('should calculate power set', () => {
    var members = [
      [  ],
      [ 1 ],
      [ 2 ],
      [ 1, 2 ],
      [ 3 ],
      [ 1, 3 ],
      [ 2, 3 ],
      [ 1, 2, 3 ]
    ]
    var answers = []
    for (var sett of G.powerSet([1, 2, 3])) {
      answers.push(sett.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('yields the same array each time', () => {
    var arr = [...G.powerSet([1, 2, 3])]
    expect(arr).to.eql(Array(arr.length).fill(arr[0]))
  })

})

describe('Permutation Combination', () => {

  it('should get the permutation of combinations', () => {
    var members = [
      [ ],
      [ 'a' ],
      [ 'b' ],
      [ 'c' ],
      [ 'a', 'b' ],
      [ 'b', 'a' ],
      [ 'a', 'c' ],
      [ 'c', 'a' ],
      [ 'b', 'c' ],
      [ 'c', 'b' ],
      [ 'a', 'b', 'c' ],
      [ 'a', 'c', 'b' ],
      [ 'b', 'a', 'c' ],
      [ 'b', 'c', 'a' ],
      [ 'c', 'a', 'b' ],
      [ 'c', 'b', 'a' ]
    ]
    var answers = []
    for (var comb of G.permutationCombination(['a', 'b', 'c'])) {
      answers.push(comb.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should yield the same array each time', () => {
    var arr = [...G.permutationCombination([1, 2, 3])]
    expect(arr).to.eql(Array(arr.length).fill(arr[0]))
  })

})

describe('Cartesian Product', () => {

  it('should find the cartesian product of a bunch of arrays', () => {
    var members = [
      [0, 0, 0],   [1, 0, 0],   [2, 0, 0],
      [0, 10, 0],  [1, 10, 0],  [2, 10, 0],
      [0, 20, 0],  [1, 20, 0],  [2, 20, 0],
      [0, 0, 100], [1, 0, 100], [2, 0, 100],
      [0, 10, 100],[1, 10, 100],[2, 10, 100],
      [0, 20, 100],[1, 20, 100],[2, 20, 100],
      [0, 0, 200], [1, 0, 200], [2, 0, 200],
      [0, 10, 200],[1, 10, 200],[2, 10, 200],
      [0, 20, 200],[1, 20, 200],[2, 20, 200]
    ]
    var answers = []
    for (var sett of G.cartesian([0, 1, 2], [0, 10, 20], [0, 100, 200])) {
      answers.push(sett.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with apply', () => {
    var members = [
      [0, 0, 0],   [1, 0, 0],   [2, 0, 0],
      [0, 10, 0],  [1, 10, 0],  [2, 10, 0],
      [0, 20, 0],  [1, 20, 0],  [2, 20, 0],
      [0, 0, 100], [1, 0, 100], [2, 0, 100],
      [0, 10, 100],[1, 10, 100],[2, 10, 100],
      [0, 20, 100],[1, 20, 100],[2, 20, 100],
      [0, 0, 200], [1, 0, 200], [2, 0, 200],
      [0, 10, 200],[1, 10, 200],[2, 10, 200],
      [0, 20, 200],[1, 20, 200],[2, 20, 200]
    ]
    var answers = []
    for (var sett of G.cartesian.apply(G, [[0, 1, 2], [0, 10, 20], [0, 100, 200]])) {
      answers.push(sett.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should work with strings', () => {
    var members = [
      [ 'a', 'c', 'e' ],
      [ 'a', 'c', 'f' ],
      [ 'a', 'd', 'e' ],
      [ 'a', 'd', 'f' ],
      [ 'b', 'c', 'e' ],
      [ 'b', 'c', 'f' ],
      [ 'b', 'd', 'e' ],
      [ 'b', 'd', 'f' ]
    ]
    var answers = []
    for (var sett of G.cartesian('ab', 'cd', 'ef')) {
      answers.push(sett.slice())
    }
    expect(answers).to.have.length(members.length)
    expect(answers).to.deep.have.members(members)
  })

  it('should yield same array each time', () => {
    var arr = [...G.cartesian('12', '34', '56')]
    expect(arr).to.eql(Array(arr.length).fill(arr[0]))
  })

})


describe('Infinite Base N', () => {

  it('generates all permutations of an array', () => {
    var members = [
      [ 'a' ], [ 'b' ], [ 'c' ], [ 'a', 'a' ], [ 'a', 'b' ], [ 'a', 'c' ], [ 'b', 'a' ], [ 'b', 'b' ], [ 'b', 'c' ], [ 'c', 'a' ], [ 'c', 'b' ], [ 'c', 'c' ],
      [ 'a', 'a', 'a' ], [ 'a', 'a', 'b' ], [ 'a', 'a', 'c' ], [ 'a', 'b', 'a' ], [ 'a', 'b', 'b' ], [ 'a', 'b', 'c' ], [ 'a', 'c', 'a' ], [ 'a', 'c', 'b' ],
      [ 'a', 'c', 'c' ], [ 'b', 'a', 'a' ], [ 'b', 'a', 'b' ], [ 'b', 'a', 'c' ], [ 'b', 'b', 'a' ], [ 'b', 'b', 'b' ], [ 'b', 'b', 'c' ], [ 'b', 'c', 'a' ],
      [ 'b', 'c', 'b' ], [ 'b', 'c', 'c' ], [ 'c', 'a', 'a' ], [ 'c', 'a', 'b' ], [ 'c', 'a', 'c' ], [ 'c', 'b', 'a' ], [ 'c', 'b', 'b' ], [ 'c', 'b', 'c' ],
      [ 'c', 'c', 'a' ], [ 'c', 'c', 'b' ], [ 'c', 'c', 'c' ], [ 'a', 'a', 'a', 'a' ], [ 'a', 'a', 'a', 'b' ], [ 'a', 'a', 'a', 'c' ], [ 'a', 'a', 'b', 'a' ],
      [ 'a', 'a', 'b', 'b' ], [ 'a', 'a', 'b', 'c' ], [ 'a', 'a', 'c', 'a' ], [ 'a', 'a', 'c', 'b' ], [ 'a', 'a', 'c', 'c' ], [ 'a', 'b', 'a', 'a' ], [ 'a', 'b', 'a', 'b' ],
      [ 'a', 'b', 'a', 'c' ], [ 'a', 'b', 'b', 'a' ], [ 'a', 'b', 'b', 'b' ], [ 'a', 'b', 'b', 'c' ], [ 'a', 'b', 'c', 'a' ], [ 'a', 'b', 'c', 'b' ], [ 'a', 'b', 'c', 'c' ],
      [ 'a', 'c', 'a', 'a' ], [ 'a', 'c', 'a', 'b' ], [ 'a', 'c', 'a', 'c' ], [ 'a', 'c', 'b', 'a' ], [ 'a', 'c', 'b', 'b' ], [ 'a', 'c', 'b', 'c' ], [ 'a', 'c', 'c', 'a' ],
    ]
    var nums = [ 'a', 'b', 'c' ]
    var perms = []
    var gen = G.baseNAll(nums)
    for (var i = 0; i < 64; i++) {
      perms.push(gen.next().value.slice())
    }
    expect(perms).to.eql(members)
  })

})


describe('Clone submodule', () => {

  it('clones combinations', () => {
    var answers = []
    for (var comb of G.combination([1, 2, 3], 2)) {
      answers.push(comb.slice())
    }
    expect(answers).to.eql([...G.clone.combination([1, 2, 3], 2)])
  })

  it('clones permutations', () => {
    var answers = []
    for (var comb of G.permutation([1, 2, 3], 2)) {
      answers.push(comb.slice())
    }
    expect(answers).to.eql([...G.clone.permutation([1, 2, 3], 2)])

    answers = []
    for (var comb of G.permutation([1, 2, 3])) {
      answers.push(comb.slice())
    }
    expect(answers).to.eql([...G.clone.permutation([1, 2, 3])])
  })

  it('clones power sets', () => {
    var answers = []
    for (var comb of G.powerSet([1, 2, 3])) {
      answers.push(comb.slice())
    }
    expect(answers).to.eql([...G.clone.powerSet([1, 2, 3])])
  })

  it('clones permutations of combinations', () => {
    var answers = []
    for (var comb of G.permutationCombination([1, 2, 3])) {
      answers.push(comb.slice())
    }
    expect(answers).to.eql([...G.clone.permutationCombination([1, 2, 3])])
  })

  it('clones base N', () => {
    var answers = []
    for (var comb of G.baseN([1, 2, 3])) {
      answers.push(comb.slice())
    }
    expect(answers).to.eql([...G.clone.baseN([1, 2, 3])])
  })

  it('clones cartesian products', () => {
    var answers = []
    for (var comb of G.cartesian([1, 2, 3], [5, 6], [1, 8])) {
      answers.push(comb.slice())
    }
    expect(answers).to.eql([...G.clone.cartesian([1, 2, 3], [5, 6], [1, 8])])
  })

})
