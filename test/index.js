var expect = require('chai').expect;
var C = require('../generatorics');

describe('Integer functions', () => {
  it('factorial works', () => {
    expect(C.factorial(0)).to.equal(1);
    expect(C.factorial(1)).to.equal(1);
    expect(C.factorial(2)).to.equal(2);
    expect(C.factorial(3)).to.equal(6);
    expect(C.factorial(4)).to.equal(24);
    expect(C.factorial(5)).to.equal(120);
  });

  it('P(n,r) works', () => {
    expect(C.P(10, 3)).to.equal(720);
    expect(C.P(10, 1)).to.equal(10);
    expect(C.P(10, 0)).to.equal(1);
    expect(C.P(10, 10)).to.equal(3628800);
  });

  it('C(n,r) works', () => {
    expect(C.C(10, 3)).to.equal(120);
    expect(C.C(10, 1)).to.equal(10);
    expect(C.C(10, 0)).to.equal(1);
    expect(C.C(10, 10)).to.equal(1);
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
    for (var comb of C.combinations([1, 2, 3], 2)) {
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
    for (var comb of C.combinations([1, 2, 3], 1)) {
      answers.push(comb.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 0', () => {
    for (var comb of C.combinations([1, 2, 3], 0)) {
      expect(comb).to.eql([]);
    }
  });

  it('should yield nothing if size is greater than array length', () => {
    for (var comb of C.combinations([1, 2, 3], 4)) {
      throw new Error('Made a combination when it should not have');
    }
  });

  it('combinations should default to arr.length without size specified', () => {
    for (var comb of C.combinations([1, 2, 3])) {
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
    for (var comb of C.combinations('abcd', 2)) {
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
    for (var perm of C.permutations([1, 2, 3], 2)) {
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
    for (var perm of C.permutations([1, 2, 3], 1)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 0', () => {
    for (var perm of C.permutations([1, 2, 3], 0)) {
      expect(perm).to.eql([]);
    }
  });

  it('should yield nothing if size is greater than array length', () => {
    for (var perm of C.permutations([1, 2, 3], 4)) {
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
    for (var perm of C.permutations([1, 2, 3])) {
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
    for (var perm of C.permutations('abcd', 2)) {
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
    for (var perm of C.baseN([1, 2, 3], 2)) {
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
    for (var perm of C.baseN([1, 2, 3], 1)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should work with size 0', () => {
    for (var perm of C.baseN([1, 2, 3], 0)) {
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
    for (var perm of C.baseN([1, 2, 3])) {
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
    for (var sett of C.powerSet([1, 2, 3])) {
      answers.push(sett.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

});
