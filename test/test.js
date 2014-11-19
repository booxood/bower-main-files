'use strict'

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec

var dirdiff = require('dirdiff');

var should = require('should');
var bmf = require('../index');

describe('bower-main-files test case', function() {

  before(function(done) {
    exec('rm -rf '+path.join(__dirname, '/out/'), function(err, out){
      done();
    });
  });

  it('bower path end of \'bower_components\'', function(done) {
    var bower = path.join(__dirname, '/in/bower_components');
    var out = path.join(__dirname, '/out/c1');
    bmf(bower, out);
    dirdiff(bower + '/dist', out + '/dist', {
      fileContents: true
    }, function(err, diffs) {
      should.not.exist(err);
      diffs.should.be.empty;
      done();
    })
  });

  it('specify bower component', function(done) {
    var bower = path.join(__dirname, '/in/bower_components/main-array');
    var out = path.join(__dirname, '/out/c2');
    bmf(bower, out);
    dirdiff(bower + '/dist', out + '/main-array/dist', {
      fileContents: true
    }, function(err, diffs) {
      should.not.exist(err);
      diffs.should.be.empty;
      done();
    })
  });

});