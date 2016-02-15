var expect = require('chai').expect;
var G = require('../generatorics');

describe('Integer functions', () => {
  it('factorial works', () => {
    expect(G.factorial(0)).to.equal(1);
    expect(G.factorial(1)).to.equal(1);
    expect(G.factorial(2)).to.equal(2);
    expect(G.factorial(3)).to.equal(6);
    expect(G.factorial(4)).to.equal(24);
    expect(G.factorial(5)).to.equal(120);
  });

  it('P(n,r) works', () => {
    expect(G.P(10, 3)).to.equal(720);
    expect(G.P(10, 1)).to.equal(10);
    expect(G.P(10, 0)).to.equal(1);
    expect(G.P(10, 10)).to.equal(3628800);
  });

  it('C(n,r) works', () => {
    expect(G.C(10, 3)).to.equal(120);
    expect(G.C(10, 1)).to.equal(10);
    expect(G.C(10, 0)).to.equal(1);
    expect(G.C(10, 10)).to.equal(1);
  });
});

describe('Combinations', () => {
  it('should get combinations of two from set of 3', () => {
    var members = [
      [1, 2],
      [1, 3],
      [2, 3]
    ];
    var answers = [];
    for (var comb of G.combinations([1, 2, 3], 2)) {
      answers.push(comb.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 1', () => {
    var members = [
      [1],
      [2],
      [3]
    ];
    var answers = [];
    for (var comb of G.combinations([1, 2, 3], 1)) {
      answers.push(comb.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 0', () => {
    for (var comb of G.combinations([1, 2, 3], 0)) {
      expect(comb).to.eql([]);
    }
  });

  it('should yield nothing if size is greater than array length', () => {
    for (var comb of G.combinations([1, 2, 3], 4)) {
      throw new Error('Made a combination when it should not have');
    }
  });

  it('combinations should default to arr.length without size specified', () => {
    for (var comb of G.combinations([1, 2, 3])) {
      expect(comb).to.eql([1, 2, 3]);
    }
  });

  it('should work with strings', () => {
    var members = [
      [ 'a', 'b' ],
      [ 'a', 'c' ],
      [ 'a', 'd' ],
      [ 'b', 'c' ],
      [ 'b', 'd' ],
      [ 'c', 'd' ],
    ];
    var answers = [];
    for (var comb of G.combinations('abcd', 2)) {
      answers.push(comb.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

});

describe('Permutations', () => {

  it('should get permutations of 2 from a set of 3', () => {
    var members = [
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2]
    ];
    var answers = [];
    for (var perm of G.permutations([1, 2, 3], 2)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 1', () => {
    var members = [
      [1],
      [2],
      [3]
    ];
    var answers = [];
    for (var perm of G.permutations([1, 2, 3], 1)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 0', () => {
    for (var perm of G.permutations([1, 2, 3], 0)) {
      expect(perm).to.eql([]);
    }
  });

  it('should yield nothing if size is greater than array length', () => {
    for (var perm of G.permutations([1, 2, 3], 4)) {
      throw new Error('Made a permutation when it should not have');
    }
  });

  it('permutations should default to arr.length without size specified', () => {
    var members = [
      [ 1, 2, 3 ],
      [ 1, 3, 2 ],
      [ 2, 1, 3 ],
      [ 2, 3, 1 ],
      [ 3, 2, 1 ],
      [ 3, 1, 2 ],
    ];
    var answers = [];
    for (var perm of G.permutations([1, 2, 3])) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

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
    ];
    var answers = [];
    for (var perm of G.permutations('abcd', 2)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

});

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
    ];
    var answers = [];
    for (var perm of G.baseN([1, 2, 3], 2)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 1', () => {
    var members = [
      [1],
      [2],
      [3]
    ];
    var answers = [];
    for (var perm of G.baseN([1, 2, 3], 1)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 0', () => {
    for (var perm of G.baseN([1, 2, 3], 0)) {
      expect(perm).to.eql([]);
    }
  });

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
    ];
    var answers = [];
    for (var perm of G.baseN([1, 2, 3])) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

});


describe('Power Set', () => {

  it('should calculate power set', () => {
    var members = [
      [],
      [1],
      [2],
      [1, 2],
      [3],
      [1, 3],
      [2, 3],
      [1, 2, 3]
    ];
    var answers = [];
    for (var sett of G.powerSet([1, 2, 3])) {
      answers.push(sett.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

});

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
    ];
    var answers = [];
    for (var sett of G.cartesian([0, 1, 2], [0, 10, 20], [0, 100, 200])) {
      answers.push(sett.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

});
