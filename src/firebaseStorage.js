const FirebaseStorageNode = require('./firebaseStorageNode');

function validateNodeConfig(n){
  if (!n.object){
    throw "No object specified";
  }

  if (!n.operation){
    throw "No operation specified";
  }

  if (!n.admin) {
    throw "No admin specified";
  }
}

module.exports = function(RED) {
  "use strict";

  function FirebaseStorage(n) {
    validateNodeConfig(n)

    RED.nodes.createNode(this,n);
    var node = this;

    node.object = n.object;
    node.operation = n.operation;
    node.admin = RED.nodes.getNode(n.admin);

    const firebaseStorageNode = new FirebaseStorageNode(node)
    firebaseStorageNode.setStatusCallback(node.status.bind(node))

    node.on('input', msg => {
      firebaseStorageNode.onInput(msg, node.send.bind(node), node.error.bind(node))
    })
  }

  RED.nodes.registerType("firebase storage get", FirebaseStorage);
}


