const FirebaseAdminNode = require('node-red-contrib-firebase-admin-config');
const assert = require('assert');

const FirebaseStorageFileNode = require('../src/firebaseStorageFileNode');
const serviceAccountJson = require('./my-firebase-service-credential.json');

describe('FirebaseStorageFileNode', function() {
	it('Fail without object', function(done) {
  	const firebaseAdminNode = new FirebaseAdminNode({
			serviceAccountJson: serviceAccountJson
		});
  	try {
	  	const firebaseStorageNode = new FirebaseStorageFileNode({
        operation: 'getMetadata',
	  		admin: firebaseAdminNode
	  	});
	  	assert.fail()
  	} catch (e){
      firebaseAdminNode.onClose(null, done);
  	}
  });

  it('Fails without operation', function(done) {
    const firebaseAdminNode = new FirebaseAdminNode({
      serviceAccountJson: serviceAccountJson
    });
    try {
      const firebaseStorageNode = new FirebaseStorageFileNode({
        object: 'test',
        admin: firebaseAdminNode
      });
      assert.fail()
    } catch (e){
      firebaseAdminNode.onClose(null, done);
    }
  });

  it('Fail without admin', function() {
  	try {
	  	const firebaseStorageNode = new FirebaseStorageFileNode({
        object: 'test',
        operation: 'getMetadata'
	  	});
	  	assert.fail()
  	} catch (e){}
  });

  it('Can get data from firebase storage', function(done) {
  	const firebaseAdminNode = new FirebaseAdminNode({
			serviceAccountJson: serviceAccountJson
		});

  	const firebaseStorageNode = new FirebaseStorageFileNode({
  		admin: firebaseAdminNode,
      operation: 'getMetadata',
  		object: 'app.apk'
  	});

  	firebaseStorageNode.onInput({
      payload: false
    }, d => {
      console.log(d)
      assert(d != null);
      firebaseAdminNode.onClose(null, done);
    }, e => {
      firebaseAdminNode.onClose(null, ()=>{done(1)});
    });
  });
});
